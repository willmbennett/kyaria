import React, { useState } from 'react';
import { Message, useChat } from 'ai/react';
import { Button } from '../Button';
import { JobClass } from '../../../models/Job';
import { ChatMessage } from '../chat/ChatMessage';
import { ResumeClass } from '../../../models/Resume';

interface FeedbackProps {
    userResume: ResumeClass;
    job?: Partial<JobClass>;
};

const Feedback = ({ userResume, job }: FeedbackProps) => {
    const [loading, setLoading] = useState(false)

    // Usage
    const cleanedObj = cleanAndClone(userResume);

    const initialMessages: Message[] = [
        {
            id: "1", role: "system", content: `You are an advanced career coach specialized in writing resume professional resumes. Here is the user's resume ${JSON.stringify(cleanedObj)}. Provide in-depth feedback on the user's resume and break down your feedback into the following categories: Impact, Brevity, Style, Sections and Soft Skills. Don't mention privacy of contact details.`
        },
        {
            id: "2", role: "user", content: `Provide feedback on my resume ${job ? `and how I could make it better for this job post ${JSON.stringify(job)}` : ''}. Your response should just be the feedback text. Tone: conversational, spartan, use less corporate jargon`
        },
        { id: '3', role: 'assistant', content: '' }
    ]

    const { messages, reload, stop } = useChat({
        body: {
            temp: 0.3
        },
        initialMessages,
        onFinish() {
            setLoading(false);
        }
    });

    const lastmessage = messages[messages.length - 1]

    async function handleStart() {
        setLoading(true)
        reload()
    }

    async function handleStop() {
        setLoading(false)
        stop()
    }

    const buttonName = loading ? 'Stop' : `${lastmessage.content.length > 0 ? 'Regenerate' : 'Generate'}`

    return (
        <div className="flex flex-col justify-start h-full space-y-2"> {/* Ensures the container takes full height */}
            <div>
                <Button variant={loading ? 'ghost' : 'solid'} size='md' type="button" onClick={loading ? handleStop : handleStart} >{buttonName}</Button>
            </div>
            {/* This div will be the scrolling container */}
            <div className='flex w-full h-full overflow-y-scroll overscroll-none'>
                {messages.map((message) => (
                    message.role === 'assistant' && <ChatMessage key={message.id} message={message} />
                ))}
            </div>
        </div >
    );
};

export default Feedback;

type AnyObject = Record<string, any>;

function deepClone(obj: AnyObject): AnyObject {
    return JSON.parse(JSON.stringify(obj));
}

function isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function isEmptyValue(value: any): boolean {
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return value === '' || value === null || value === undefined;
}

function cleanObject(obj: AnyObject): AnyObject {
    const newObj: AnyObject = {};

    Object.keys(obj).forEach(key => {
        if (key === 'sectionOrder') return; // Skip 'sectionOrder'

        const value = obj[key];

        if (Array.isArray(value)) {
            const cleanedArray = value
                .map(item => isObject(item) ? cleanObject(item) : item)
                .filter(item => !isEmptyValue(item));

            if (cleanedArray.length > 0) {
                newObj[key] = cleanedArray;
            }
        } else if (isObject(value)) {
            const cleanedObj = cleanObject(value);
            if (Object.keys(cleanedObj).length > 0) {
                newObj[key] = cleanedObj;
            }
        } else if (!isEmptyValue(value)) {
            newObj[key] = value;
        }
    });

    return newObj;
}

function cleanAndClone(originalObj: AnyObject): AnyObject {
    const clonedObj = deepClone(originalObj);
    return cleanObject(clonedObj);
}
