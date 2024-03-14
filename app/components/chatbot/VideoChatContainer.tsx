'use client'
import React, { useState } from 'react';
import VideoChatComponent from './VideoChatComponent';
import TimedAccessComponent from './VideoSubscriptionWrapper';
import { ChatTranscript } from './ChatTranscript';
import { Message } from 'ai';
import { Button } from '../Button';

interface VideoChatContainerProps {
    userId: string;
    chatId: string;
    messages: Message[];
    activeSubscription: boolean;
    admin: boolean
}

export const VideoChatContainer = ({ userId, chatId, messages, activeSubscription, admin }: VideoChatContainerProps) => {
    const [showTranscript, setShowTranscript] = useState(false);

    const toggleTranscript = () => {
        setShowTranscript(!showTranscript);
    };

    const renderVideoChatComponent = <VideoChatComponent
        userId={userId}
        chatId={chatId}
        messages={messages}
        toggleTranscript={toggleTranscript}
        showTranscript={showTranscript}
        admin={admin}
    />

    return (
        <div className="min-h-screen flex flex-col w-full py-10 justify-center text-center gap-4">
            <div>
                <Button size='sm' variant='ghost' href="/eve">← Back to Menu</Button>
            </div>
            <h1 className="text-2xl font-semibold">Career Coaching Session</h1>
            <div className="flex-grow w-full">
                {activeSubscription ? (
                    <div className={`${showTranscript ? 'hidden' : 'block'}`}>
                        {renderVideoChatComponent}
                    </div>
                ) : (
                    <div className={`${showTranscript ? 'hidden' : 'block'}`}>
                        <TimedAccessComponent>
                            {renderVideoChatComponent}
                        </TimedAccessComponent>
                    </div>
                )}
                <div className={`w-full justify-center items-center ${showTranscript ? 'flex flex-col' : 'hidden'}`}>
                    <Button
                        onClick={toggleTranscript}
                        size='sm'
                    >
                        Show Video
                    </Button>
                    <div className='flex max-w-5xl'>
                        <ChatTranscript messages={messages} />
                    </div>
                </div>
            </div>
        </div>
    );
};
