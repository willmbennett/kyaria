import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { getChat } from "../../../lib/chat-db";
import { Message } from "ai";
import { redirect } from "next/navigation";
import { VideoChatContainer } from "../../components/chatbot/VideoChatContainer";

export default async function ChatbotPage({ params }: { params: { id: string } }) {
    const { userId, activeSubscription, admin } = await checkSubscription()
    console.log({ userId, activeSubscription, admin })

    const chatId = params.id

    if (!chatId) {
        return <p>Chat not found</p>
    }

    const { chat } = await getChat(chatId)

    if (!chat) {
        return <p>We're sorry we had an issue creating a new chat with Eve</p>
    }
    //console.log('At Eve, chat ', chat)

    const messages: Message[] = chat.messages

    //console.log('At Eve, messages ', messages)

    return (
        <VideoChatContainer
            userId={userId}
            chatId={chatId}
            messages={messages}
            activeSubscription={activeSubscription}
            admin={true}
        />
    );
}
