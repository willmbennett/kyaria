import { type Message } from 'ai'

import { ChatMessage } from './ChatMessage'
import { Separator } from '../ui/separator'

export interface ChatList {
    messages: Message[]
}

export function ChatList({ messages }: ChatList) {
    if (!messages.length) {
        return null
    }

    return (
        <>
            {messages.map((message, index) => (<div key={index} className='flex flex-col gap-2'>
                <div className={`sticky top-0 py-2 bg-white ${message.role == 'assistant' ? "text-left" : "text-right"}`}>
                    <p className='font-bold'>
                        {message.role == 'assistant' ? "Eve" : "You"}
                    </p>
                </div>
                <div className={`p-3 rounded-xl boarder-2 ${message.role == 'assistant' ? "bg-gray-100" : "bg-slate-200 text-right"}`}>
                    <ChatMessage message={message} />
                </div>
                {index < messages.length - 1 && (
                    <Separator />
                )}
            </div>))}
        </>
    )
}