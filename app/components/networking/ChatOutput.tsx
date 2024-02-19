'use client'
import { Message } from "ai";
import { useChat } from "ai/react";
import { useCallback, useEffect, useState } from "react";
import { ChatMessage } from "../board/ChatMessage";
import { debounce } from "lodash";

// Define the props for the component
interface PersonCardProps {
    initialMessages: Message[]
}

export default function ChatOutput(
    {
        initialMessages
    }: PersonCardProps
) {

    const { messages, reload } = useChat({
        body: {
            temp: 0.3
        },
        initialMessages
    });

    const lastmessage = messages[messages.length - 1]

    const triggerPersonSummary = useCallback(() => {
        //console.log('triggering reload of user data')
        reload();
    }, [initialMessages])

    const debouncedTriggerPersonSummary = useCallback(debounce(triggerPersonSummary, 100), [triggerPersonSummary]);


    useEffect(() => {
        debouncedTriggerPersonSummary();
        return () => {
            debouncedTriggerPersonSummary.cancel();
        };
    }, []);



    return (
        <div className='flex w-full h-full overflow-y-scroll overscroll-none'>
            {lastmessage && lastmessage.role === 'assistant' && <ChatMessage key={lastmessage.id} message={lastmessage} />}
        </div>
    );
}
