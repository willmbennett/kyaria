'use client'
import React, { useEffect, useMemo, useState } from 'react';
import VideoChatComponent from './VideoChatComponent';
import { Chat } from './Chat';
import { Message } from 'ai';
import { Button } from '../Button';
import { nanoid } from 'nanoid'
import { useAssistant } from '../../../lib/chatbot/use-assistant';
import { cn } from '../../../lib/utils';
import Link from 'next/link';

interface VideoChatContainerProps {
    userId: string;
    chatId: string;
    threadId: string;
    messages: Message[];
    activeSubscription: boolean;
    admin: boolean
    jobId?: string
}

export const VideoChatContainer = ({ userId, chatId, threadId, messages, activeSubscription, admin, jobId }: VideoChatContainerProps) => {
    const [showTranscript, setShowTranscript] = useState(true);
    const numMessages = messages.length

    const toggleTranscript = () => {
        setShowTranscript(!showTranscript);
    };

    const {
        interviewing,
        interviewName,
        submitUserMessage,
        chatMessages,
        textToSubmit,
        setTextToSubmit,
        mockInterviewId
    } = useAssistant({ userId, chatId, threadId, messages })

    const renderVideoChatComponent = <VideoChatComponent
        toggleTranscript={toggleTranscript}
        submitUserMessage={submitUserMessage}
        textToSubmit={textToSubmit}
        setTextToSubmit={setTextToSubmit}
        showTranscript={showTranscript}
        numMessages={numMessages}
        mockInterviewId={mockInterviewId}
    />

    // Use useMemo to efficiently calculate the number of assistant messages
    const assistantMessageCount = useMemo(() => {
        return messages.filter(message => message.role === 'assistant').length;
    }, [messages]);

    // Conditionally render components based on the number of assistant messages
    const handleSubscription = assistantMessageCount < 10 ? (
        <>
            <p>{10 - assistantMessageCount} messages left on free plan</p>
            {renderVideoChatComponent}
        </>
    ) : (
        <div>
            <p>Message limit reached.</p>
            <Button href="/pricing" size="sm">
                Subscribe to chat more
            </Button>
        </div>
    );

    const handleVideoComponent = activeSubscription ? renderVideoChatComponent : handleSubscription

    const recordingPing = <div className='flex gap-2 items-center'>
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <p className='text-red-500'>Recording</p>
    </div>

    return (
        <div className={cn(`flex flex-col md:flex-row h-full  w-full justify-center text-center gap-4 sm:p-1 md:p-2 lg:p-3 xl:p-4 overflow-hidden`, interviewing && 'bg-slate-100')}>
            <div className='flex flex-col w-full justify-end h-full gap-2'>
                {interviewName && mockInterviewId && (
                    <div className='flex gap-4'>
                        <Link className="text-left font-bold text-lg font-slate-800" href={`/mockinterviews/${mockInterviewId}`}>{interviewName}</Link>
                        {recordingPing}
                    </div>
                )}
                {handleVideoComponent}
            </div>
            <Chat messages={chatMessages} showTranscript={showTranscript} />
        </div>
    );
};
