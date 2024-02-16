'use client'
import React from 'react';
import { useState, useEffect } from "react";
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
import { OnboardingStage } from './Enum';
import { Questionnaire } from '../../../../models/Profile';
import { ResumeClass } from '../../../../models/Resume';
import Router, { useRouter } from 'next/router';

const MENU_ITEM_BASE_STYLE = `inline-flex items-center rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2`;
const ACTIVE_ROUTE_STYLE = `text-blue-500 border-b-2 border-blue-500`;
const INACTIVE_ROUTE_STYLE = `text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300`;

type MenuItem = {
  label: string;
  instruction: React.ReactNode;
  disabled: boolean;
  show: boolean;
  icon: React.ReactNode;
};

const onboardingStages: OnboardingStage[] = [
  OnboardingStage.ResumeUpload,
  OnboardingStage.Questionnaire,
  OnboardingStage.ElevatorPitch,
  OnboardingStage.Bio,
  OnboardingStage.Story,
];

interface OnboardingMenuProps {
  // hasPitch: boolean;
  // hasBio: boolean;
  questionnaire: Questionnaire | undefined;
  bio: string | undefined;
  story: string | undefined;
  activeSubscription: boolean;
  resumes: ResumeClass[] | undefined;
  userId: string;
  profileId: string;
}

