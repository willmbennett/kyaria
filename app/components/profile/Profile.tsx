'use client'
import React, { useState } from 'react';
import { ProfileClass } from '../../../models/Profile';
import UserProfile from './UserProfile';
import NewUserQuestionnaire from './NewUserQuestionaire';
import { Button } from '../Button';
import Story from './onboarding/Story';
import { stripObject } from '../../apps/[id]/app-helper';
import Behaivoral from './onboarding/Behaivoral';
import Bio from './onboarding/Bio';
import CreateJobApp from '../board/CreateJobApp';
import Menu from './onboarding/Menu';
import { ProfileResumes } from './ProfileResumes';
import { ResumeClass } from '../../../models/Resume';

// Enum for the onboarding stages to enhance readability and maintainability
enum OnboardingStage {
    ResumeUpload = 'resumeUpload',
    Form = 'form',
    Questionnaire = 'questionnaire',
    Story = 'story',
    Bio = 'bio',
    Behaivoral = 'behaivoral',
    Finished = 'finished',
}

interface ProfileProps {
    userId: string;
    userName: string;
    profile?: ProfileClass;
    sessionUserId?: string;
    edit: boolean;
    resumes: ResumeClass[];
}

export default function Profile(
    { userId,
        userName,
        profile,
        sessionUserId,
        edit,
        resumes
    }: ProfileProps) {

    const [onboardingStage, setOnboardingStage] = useState<OnboardingStage>(profile ? OnboardingStage.Finished : OnboardingStage.ResumeUpload);

    const [onboarding, setOnboarding] = useState((onboardingStage != OnboardingStage.Finished) && edit ? true : false); // If the user doesn't have a profile but it's theirs true else false
    const [profileNotFound] = useState((!profile && !edit) ? true : false); // If there isn't a profile and it's not the user's account

    // Remove longer text from profile and limit to only relevant keys
    const profileKeys = ["title",
        "summary",
        "areas_of_expertise",
        "skills",
        "education",
        "professional_experience",
        'details',
        'responsibilities',
        'content',
        'start_date',
        'end_date',
        'degree',
        'company',
        'institution'
    ];
    const profileStripped = stripObject(profile || {}, profileKeys)

    const renderOnboardingContent = () => {
        switch (onboardingStage) {
            case OnboardingStage.Questionnaire:
                return profile && <NewUserQuestionnaire profile={profile} setOnboardingStage={setOnboardingStage} currentState={profile.questionnaire} />;
            case OnboardingStage.Story:
                return profile &&
                    <Story
                        profileId={profile._id.toString()}
                        desiredRole={profile.questionnaire?.desiredRole || ''}
                        profileStripped={profileStripped}
                        setOnboardingStage={setOnboardingStage}
                        currentState={profile.story}
                    />;
            case OnboardingStage.Bio:
                return profile &&
                    <Bio
                        profileId={profile._id.toString()}
                        desiredRole={profile.questionnaire?.desiredRole || ''}
                        profileStripped={profileStripped}
                        setOnboardingStage={setOnboardingStage}
                        currentState={profile.bio}
                    />;
            case OnboardingStage.Behaivoral:
                return profile &&
                    <Behaivoral
                        profile={profile}
                        setOnboardingStage={setOnboardingStage}
                        setOnboarding={setOnboarding}
                    />;
        }
    };

    return (
        <>
            {
            /*onboarding &&
            <div className='md:flex md:flex-row w-full min-h-screen'>
                <div className='md:w-1/4 items-top'>
                    <Menu setOnboardingStage={setOnboardingStage} onboardingStage={onboardingStage} profile={profile}/>
                </div>
                <div className=' md:w-3/4 p-2 md:p-4'>
                    {renderOnboardingContent()}
                </div>
            </div>
        */}
            <ProfileResumes resumes={resumes}
                userId={userId}
                activeSubscription={false}
            />
            {!onboarding && profile && <UserProfile userProfile={profile} edit={edit} />}
        </>
    );
}