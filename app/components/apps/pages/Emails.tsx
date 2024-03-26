"use client"
import { useState } from 'react';
import { Emails } from '../../../../models/App';
import { JobClass } from '../../../../models/Job';
import { ResumeClass } from '../../../../models/Resume';
import { updateJobAppAction } from '../../../apps/_action';
import ChatWithGPT from '../../chat/ChatWithGPT';
import { Message } from 'ai';

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

interface ExperienceProps {
    jobAppId: string,
    emails: Emails[],
    jobKeyWords: string[],
    userResumeStripped: Partial<ResumeClass>,
    jobStripped: Partial<JobClass>
}

export default function Experience({
    jobAppId,
    emails,
    jobKeyWords,
    userResumeStripped,
    jobStripped
}: ExperienceProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(emails[0]);
    const [emailIndex, setEmailIndex] = useState(0);

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
                        const message: Message[] = [
                            {
                                "id": '1',
                                "role": "system",
                                "content": `You are a professional email writer specialized in creating concise, personalized, compelling emails for jobseekers. Tone: conversational, spartan, use less corporate jargon`
                            },
                            {
                                "id": '2',
                                "role": "user",
                                "content": `Please write me a ${selectedEmail.type} email for this job post: ${JSON.stringify(jobStripped)}.
                                Include information from my profile ${JSON.stringify(userResumeStripped)} and keep the writing style consistent. Be concise and keep the email short. 
                            `
                            }
                        ]
                        return (
                            <div className={i != emailIndex ? 'hidden' : ''} key={i}>
                                <ChatWithGPT
                                    documentID={jobAppId}
                                    setKey={`emails.${i}.content`}
                                    message={message}
                                    currentState={email.content}
                                    parentIndex={i}
                                    saveToDatabase={updateJobAppAction}
                                    temp={0.9}
                                    jobKeyWords={jobKeyWords}
                                    activeSubscription={true}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}








