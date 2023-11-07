import React, { useState } from 'react';
import { ProfileClass } from '../../../../models/Profile';
import { Button } from '../../Button';
import StarStory from './StarStory';

type BehavioralProps = {
    profile: ProfileClass;
    setOnboardingStage: any;
    setOnboarding: any;
};

export default function Behavioral({ profile, setOnboardingStage, setOnboarding }: BehavioralProps) {
    // State to track the current index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ensure that we are working with arrays, even if the properties are undefined
    const professionalExperience = profile.professional_experience ?? [];
    const items = professionalExperience.flatMap((exp, expIndex) =>
        (exp.responsibilities ?? []).map((resp, respIndex) => ({
            expIndex,
            respIndex,
            responsibility: resp,
        }))
    );

    // Update the current index to show the previous StarStory
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    // Update the current index to show the next StarStory
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex));
    };

    // skip adding details
    const finish = () => {
        setOnboardingStage('finished')
        setOnboarding(false)
    };

    return (
        <div className="p-6">
            <h1 className="sm:text-6xl text-4xl w-full font-bold text-slate-900 mb-8">
            Interview stories
            </h1>
            <div className="flex justify-between items-center my-4">
                <p className='text-left'> These are the stories you will use to answer “tell me about a time questions” in the behavioral interview.</p>
                <Button variant='secondary' onClick={finish} size='md' className={currentIndex === items.length - 1 ? 'invisible' : ''} disabled={currentIndex === items.length - 1}>
                    Skip
                </Button>
            </div>
            <div className="flex justify-between my-4">
                <Button variant='ghost' size='md' onClick={goToPrevious} disabled={currentIndex === 0}>
                    Previous
                </Button>
                <Button onClick={currentIndex === items.length - 1 ? finish : goToNext} size='md'>
                    {currentIndex === items.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
            {items.length > 0 && (
                <StarStory
                    key={`responsibility-${items[currentIndex].expIndex}-${items[currentIndex].respIndex}`}
                    profileId={profile._id.toString()}
                    setKey={`professional_experience.${items[currentIndex].expIndex}.responsibilities.${items[currentIndex].respIndex}`}
                    currentState={items[currentIndex].responsibility.starStory || ''}
                    accomplishment={items[currentIndex].responsibility.content || ''}
                    detail={items[currentIndex].responsibility.detail || ''}
                />
            )}
        </div>
    );
}
