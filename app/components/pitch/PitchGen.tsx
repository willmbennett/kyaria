'use client'

import { ResumeClass } from '../../../models/Resume';
import { updateProfileAction } from '../../profile/_action';
import ChatWithGPT from '../board/ChatWithGPT';

export const PitchGen = ({
    selectedResume,
    profileId,
    currentPitch,
    desiredRole,
}: {
    selectedResume: ResumeClass,
    profileId: string,
    currentPitch?: string,
    desiredRole?: string // I made this one optional for now
}) => {
    const message = [
        {
            "role": "system",
            "content":
                `
                    You are an advanced career coach specialized in helping professionals articulate why they are the perfect fit for a job. The goal is to create a compelling, narrative-style story that can be shared in less than 30 seconds. These stories can include the individual's skills, experience, education, and personal aspirations.
    
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

                    ### **Target Role:** 
                    This brings me to my interest in Software Engineering. After insightful conversations with Jessica Fan, I'm confident this role aligns with my aspirations. My unique blend of agility, thanks to my startup ventures, and structured thinking from my consulting days, positions me uniquely for this role.
                    `
        },
        {
            "role": "user",
            "content":
                `${currentPitch ? `Improve this elevator pitch: ${currentPitch} using the following context` : 'Based on the following details, help me craft a compelling, narrative-style story:'}
                    - Desired role: ${desiredRole} 
                    - My professional experience: ${JSON.stringify(selectedResume.professional_experience)} 
                    - My skills: ${JSON.stringify(selectedResume.skills)} 
                    - My education: ${JSON.stringify(selectedResume.education)}
                    Make sure to pay attention to dates and make it follow chronological order
                    `
        }
    ];

    return (
        <div className="lg:p-6 w-full">
            <ChatWithGPT
                documentID={profileId}
                message={message}
                setKey='story'
                currentState={currentPitch}
                saveToDatabase={updateProfileAction}
                temp={0.7}
                activeSubscription={true}
            />
        </div>
    );
}
