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
          <ul>
            <li><b>Situation:</b> I was a Product Manager at Doximity, overseeing our advertising product. We had a high churn rate among our small to medium-sized clients.</li>
            <br />
            <li><b>Task:</b> My task was to identify the reasons for this high churn and implement strategies to improve retention.</li>
            <br />
            <li><b>Action:</b> I led a cross-functional team to gather data and customer feedback. Based on the insights, we revamped the user interface, added in-app tutorials, and introduced a tiered pricing model. I coordinated with marketing to communicate these changes to our existing clients.</li>
            <br />
            <li><b>Result:</b> Within three months, our churn rate for small to medium-sized clients decreased by 30%, and we saw a 20% increase in lifetime value from this segment.</li>
          </ul>

          Keep the length around the same as the example.
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
