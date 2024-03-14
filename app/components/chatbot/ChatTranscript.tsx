'use client'
import { Message } from "ai"
import { ChatList } from "../chat/ChatList"

export const ChatTranscript = ({ messages }: { messages: Message[] }) => {

    return (
        <div>
            <ChatList messages={messages.slice(2)} />
        </div>
    )
}