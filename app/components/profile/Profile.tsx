"use client"

import React, { useState } from 'react';
import { defaultTextInput } from '../../profile/profile-helper';
//import ProfileActions from './ProfileActions';
import { ProfileClass } from '../../../models/Profile';
import { demoJSON, expectedJson } from '../../profile/profile-helper';
import UserProfile from './UserProfile';
import TextToJSON from '../TextToJSON';
//import { redirect } from 'next/navigation'
import { Button } from '../Button';
import NewProfileForm from './NewProfileForm';
import NewUserQuestionaire from './NewUserQuestionaire';

export default function Profile({
    userId,
    profile,
    sessionUserId
}: {
    userId: string
    profile?: ProfileClass,
    sessionUserId?: string
}) {
    const [onboardingStage, setOnboardingStage] = useState(profile? 'profile': 'resumeUpload')
    //const [onboardingStage, setOnboardingStage] = useState('questionaire')

    const skipButton = () => {
        setOnboardingStage('form')
    };

    return (
        <>
            {onboardingStage == 'resumeUpload' && (
                <div className='py-4 flex flex-col items-center justify-center text-center'>
                    <div className='py-4 items-center flex flex-col justify-center text-center'>
                        <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                            Welcome!
                        </h1>
                        <h2 className="sm:text-4xl text-2xl font-bold text-slate-900 mb-8">
                            Time to create your profile
                        </h2>
                    </div>
                    <TextToJSON
                        defaultTextInput={['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '') ? defaultTextInput : ''}
                        setOnboardingStage={setOnboardingStage}
                        userId={userId}
                    />
                    <p className="mt-10 text-sm text-base text-neutral-600 w-full max-w-screen">
                        Don't have a resume? That's totally fine! Fill out this form to get started.
                    </p>
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={skipButton}
                        className="mt-3"
                    >
                        Go to Form
                    </Button>
                </div>)}
                {onboardingStage == 'form' && (
                <NewProfileForm
                    userId={userId}
                    profile={profile}
                    setOnboardingStage={setOnboardingStage}
                />
            )}
            {onboardingStage == 'questionaire' && profile && (
            <NewUserQuestionaire 
            profile={profile} 
            setOnboardingStage={setOnboardingStage}
            />)}
            {profile && onboardingStage == 'profile' && (<UserProfile userProfile={profile} />)}
            
        </>);
}
