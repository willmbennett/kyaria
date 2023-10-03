'use client'

import ChatWithGPT from '../../ChatWithGPT';
import { useState } from 'react';
import { updateResumeAction } from '../../../../board/_action';

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

export default function StarStory({
    jobApp,
    documentID,
    setKey,
    content,
    details,
    currentState,
    parentIndex,
    childIndex
}: {
    jobApp: any,
    documentID: string,
    setKey: string,
    content: string,
    details: string,
    currentState: string,
    parentIndex: number,
    childIndex: number
}) {
    const [active, setActive] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const themes = [
        'None',
        'Leadership',
        'Conflict Resolution',
        'Collaboration',
        'Problem Solving',
        'Time Management',
        'Adaptability',
        'Communication',
        'Customer Service',
        'Initiative',
        'Teamwork'
    ];
    
    const [selectedTheme, setSelectedTheme] = useState(themes[0]);

    const handleClick = () => {
        setActive(!active);
    };

    const optionsClick = () => {
        setShowOptions(!showOptions);
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
            content: `Create a STAR story ${selectedTheme == '' ? '' : `with the theme of ${selectedTheme}`} for this resume achievement: "${content}". 
            Here are some details about the achievement: ${details}. 
            Refine the story and tailor it to this job post: ${JSON.stringify(jobApp.job)}.
            Keep the story short, I should be able to say it in under 30 seconds and don't add any sections outside the STAR format.`
        }
    ]

    return (
        <>
            <div className="rounded-xl p-2">
                <div className='flex w-full justify-between'>
                    <div className='felx flex-col '>
                        <p>Select a theme for your answer</p>
                    </div>
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                onClick={optionsClick}
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                {selectedTheme}
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {showOptions && (
                            <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                <div className="py-1" role="none">
                                    {
                                        themes.map((l, i) => {
                                            const selectOption = () => {
                                                setSelectedTheme(themes[i]);
                                                setShowOptions(!showOptions);
                                            };

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={selectOption}
                                                    className={`text-gray-700 w-full block px-4 py-2 text-sm ${selectedTheme === themes[i] ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
                                                >
                                                    {themes[i]}
                                                </button>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <button
                    className='inline-flex w-full my-2 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    onClick={handleClick}
                > Show your story
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                </button>
                <div className={`${active ? 'p-3' : 'hidden'}`}>
                    <ChatWithGPT
                        documentID={documentID}
                        setKey={setKey}
                        message={message}
                        currentState={currentState}
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
