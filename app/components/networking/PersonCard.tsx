import Link from "next/link";
import { PersonClass } from "../../../models/Person";
import ChatOutput from "./ChatOutput";
import { ResumeClass } from "../../../models/Resume";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { Message } from "ai";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

// Define the props for the component
interface PersonCardProps {
    person: Partial<PersonClass>;
    userResume: ResumeClass
}

export default function PersonCard(
    {
        person,
        userResume
    }: PersonCardProps
) {
    const [sending, setSending] = useState(true)
    const {
        image,
        name,
        summary,
        crunchbaseUri,
        linkedInUri,
        emailAddresses,
        description
    } = person


    const emailMessages: Message[] = [
        {
            id: "2",
            role: "user",
            content: `Please write me a networking email subject line that I can send to this person: ${JSON.stringify(person)}. Here is my resume: ${JSON.stringify(userResume)}. Only output the first 70 characters though and end with ...`
        },
        { id: '3', role: 'assistant', content: '' }
    ]

    const linkedInMessages: Message[] = [
        {
            id: '1',
            role: "system",
            content: `Craft a truncated LinkedIn outreach message to a recruiter, focusing on a specific job interest. Only output the first 70 characters though and end with ...
            Example: Hi Derek, I'm Will Bennett, a tech enthusiast with a background...`
        },
        {
            id: "2",
            role: "user",
            content: `Please write me a truncated linkedIn connection request that I can send to this person: ${JSON.stringify(person)}. Here is my resume: ${JSON.stringify(userResume)}. Tone: conversational, spartan, use less corporate jargon. Only output the first 70 characters though and end with ...`
        },
        { id: '3', role: 'assistant', content: '' }
    ]

    useEffect(() => {
        setSending(true);
        const timer = setTimeout(() => {
            setSending(false);
        }, 10000); // Simulate sending for 5 seconds
        return () => clearTimeout(timer);
    }, []);

    const renderSending = () => {
        return (
            <>
                {
                    sending ? (<div className='space-y-2'>
                        <div className="flex justify-center items-center space-x-2">
                            <p className="text-gray-700 dark:text-gray-400">Sending</p>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </div>
                    ) : (
                        <div className="flex justify-center space-x-2">
                            <p className="text-gray-700 dark:text-gray-400">Sent</p>
                            <CheckCircleIcon className="h-6 w-6 text-green-500" />
                        </div>
                    )
                }
            </>
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden w-full flex flex-row space-x-5 p-10">
            {/* Image container with responsive image and circular style */}
            <div className="w-1/3">
                <div className="flex justify-center mt-5">
                    {image ? (
                        <img className="rounded-full w-32 h-32 object-cover" src={image} alt={`${name}'s profile picture`} />
                    ) : (
                        <div className="w-32 h-32 rounded-full flex items-center justify-center border">
                            <svg className="svg-icon w-1/2 h-auto" viewBox="0 0 20 20">
                                <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                            </svg>
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center">{name}</h5>
                    <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">{summary}</p>
                    {/*<p className="line-clamp-3 text-xs">
                    {description}
                </p> */}
                    <div className="flex justify-around space-x-2 mt-4">
                        <Link href={`https://www.${crunchbaseUri}`} target="_blank">
                            <span className="text-indigo-600 hover:text-indigo-900 transition duration-300" aria-label="Crunchbase profile">
                                Crunchbase Profile
                            </span>
                        </Link>
                        <Link href={`https://www.${linkedInUri}`} target="_blank">
                            <span className="text-indigo-600 hover:text-indigo-900 400 transition duration-300" aria-label="LinkedIn profile">
                                LinkedIn Profile
                            </span>
                        </Link>
                    </div>

                    {emailAddresses && emailAddresses.length > 0 && false && (<>
                        <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">Contact Info</p>
                        <ul>
                            {emailAddresses?.map((e, i) => (
                                <li key={i}>{e.contactString}</li>
                            ))}
                        </ul>
                    </>)}
                </div>
            </div>
            <div className="w-2/3 text-center">
                <>
                    <div className="flex flex-col gap-4 h-full">
                        {/* About Section */}
                        <div className="flex h-1/3 flex-row items-center p-4 space-x-2 rounded-lg bg-gray-50">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 shrink-0">About</h5>
                            <p className="text-justify flex-grow text-xs p-2">{description?.slice(0, 100) + '...' || 'No description available.'}</p>
                        </div>

                        {/* Email Section - Styled to resemble an inbox */}
                        <div className="flex h-1/3 flex-row items-center bg-gray-100 p-4 space-x-2 rounded-lg">
                            <h5 className="text-lg font-semibold shrink-0">Email</h5>
                            <div className="flex flex-grow h-full items-center bg-white rounded-md border border-gray-300">
                                <div className="truncate text-xs text-wrap p-2">
                                    {/* Extracting only the subject line for the emailMessages */}
                                    <ChatOutput initialMessages={emailMessages} />
                                </div>

                            </div>
                            {renderSending()}
                        </div>

                        {/* LinkedIn Section - Styled to resemble a LinkedIn message */}
                        <div className="flex h-1/3 flex-row items-center bg-blue-100 space-x-2 p-2 rounded-lg">
                            <h5 className="text-lg font-semibold shrink-0">LinkedIn</h5>
                            <div className="flex flex-grow h-full items-center bg-white rounded-md border border-gray-300">
                                <div className="truncate text-xs text-wrap p-2">
                                    {/* Extracting a snippet for the LinkedInMessages */}
                                    <ChatOutput initialMessages={linkedInMessages} />
                                </div>
                            </div>
                            {renderSending()}
                        </div>
                    </div>

                </>
            </div>
        </div>
    );
}
