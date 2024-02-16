'use client'
import React from 'react';
import { useState } from "react";
import ResumeDescription from "./descriptions/ResumeDescription";
import QuestionnaireDescription from "./descriptions/QuestionnaireDescription";
import ElevatorPitchDescription from "./descriptions/PitchDescription";
import LinkedInBioDescription from "./descriptions/BioDescription";
import InterviewStoriesDescription from "./descriptions/StoryDescription";
import { ProfileEnhancement } from "./instructions/ProfileEnhancement";
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { OnboardingStage } from './Enum';
import { Questionnaire } from '../../../../models/Profile';
import { ResumeClass } from '../../../../models/Resume';
import { WelcomeIntro } from './instructions/WelcomeIntro';

const MENU_ITEM_BASE_STYLE = `inline-flex items-center rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2`;
const ACTIVE_ROUTE_STYLE = `text-blue-500 border-b-2 border-blue-500`;
const INACTIVE_ROUTE_STYLE = `text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300`;

type MenuItem = {
  label: string;
  instruction: React.ReactNode;
  disabled: boolean;
  showOnboarding: boolean;
  section: JSX.Element
  icon: React.ReactNode;
};

const onboardingStages: OnboardingStage[] = [
  OnboardingStage.ResumeUpload,
  OnboardingStage.Questionnaire,
  OnboardingStage.ElevatorPitch,
  OnboardingStage.Bio,
  //OnboardingStage.Story,
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

  const hasResumes = resumes && resumes.length > 0 ? true : false
  const hasQuestionnaire = questionnaire ? true : false
  const hasPitch = story ? true : false
  const hasBio = bio ? true : false
  const onboarding = !hasResumes || !hasQuestionnaire || !hasPitch || !hasBio

  let firstTabShown = OnboardingStage.ResumeUpload; // Default starting point
  // Adjust the logic to more accurately reflect the user's progress
  if (hasResumes && !hasQuestionnaire) {
    firstTabShown = OnboardingStage.Questionnaire;
  } else if (hasQuestionnaire && !hasPitch) {
    firstTabShown = OnboardingStage.ElevatorPitch;
  } else if (hasPitch && !hasBio) {
    firstTabShown = OnboardingStage.Bio;
  }

  const [activeTab, setActiveTab] = useState<OnboardingStage>(firstTabShown);

  const menuItems: Map<OnboardingStage, MenuItem> = new Map([
    [OnboardingStage.ResumeUpload, {
      label: "Resume Upload",
      instruction: <WelcomeIntro />,
      disabled: false,
      showOnboarding: !hasResumes,
      section: <ResumeDescription
        resumes={resumes}
        userId={userId}
        activeSubscription={activeSubscription}
      />,
      icon: <DocumentTextIcon className='h-5 w-5"' />,
    }],
    [OnboardingStage.Questionnaire, {
      label: "Questionnaire",
      instruction: <WelcomeIntro />,
      disabled: false,
      showOnboarding: !hasQuestionnaire,
      section: <QuestionnaireDescription
        questionnaire={questionnaire}
        userId={userId}
        profileId={profileId} />,
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    }],
    [OnboardingStage.ElevatorPitch, {
      label: "Elevator Pitch",
      instruction: <ProfileEnhancement />,
      disabled: !hasResumes || !hasQuestionnaire,
      showOnboarding: !hasPitch,
      section: <ElevatorPitchDescription
        story={story}
        activeSubscription={activeSubscription}
        resumes={resumes}
        profileId={profileId}
        questionnaire={questionnaire} />,
      icon: <BoltIcon className="h-5 w-5" />,
    }],
    [OnboardingStage.Bio, {
      label: "LinkedIn Bio",
      instruction: <ProfileEnhancement />,
      disabled: !hasResumes || !hasQuestionnaire,
      showOnboarding: !hasBio,
      section: <LinkedInBioDescription
        bio={bio}
        activeSubscription={activeSubscription}
        resumes={resumes}
        profileId={profileId}
        questionnaire={questionnaire} />,
      icon: <UserCircleIcon className="h-5 w-5" />,
    }],
    /*
    [OnboardingStage.Story, {
      label: "Interview Stories",
      instruction: <ProfileEnhancement />,
      disabled: !hasResumes,
      hideOnboarding: false, //Temp setting this to false since it's going to take longer to build out
      icon: <StarIcon className="h-5 w-5" />,
    }]
    */
  ]);

  const handleTabClick = (stage: OnboardingStage) => {
    if (!menuItems.get(stage)?.disabled) {
      setActiveTab(stage);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        {onboarding && menuItems.get(firstTabShown)?.instruction}
        <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
          {onboardingStages.map((stage, index) => {
            const menuItem = menuItems.get(stage);
            if (menuItem) {
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
          {menuItems.get(activeTab)?.section}
        </div>
      </div>
    </div>
  );
}