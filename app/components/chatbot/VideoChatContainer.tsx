'use client'
import React, { useState } from 'react';
import VideoChatComponent from './VideoChatComponent';
import TimedAccessComponent from './VideoSubscriptionWrapper';
import { ChatTranscript } from './ChatTranscript';
import { Message } from 'ai';
import { Button } from '../Button';
import { SidebarToggle } from '../sidebar/ToggleSidebar';

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
        <div className="flex h-full md:h-screen w-full justify-center text-center gap-4 overflow-hidden">
            <div className='h-full w-full flex flex-col gap-4'>
                <h1 className="text-2xl font-semibold">Career Coaching Session</h1>
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
                <div className={`w-full h-3/4 justify-center items-center ${showTranscript ? 'flex flex-col gap-4' : 'hidden'}`}>
                    <Button
                        onClick={toggleTranscript}
                        size='sm'
                    >
                        Show Video
                    </Button>
                    <div className='relative h-full overflow-y-scroll overscroll-none px-2'>
                        <div className='h-full'>
                            <ChatTranscript messages={messages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
