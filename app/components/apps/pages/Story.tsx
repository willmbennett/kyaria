'use client'

import { updateJobAppAction } from '../../../board/_action';
import ChatWithGPT from '../../board/ChatWithGPT';
import { updateProfileAction } from '../../../profile/_action';
import { useSession } from "next-auth/react";
import { useState } from 'react';
import { Button } from '../../Button';
import { Message } from 'ai';

interface StoryProps {
    jobAppId: string,
    currentStory: string,
    userResumeStripped: any,
    job: any,
    jobKeyWords: string[],
    profileStory: string,
    userId: string,
    profileId: string,
    activeSubscription: boolean
}

export default function Story({
    jobAppId,
    currentStory,
    userResumeStripped,
    job,
    jobKeyWords,
    profileStory,
    userId,
    profileId,
    activeSubscription
}: StoryProps) {
    const { data: session } = useSession()
    const userCanEdit = session?.user?.id == '650f813286f63a9d8c0080ee' || session?.user?.id == userId
    const [savedToProfile, setSavedToProfile] = useState(false)

    const message: Message[] = [
        {
            "id": '1',
            "role": "system",
            "content":
                `
                    You are an advanced career coach specialized in helping professionals articulate why they are the perfect fit for a job opportunity, as well as why the company is the perfect fit for them. The goal is to create a compelling, narrative-style elevator pitch that can be shared in less than 30 seconds. These stories can include the individual's skills, experience, education, and personal aspirations.
    
                    Tone: conversational, friendly, use less corporate jargon

                    Here is an example:
                    ### **Hook:** 
                    I've always been drawn to the intersection of technology and business strategy. Naturally, I majored in both Computer Science and Economics at Dartmouth.

                    ### **Transition 1:** 
                    Fresh out of college, I was drawn to McKinsey, feeling it was the perfect marriage of my two disciplines.

                    ### **First Relevant Job:** 
                    At McKinsey, I dived deep into SaaS companies, honing skills in crafting effective product roadmaps and bolstering operational efficiency.

                    ### **Transition 2:** 
                    Though I rose to the role of Senior Consultant, I found myself yearning for a hands-on role; closer to the product and the consumer.

                    ### **Previous Job:** 
                    This led me to Doximity, taking on the role of Product Manager for their advertising platform. I delved into the intricacies of product management, from vision creation to leading a vibrant cross-functional team.

                    ### **Transition 3:** 
                    While my tenure at Doximity was fulfilling, I felt the urge to make a larger impact and collaborate with the best in the industry.

                    ### **Target Job:** 
                    This brings me to my interest in the Google Ads PM position. After insightful conversations with Jessica Fan, I'm confident this role aligns with my aspirations. My unique blend of agility, thanks to my startup ventures, and structured thinking from my consulting days, positions me uniquely for this role.

                    ### **Wrap-up:** 
                    I'm eager to delve deeper into my experiences and equally keen to understand what Google seeks in their ideal Product Manager for Google Ads.
                    `
        },
        {
            "id": '2',
            "role": "user",
            "content":
                `${profileStory == '' ?
                    `Based on the following details, help me craft a compelling, narrative-style elevator pitch:
                    - Job Post: ${JSON.stringify(job)} 
                    - My professional experience: ${JSON.stringify(userResumeStripped.professional_experience)} 
                    - My skills: ${JSON.stringify(userResumeStripped.skills)} 
                    - My education: ${JSON.stringify(userResumeStripped.education)}
                    Make sure to pay attention to dates and make it follow chronological order`
                    :
                    `Please refine the provided elevator pitch based on the candidate's profile story and align it with the requirements and objectives of the following job posting, ensuring the tone and style match the candidate's usual writing style:
Profile Story: ${profileStory}
Job Posting Details: ${JSON.stringify(job)}`
                }`
        }
    ];

    const saveToProfile = async () => {
        if (userCanEdit) {
            // Split the property path into segments
            const setKey = `story`
            //console.log(setKey)

            const data = { story: currentStory }
            //console.log(profileId, data)
            await updateProfileAction(profileId, data, "/")
            setSavedToProfile(true)
        }
    };



    return (
        <>
            <h1 className="text-center sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                Tailor your Elevator Pitch
            </h1>
            {userCanEdit && currentStory != '' && profileStory != currentStory &&
                <div className='flex flex-col w-full text-center'>
                    <p>Like what you see? Make this your default by saving to your profile. Note: it will overwrite the story saved to your profile.</p>
                    <div className='flex w-full justify-center my-2'>
                        <Button
                            size='md'
                            onClick={saveToProfile}
                        >
                            Make default
                        </Button>
                    </div>
                </div>
            }
            <div className='flex w-full justify-center bg-slate-100'>
                <p>{savedToProfile && profileStory == currentStory && 'Updated your profile with the new story'}</p>
            </div>
            <div className="lg:p-6 w-full">
                <p>It's how you answer the question "Tell me about yourself" or "Why do you want this job?"</p>
                <ChatWithGPT
                    documentID={jobAppId}
                    message={message}
                    setKey='userStory'
                    currentState={currentStory}
                    saveToDatabase={updateJobAppAction}
                    temp={0.7}
                    jobKeyWords={jobKeyWords}
                    activeSubscription={activeSubscription}
                />
            </div>
        </>
    );
}
