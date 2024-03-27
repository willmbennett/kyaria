"use server";
import { revalidatePath } from "next/cache";
import { createInitialChat, deleteChat, findChat, getChat, updateChat } from "../../lib/chat-db";
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

export async function getChatAction(id: string, path: string) {
    const { chat } = await getChat(id);
    revalidatePath(path);
    return chat
}

export async function createInitialChatAction(userId: string, path: string) {
    const { chatId } = await createInitialChat(userId);
    revalidatePath(path);
    return chatId
}

export async function updateChatAction(
    id: string,
    chatHistory: Message[],
    path: string
) {
    await updateChat(id, chatHistory);
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