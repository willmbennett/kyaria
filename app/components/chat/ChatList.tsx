import { type Message } from 'ai'
import { Separator } from '../ui/separator'
import { BotMessage, UserMessage } from '../chatbot/Message'

export interface ChatList {
    messages: Message[]
}

export function ChatList({ messages }: ChatList) {
    if (!messages.length) {
        return null
    }

    return (
        <>
            {messages.map((message, index) => (
                <div key={index} className='relative'>
                    {message.role === 'user' ? <UserMessage>{message.content}</UserMessage> : <BotMessage content={message.content} />}
                    {index < messages.length - 1 && (
                        <Separator className="my-4" />
                    )}
                </div>))}
        </>
    )
}