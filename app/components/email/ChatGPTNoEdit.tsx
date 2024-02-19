import React, { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from '../Button';
import { ChatMessage } from '../board/ChatMessage';
import { Message } from 'ai';

interface FeedbackProps {
    message: Message[]
};

export const ChatGPTNoEdit = ({ message }: FeedbackProps) => {
    const [loading, setLoading] = useState(false)

    const initialMessages: Message[] = [
        ...message,
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
        </div>
    );
};