export default function OnboardingMenu({
  // hasPitch,
  // hasBio,
  questionnaire,
  bio,
  story,
  activeSubscription,
  resumes,
  userId,
  profileId
}: OnboardingMenuProps) {

  const [hasResumes, setHasResume] = useState((resumes && resumes.length > 0) ? true : false);
  const [hasQuestionnaire, setHasQuestionnaire] = useState((questionnaire) ? true : false);
  const [activeTab, setActiveTab] = useState<OnboardingStage>(OnboardingStage.ResumeUpload);
  const [isInstructionVisible, setIsInstructionVisible] = useState<boolean>(true);
  

  const initialMenuItems: Map<OnboardingStage, MenuItem> = new Map([
    [OnboardingStage.ResumeUpload, {
      label: "Resume Upload",
      instruction: <WelcomeMessage />,
      disabled: false,
      show: true,
      icon: <DocumentTextIcon className='h-5 w-5"' />,
    }],
    [OnboardingStage.Questionnaire, {
      label: "Questionnaire",
      instruction: <WelcomeMessage />,
      disabled: false,
      show: true,
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    }],
    [OnboardingStage.ElevatorPitch, {
      label: "Elevator Pitch",
      instruction: <ProfileEnhancement />,
      disabled: !hasResumes || !hasQuestionnaire,
      show: true,
      icon: <BoltIcon className="h-5 w-5" />,
    }],
    [OnboardingStage.Bio, {
      label: "LinkedIn Bio",
      instruction: <ProfileEnhancement />,
      disabled: !hasResumes || !hasQuestionnaire,
      show: true,
      icon: <UserCircleIcon className="h-5 w-5" />,
    }],
    [OnboardingStage.Story, {
      label: "Interview Stories",
      instruction: <ProfileEnhancement />,
      disabled: !hasResumes,
      show: false, //Temp setting this to false since it's going to take longer to build out
      icon: <StarIcon className="h-5 w-5" />,
    }]
  ]);

  const [menuItems, setMenuItems] = useState<Map<OnboardingStage, MenuItem>>(initialMenuItems);

  useEffect(() => {
    const ResumeOrQuestionnaireIncomplete = (activeTab === OnboardingStage.ResumeUpload || activeTab === OnboardingStage.Questionnaire) && (!resumes || !questionnaire)
    const PitchOrBioIncomplete = (activeTab === OnboardingStage.ElevatorPitch || activeTab === OnboardingStage.Bio) && (!story || !bio);
    
    setIsInstructionVisible(ResumeOrQuestionnaireIncomplete || PitchOrBioIncomplete);
  }, [activeTab, bio, resumes, questionnaire, story]);



  useEffect(() => {
    setHasResume((!resumes || resumes.length === 0) ? false : true);
    setHasQuestionnaire((questionnaire) ? true : false);
  }, [resumes, questionnaire]);

  useEffect(() => {
    setMenuItems((prevMenuItems) => {
        const updatedMenuItems = new Map(prevMenuItems);
        const elevatorPitchMenuItem = prevMenuItems.get(OnboardingStage.ElevatorPitch);
        const bioMenuItem = prevMenuItems.get(OnboardingStage.Bio);
        
        if (elevatorPitchMenuItem && bioMenuItem) {
            updatedMenuItems.set(OnboardingStage.ElevatorPitch, {
                ...elevatorPitchMenuItem,
                disabled: !hasResumes || !hasQuestionnaire
            });
            updatedMenuItems.set(OnboardingStage.Bio, {
                ...bioMenuItem,
                disabled: !hasResumes || !hasQuestionnaire
            });
        }
        return updatedMenuItems;
    });
}, [hasResumes, hasQuestionnaire]);

  const handleTabClick = (stage: OnboardingStage) => {
    if (!menuItems.get(stage)?.disabled) {
      setActiveTab(stage);
    }
  };

  const renderSection = (activeTab: OnboardingStage) => {
    switch (activeTab) {
      case OnboardingStage.ResumeUpload:
        return <ResumeDescription resumes={resumes} userId={userId} activeSubscription={activeSubscription} />;
      case OnboardingStage.Questionnaire:
        return <QuestionnaireDescription questionnaire={questionnaire} userId={userId} profileId={profileId} />;
      case OnboardingStage.ElevatorPitch:
        return <ElevatorPitchDescription story={story} activeSubscription={activeSubscription} resumes={resumes} profileId={profileId} questionnaire={questionnaire} />;
      case OnboardingStage.Bio:
        return <LinkedInBioDescription bio={bio} activeSubscription={activeSubscription} resumes={resumes} profileId={profileId} questionnaire={questionnaire} />;
      case OnboardingStage.Story:
        return <InterviewStoriesDescription />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        {isInstructionVisible && <div className="mb-4">{menuItems.get(activeTab)?.instruction}</div>}
        <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
          {onboardingStages.map((stage, index) => {
            const menuItem = menuItems.get(stage);
            if (menuItem && menuItem.show) {
              return (
                <li key={index} className="mr-2" role="presentation">
                  <TooltipPrimitive.Root>
                    <TooltipPrimitive.Trigger asChild>
                      <button
                        className={`${MENU_ITEM_BASE_STYLE}
                      ${activeTab === stage ? ACTIVE_ROUTE_STYLE : `${menuItem?.disabled ? 'text-gray-300 border-transparent' : INACTIVE_ROUTE_STYLE}`}
                      ${menuItem?.disabled ? 'cursor-not-allowed' : ''}`}
                        id={`tab-${index}`}
                        data-tabs-target={`#content-${index}`}
                        type="button"
                        role="tab"
                        aria-controls={`content-${index}`}
                        aria-selected={activeTab === stage}
                        onClick={() => handleTabClick(stage)}
                      >
                        {menuItem?.icon && React.cloneElement(menuItem?.icon as React.ReactElement)}
                        <span className="ml-2">{menuItem?.label}</span>
                      </button>
                    </TooltipPrimitive.Trigger>
                    {menuItem?.disabled && (
                      <TooltipPrimitive.Content side="top" align="center" sideOffset={5} className="text-xs text-gray-900 bg-gray-300 px-2 py-1 rounded-md">
                        Please complete resume upload and questionnaire first
                      </TooltipPrimitive.Content>
                    )}
                  </TooltipPrimitive.Root>
                </li>
              )
            }
          }
          )}
        </ul>
      </div>
      <div id="myTabContent">
      <div className={`p-4 rounded-lg dark:bg-gray-800`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        { renderSection(activeTab) }
      </div>
      </div>
    </div>
  );
}