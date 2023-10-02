'use client'

import { removeDetailSections } from '../../../../../lib/utils';
import { updateJobAppAction } from '../../../../board/apps/[id]/_action';
import ChatWithGPT from '../../ChatWithGPT';

export default function Story({
    jobApp
}: {
    jobApp: any
}) {
    const profileNoDetails = removeDetailSections(jobApp.profile)

    const message = [
        {
            "role": "system",
            "content":
                `
                    You are an advanced career coach specialized in helping professionals articulate why they are the perfect fit for a job opportunity, as well as why the company is the perfect fit for them. The goal is to create a compelling, narrative-style story that can be shared in less than 30 seconds. These stories can include the individual's skills, experience, education, and personal aspirations. 
    
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
            "role": "user",
            "content":
                `Based on the following details, help me craft a compelling, narrative-style story:
                    - Job Post: ${JSON.stringify(jobApp.job)} 
                    - My professional experience: ${JSON.stringify(profileNoDetails.professional_experience)} 
                    - My skills: ${JSON.stringify(profileNoDetails.skills)} 
                    - My education: ${JSON.stringify(profileNoDetails.education)}
                    `
        }
    ];



    return (
        <>
            <h1 className="text-center sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                Let's write you a story
            </h1>
            <p>It's how you answer the question "Tell me about yourself" or "Why do you want this job?"</p>
            <ChatWithGPT
                documentID={jobApp._id}
                message={message}
                setKey='userStory'
                currentState={jobApp.userStory}
                saveToDatabase={updateJobAppAction}
                temp={0.7}
            />
        </>
    );
}
