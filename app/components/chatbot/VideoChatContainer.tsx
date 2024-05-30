'use client'
import React, { useEffect, useMemo, useState } from 'react';
import VideoChatComponent from './VideoChatComponent';
import { Chat } from './Chat';
import { Message } from 'ai';
import { Button } from '../Button';
import { nanoid } from 'nanoid'
import { useAssistant } from '../../../lib/chatbot/use-assistant';

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

    const { submitUserMessage, chatMessages, textToSubmit, setTextToSubmit } = useAssistant({ chatId, threadId, messages })

    const renderVideoChatComponent = <VideoChatComponent
        toggleTranscript={toggleTranscript}
        submitUserMessage={submitUserMessage}
        textToSubmit={textToSubmit}
        setTextToSubmit={setTextToSubmit}
        showTranscript={showTranscript}
        numMessages={numMessages}
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
        <div className={`flex flex-col md:flex-row h-full  w-full justify-center text-center gap-4 sm:p-1 md:p-2 lg:p-3 xl:p-4 overflow-hidden`}>
            {handleVideoComponent}
            <Chat messages={chatMessages} showTranscript={showTranscript} />
        </div>
    );
};
