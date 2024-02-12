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

    const triggerPersonSummary = () => {
        //console.log('triggering reload of user data')
        reload();
    }

    const debouncedTriggerPersonSummary = useCallback(debounce(triggerPersonSummary, 500), [triggerPersonSummary]);


    useEffect(() => {
        // To ensure we only call reload once when the component mounts and if the last message is empty
        // We directly check if lastMessage.content is empty without relying on a separate streaming state
        debouncedTriggerPersonSummary()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <div className='flex w-full h-full overflow-y-scroll overscroll-none'>
            {lastmessage && lastmessage.role === 'assistant' && <ChatMessage key={lastmessage.id} message={lastmessage} />}
        </div>
    );
}
