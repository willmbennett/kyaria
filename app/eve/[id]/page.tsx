import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { getChat } from "../../../lib/chat-db";
import { Message } from "ai";
import { VideoChatContainer } from "../../components/chatbot/VideoChatContainer";
import { redirect } from "next/navigation";

export default async function ChatbotPage({ params }: { params: { id: string } }) {
    const { userId, activeSubscription, admin, userName } = await checkSubscription(true)
    //console.log({ userId, activeSubscription, admin })

    const chatId = params.id

    if (!chatId) {
        return <p>Chat not found</p>
    }

    const { chat } = await getChat(chatId)

    if (!chat) {
        return <p>We're sorry we had an issue creating a new chat with Eve</p>
    }

    // Make chats private
    if (chat.userId != userId && !admin) redirect('/eve')

    const messages: Message[] = chat.messages

    const initialMessage = `Please introduce yourself and welcome me to this career coaching session, my name is ${userName}`

    return (
        <VideoChatContainer
            userId={userId}
            initialMessage={initialMessage}
            chatId={chatId}
            threadId={chat.threadId}
            messages={messages}
            activeSubscription={activeSubscription}
        />
    );
}
