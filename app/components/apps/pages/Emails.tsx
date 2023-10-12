"use client"
import { useState } from 'react';
import { removeDetailSections } from '../../../apps/[id]/app-helper';
import { updateJobAppAction } from '../../../board/_action';
import ChatWithGPT from '../../board/ChatWithGPT';

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

export default function Experience({
    jobApp,
    jobKeyWords
}: {
    jobApp: any,
    jobKeyWords: string[]
}) {
    const emails = jobApp.emails;
    const [showOptions, setShowOptions] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(emails[0]);
    const [emailIndex, setEmailIndex] = useState(0);
    const profileNoDetails = removeDetailSections(jobApp.profile)

    const optionsClick = () => {
        setShowOptions(!showOptions);
    };


    return (
        <>
            <h1 className=" text-center sm:text-6xl text-4xl max-w-[708px] font-bold mb-8">
                Let's write emails
            </h1>
            <div className="lg:p-6 w-full">
                <div className='flex w-full justify-between my-2'>
                    <div className='felx flex-col '>
                        <p>Select the email you want to write</p>
                    </div>
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                onClick={optionsClick}
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true">
                                {selectedEmail.type}
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {showOptions && (
                            <div
                                className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                <div className="py-1" role="none">
                                    {
                                        emails.map((email: any, i: number) => {
                                            const selectOption = () => {
                                                setSelectedEmail(emails[i]);
                                                setEmailIndex(i)
                                                setShowOptions(!showOptions);
                                            };

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={selectOption}
                                                    className={`w-full block px-4 py-2 text-sm ${selectedEmail === emails[i] ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
                                                >
                                                    {email.type}
                                                </button>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {
                    emails.map((email: any, i: number) => {
                        const message = [
                            {
                                "role": "system",
                                "content": `You are a professional email writer specialized in creating personalized, compelling emails for jobseekers. Keep them 4 sentances max and casual, keep headlines short to under 60 characters.`
                            },
                            {
                                "role": "user",
                                "content": `Please write me a ${selectedEmail.type} email for this job post: ${JSON.stringify(jobApp.job)}.
                                Include information from my profile ${JSON.stringify(profileNoDetails)} and keep the writing style consistent. 
                            `
                            }
                        ]
                        return (
                            <div className={i != emailIndex ? 'hidden' : ''} key={i}>
                                <ChatWithGPT
                                    documentID={jobApp._id}
                                    setKey={`emails.${i}.content`}
                                    message={message}
                                    currentState={email.content}
                                    parentIndex={i}
                                    saveToDatabase={updateJobAppAction}
                                    temp={0.9}
                                    jobKeyWords={jobKeyWords}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}








