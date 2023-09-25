'use client'

import ChatWithGPT from '../ChatWithGPT';
import { useState } from 'react';
import { updateResumeAction } from '../../../jobs/apps/[id]/_action';

export default function StarStory({
    jobApp,
    documentID,
    setKey,
    content,
    details,
    currentState,
    updateState,
    parentIndex,
    childIndex
}: {
    jobApp: any,
    documentID: string,
    setKey: string,
    content: string,
    details: string,
    currentState: string,
    updateState: any,
    parentIndex: number,
    childIndex: number
}) {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    const message = [
        {
            "role": "system",
            "content": `You are an advanced career coach specialized in crafting compelling STAR stories. For example, here's how a Product Manager at Doximity could narrate their STAR story:<br><br>
            Situation: I was a Product Manager at Doximity, overseeing our advertising product. We had a high churn rate among our small to medium-sized clients.

            Here is an example:
            ### **Task:** 
            I was faced with the challenge of pinpointing the reasons behind a high churn rate and devising strategies to enhance retention.
            
            ### **Action:** 
            I spearheaded a cross-functional team, gathering invaluable data and feedback from customers. Acting on these insights, we overhauled the user interface, incorporated in-app tutorials, and rolled out a tiered pricing strategy. In tandem, I liaised with our marketing team to effectively communicate these shifts to our existing clientele.
            
            ### **Result:** 
            In just three months, we witnessed a 30% reduction in churn among our small to medium-sized clients and enjoyed a 20% uptick in their lifetime value.            
          `
        },
        {
            role: "user",
            content: `Create a STAR story for this resume achievement: "${content}". Here are some details about the achievement: ${details}. Refine the story and tailor it to this job post: ${JSON.stringify(jobApp.job)}`
        }
    ]

    return (
        <>
            <div className="py-2">
                <button
                    className='inline-flex shadow-md rounded-xl w-full my-2 p-3 hover:bg-gray-100 rounded text-gray-600 ml-auto hover:text-gray-600 outline-none'
                    onClick={handleClick}
                > Show Star Story
                </button>
                <div className={`${active ? ' ' : 'hidden'}`}>
                <ChatWithGPT
                    documentID={documentID}
                    setKey={setKey}
                    message={message}
                    currentState={currentState}
                    updateState={updateState}
                    parentIndex={parentIndex}
                    childIndex={childIndex}
                    saveToDatabase={updateResumeAction}
                    temp={0.7}
                />
                </div>
            </div>
        </>
    );
}
