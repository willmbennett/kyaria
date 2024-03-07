"use server";
import { revalidatePath } from "next/cache";
import { createInitialChat, findChat, updateChat } from "../../lib/chat-db";
import { getFirstResume } from "../../lib/resume-db";
import { Message } from "ai";

export async function getResumeAction(userId: string) {
    const { resume } = await getFirstResume(userId)
    return resume
}

export async function findChatAction(sessionId: string, path: string) {
    const { chat } = await findChat(sessionId);
    revalidatePath(path);
    return chat
}

interface createInitialChatActionData {
    userId: string,
    sessionId: string
}

export async function createInitialChatAction(data: createInitialChatActionData, path: string) {
    const { newChatHistory } = await createInitialChat(data.userId, data.sessionId);
    revalidatePath(path);
    return newChatHistory
}

export async function updateChatAction(
    id: string,
    chatHistory: Message[],
    path: string
) {
    await updateChat(id, chatHistory);
    revalidatePath(path);
}