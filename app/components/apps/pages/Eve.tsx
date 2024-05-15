import { Message } from "ai";
import { getChat } from "../../../../lib/chat-db";
import { handleChatCreation } from "../../../eve/_action";
import { VideoChatContainer } from "../../chatbot/VideoChatContainer";
import { updateJobAppAction } from "../../../apps/_action";
import { JobClass } from "../../../../models/Job";

interface EveProps {
    jobAppId: string
    jobId: string;
    jobStripped: Partial<JobClass>;
    resumeId: string;
    userId: string;
    chatId?: string;
    activeSubscription: boolean;
    admin: boolean;
}

export default async function Eve({ jobAppId, jobId, jobStripped, resumeId, userId, chatId, activeSubscription, admin }: EveProps) {
    //console.log({ resumeId, jobId, chatId })

    let currentChatId: string

    if (chatId) {
        currentChatId = chatId
    } else {
        const { chatId } = await handleChatCreation({ userId, jobStripped })
        if (chatId) {
            const stateUpdate = { chatId }
            await updateJobAppAction(jobAppId, stateUpdate, '/apps/' + jobAppId)
            currentChatId = chatId
        } else {
            const error = 'There was a problem creating a new chat'
            throw new Error(error)
        }
    }


    const { chat } = await getChat(currentChatId)

    if (!chat) {
        return <p>We're sorry we had an issue waking Eve up.</p>
    }
    //console.log('At Eve, chat ', chat)

    const messages: Message[] = chat.messages

    //console.log('At Eve, messages ', messages)

    return (
        <VideoChatContainer
            userId={userId}
            chatId={chat._id.toString()}
            threadId={chat.threadId}
            messages={messages}
            activeSubscription={activeSubscription}
            admin={admin}
            jobId={jobId}
        />
    );
}
