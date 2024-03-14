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
        <div className="relative">
            {messages.map((message, index) => (<div key={index}>
                <div className={message.role == 'assistant' ? "text-left" : "text-right"}>
                    <p className='my-1 font-bold'>
                        {message.role == 'assistant' ? "Eve" : "You"}
                    </p>
                </div>
                <div className={`p-3 my-2 rounded-xl boarder-2 ${message.role == 'assistant' ? "bg-gray-100" : "bg-slate-200 text-right"}`}>
                    <ChatMessage message={message} />
                </div>
                {index < messages.length - 1 && (
                    <Separator className="my-2 md:my-4" />
                )}
            </div>))}
        </div>
    )
}