'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import ResumeDescription from "./descriptions/ResumeDescription";
import QuestionnaireDescription from "./descriptions/QuestionnaireDescription";
import ElevatorPitchDescription from "./descriptions/PitchDescription";
import LinkedInBioDescription from "./descriptions/BioDescription";
import InterviewStoriesDescription from "./descriptions/StoryDescription";
import WelcomeMessage from "./instructions/Welcome";
import ProfileEnhancement from "./instructions/ProfileEnhancement";
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const MENU_ITEM_BASE_STYLE = `inline-flex items-center rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2`;
const ACTIVE_ROUTE_STYLE = `text-blue-500 border-b-2 border-blue-500`;
const INACTIVE_ROUTE_STYLE = `text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300`;

enum OnboardingStage {
  ResumeUpload,
  Questionnaire,
  ElevatorPitch,
  Bio,
  Story
}

type MenuItem = {
  label: string;
  instruction: React.ReactNode;
  description: React.ReactNode;
  disabled: boolean;
  icon: React.ReactNode;
  completed: boolean;
};

const initialMenuItems: Map<OnboardingStage, MenuItem> = new Map([
  [OnboardingStage.ResumeUpload, {
    label: "Resume Upload",
    instruction: <WelcomeMessage />,
    description: <ResumeDescription />,
    disabled: false,
    icon: <DocumentTextIcon className='h-5 w-5"' />,
    completed: false
  }],
  [OnboardingStage.Questionnaire, {
    label: "Questionnaire",
    instruction: <WelcomeMessage />,
    description: <QuestionnaireDescription />,
    disabled: false,
    icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    completed: false
  }],
  [OnboardingStage.ElevatorPitch, {
    label: "Elevator Pitch",
    instruction: <ProfileEnhancement />,
    description: <ElevatorPitchDescription />,
    disabled: true,
    icon: <BoltIcon className="h-5 w-5" />,
    completed: false
  }],
  [OnboardingStage.Bio, {
    label: "LinkedIn Bio",
    instruction: <ProfileEnhancement />,
    description: <LinkedInBioDescription />,
    disabled: true,
    icon: <UserCircleIcon className="h-5 w-5" />,
    completed: false
  }],
  [OnboardingStage.Story, {
    label: "Interview Stories",
    instruction: <ProfileEnhancement />,
    description: <InterviewStoriesDescription />,
    disabled: true,
    icon: <StarIcon className="h-5 w-5" />,
    completed: false
  }]
]);

const onboardingStages: OnboardingStage[] = [
  OnboardingStage.ResumeUpload,
  OnboardingStage.Questionnaire,
  OnboardingStage.ElevatorPitch,
  OnboardingStage.Bio,
  OnboardingStage.Story,
];

export default function OnboardingMenu() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OnboardingStage>(OnboardingStage.ResumeUpload);
  const [menuItems, setMenuItems] = useState<Map<OnboardingStage, MenuItem>>(initialMenuItems);

  const handleTabClick = (stage: OnboardingStage) => {
    if (!menuItems.get(stage)?.disabled) {
      setActiveTab(stage);
    }
  };

  // used for testing states. Delete later
  const toggleDisabledState = () => {
    console.log(typeof activeTab);
    setMenuItems(items => {
      const updatedItems = new Map(items);
      updatedItems.forEach((value, key) => {
        value.completed = true;
      });
      return updatedItems;
    });
  };

  // undisable remaining stages when resume upload and questionnaire completed
  React.useEffect(() => {
    const resumeUploadCompleted = menuItems.get(OnboardingStage.ResumeUpload)?.completed;
    const questionnaireCompleted = menuItems.get(OnboardingStage.Questionnaire)?.completed;

    if (resumeUploadCompleted && questionnaireCompleted) {
      setMenuItems(items => {
        const updatedItems = new Map(items);
        updatedItems.forEach((value, key) => {
          if (key !== OnboardingStage.ResumeUpload && key !== OnboardingStage.Questionnaire) {
            value.disabled = false;
          }
        });
        return updatedItems;
      });
    }
  }, [menuItems.get(OnboardingStage.ResumeUpload)?.completed, menuItems.get(OnboardingStage.Questionnaire)?.completed]);

  return (
    <div className="max-w-5xl">
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <h1 className="text-4xl mt-10">My Profile</h1>
        <div className="mb-4">{menuItems.get(activeTab)?.instruction}</div>
        <ul className="flex flex-wrap mt-24 -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
          {onboardingStages.map((stage, index) => (
            <li key={index} className="mr-2" role="presentation">
              <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                  <button
                    className={`${MENU_ITEM_BASE_STYLE}
                      ${activeTab === stage ? ACTIVE_ROUTE_STYLE : `${menuItems.get(stage)?.disabled ? 'text-gray-300 border-transparent' : INACTIVE_ROUTE_STYLE}`}
                      ${menuItems.get(stage)?.disabled ? 'cursor-not-allowed' : ''}`}
                    id={`tab-${index}`}
                    data-tabs-target={`#content-${index}`}
                    type="button"
                    role="tab"
                    aria-controls={`content-${index}`}
                    aria-selected={activeTab === stage}
                    onClick={() => handleTabClick(stage)}
                  >
                    {menuItems.get(stage)?.icon && React.cloneElement(menuItems.get(stage)?.icon)}
                    <span className="ml-2">{menuItems.get(stage)?.label}</span>
                  </button>
                </TooltipPrimitive.Trigger>
                {menuItems.get(stage)?.disabled && (
                  <TooltipPrimitive.Content side="top" align="center" sideOffset={5} className="text-xs text-gray-900 bg-gray-300 px-2 py-1 rounded-md">
                    Please complete resume upload and questionnaire first
                  </TooltipPrimitive.Content>
                )}
              </TooltipPrimitive.Root>
            </li>
          ))}
        </ul>
      </div>
      <div id="myTabContent">
        {onboardingStages.map((stage, index) => (
          <div key={index} className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === stage ? '' : 'hidden'}`} id={`content-${index}`} role="tabpanel" aria-labelledby={`tab-${index}`}>
            {menuItems.get(stage)?.description}
          </div>
        ))}
      </div>
      {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={toggleDisabledState}>Undisable Tabs</button> */}
    </div>
  );
}