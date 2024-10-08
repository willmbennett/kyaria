"use server";
import { revalidatePath } from "next/cache";
import { createInitialChat, deleteChat, findChat, getChat, updateChat } from "../../lib/chat-db";
import { getFirstResume } from "../../lib/resume-db";
import { Message } from "ai";
import { ActionItemType } from "../board/job-helper";
import { openai } from "../openai";

const logging = false

export async function getResumeAction(userId: string) {
    const { resume } = await getFirstResume(userId)
    return resume
}

export async function findChatAction(sessionId: string, path: string) {
    const { chat } = await findChat(sessionId);
    revalidatePath(path);
    return chat
}

export async function getChatAction(id: string, path: string) {
    const { chat } = await getChat(id);
    revalidatePath(path);
    return chat
}

interface CreateInitialChatActionProps {
    userId: string,
    threadId: string,
    path: string,
}

export async function createInitialChatAction({
    userId,
    threadId,
    path,
}: CreateInitialChatActionProps) {
    const { chatId } = await createInitialChat(userId, threadId);
    revalidatePath(path);
    return chatId
}

export async function updateChatAction(
    id: string,
    newMessages: Message,
    path: string
) {
    await updateChat(id, newMessages);
    revalidatePath(path);
}

export async function deleteChatAction({
    id,
    path,
}: {
    id: string;
    path: string;
}) {
    const { error } = await deleteChat(id);
    revalidatePath(path);
    return { error }
}

export const handleChatDeletion: ActionItemType = async (chatId: string, path: string) => {
    "use server"
    const { error } = await deleteChatAction({ id: chatId, path })
    if (error) {
        return { error }
    } else {
        const url = "/eve"
        return { url }
    }
}

export const handleChatCreation = async ({ userId, interviewdata }: {
    userId: string,
    interviewdata?: any;
}) => {
    "use server";

    // Log the beginning of the chat creation process
    if (logging) console.log('Initiating chat creation...');

    try {
        const messages: any[] = [] // OpenAI is really funky with their types and definitions not aligning with the api
        if (interviewdata) {
            const newMessage = {
                role: 'user',
                content: `Here is my resume ${JSON.stringify(interviewdata.userResume)}. Here is the job position: ${JSON.stringify(interviewdata.jobPosition)}}`,
            }
            messages.push(newMessage)
        }
        if (logging) console.log(messages)
        const emptyThread = await openai.beta.threads.create({ messages });
        if (logging) console.log(emptyThread)
        const threadId = emptyThread.id;

        if (!threadId) {
            // Log an error if no threadId was obtained
            if (logging) console.error('No threadId received from the server');
            return { error: 'Failed to retrieve thread ID' };
        }

        // Log the received threadId
        if (logging) console.log(`Received threadId: ${threadId}`);

        const chatId = await createInitialChatAction({ userId, threadId, path: '/eve' });

        if (chatId) {
            // Log the successful creation of chat
            if (logging) console.log(`Chat created successfully with chatId: ${chatId}`);
            const url = `/eve/${chatId}`;
            return { chatId, url };
        } else {
            // Log an error if chat creation failed
            if (logging) console.error('Failed to create initial chat action');
            const error = 'There was a problem creating a new chat';
            return { error };
        }
    } catch (error) {
        // Log any caught errors
        console.error('An error occurred during chat creation:', error);
        return { error: 'An unexpected error occurred' };
    }
};