import React, { useState } from 'react';
import { Message, useChat } from 'ai/react';
import { Button } from '../Button';
import { JobClass } from '../../../models/Job';
import { ResumeBuilderFormData } from '../../resumebuilder/resumetest-helper';
import { ChatMessage } from '../board/ChatMessage';

interface FeedbackProps {
    userResume: ResumeBuilderFormData;
    job?: Partial<JobClass>;
};

const Feedback = ({ userResume, job }: FeedbackProps) => {
    const [loading, setLoading] = useState(false)

    const initialMessages: Message[] = [
        {
            id: "1", role: "system", content: `You are an advanced career coach specialized in writing resume professional resumes. Here is the user's resume ${JSON.stringify(userResume)}. Provide in-depth feedback on the user's resume and break down your feedback into the following categories: Impact, Brevity, Style, Sections and Soft Skills. Don't mention privacy of contact details.`
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
            <h1 className="text-start text-xl font-semibold text-slate-900 pt-3">
                Resume Feedback
            </h1>
            <Button variant={loading ? 'ghost' : 'solid'} size='md' type="button" onClick={loading ? handleStop : handleStart} >{buttonName}</Button>
            {/* This div will be the scrolling container */}
            <div className='flex w-full h-full overflow-y-scroll overscroll-none'>
            {messages.map((message) => (
                message.role === 'assistant' && <ChatMessage key={message.id} message={message} />
            ))}
            </div>
        </div>
    );
};

export default Feedback;
