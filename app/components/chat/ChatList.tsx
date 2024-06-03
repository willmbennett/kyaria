import { type Message } from 'ai'
import { Separator } from '../ui/separator'
import { BotMessage, UserMessage } from '../chatbot/Message'

export interface ChatList {
    messages: Message[]
    handleMessageClick?: (m: Message) => void
}

export function ChatList({ messages, handleMessageClick }: ChatList) {
    if (!messages.length) {
        return null;
    }

    return (
        <>
            {messages.map((message, index) => {

                const handleClick = () => {
                    if (handleMessageClick) handleMessageClick(message);
                }

                const Container = handleMessageClick ? 'button' : 'div';

                return (
                    <Container
                        key={index}
                        className={`relative text-left ${handleMessageClick ? 'cursor-pointer' : ''}`}
                        id={message.id}
                        onClick={handleMessageClick ? handleClick : undefined}
                    >
                        {message.role === 'user' ? (
                            <UserMessage>{message.content}</UserMessage>
                        ) : (
                            <BotMessage content={message.content} />
                        )}
                        {index < messages.length - 1 && (
                            <Separator className="my-4 border-b" />
                        )}
                    </Container>
                );
            })}
        </>
    );
}
