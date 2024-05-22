'use client'
import React, { useMemo, useState } from 'react';
import VideoChatComponent from './VideoChatComponent';
import { Chat } from './Chat';
import { Message } from 'ai';
import { Button } from '../Button';

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

    const toggleTranscript = () => {
        setShowTranscript(!showTranscript);
    };

    const renderVideoChatComponent = <VideoChatComponent
        userId={userId}
        chatId={chatId}
        threadId={threadId}
        messages={messages}
        toggleTranscript={toggleTranscript}
        showTranscript={showTranscript}
        admin={admin}
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

    return (
        <div className={`flex ${jobId ? '' : "md:h-screen"}  w-full justify-center text-center gap-4 px-1 md:px-4 lg:px-10 xl:px-20 overflow-hidden`}>
            {handleVideoComponent}
            <Chat messages={messages} showTranscript={showTranscript} />
        </div>
    );
};
