"use server";
import { Message } from "ai";
import { revalidatePath } from "next/cache";
import { addMockInterviewMessage, addMockInterviewRecording, createMockInterview, deleteMockInterview, getMockInterview, updateMockInterview } from "../../../lib/mockinterview-db";
import { MockInterviewClass, Recording } from "../../../models/MockInterview";
import { del, put } from "@vercel/blob";
import { ActionItemType } from "../../board/job-helper";

const logging = false

interface CreateMockInterviewActionProps {
    userId: string;
    chatId: string;
    name: string;
    path: string;
}

export async function createMockInterviewAction({
    userId,
    chatId,
    name,
    path,
}: CreateMockInterviewActionProps) {
    const { newMockInterviewId } = await createMockInterview(userId, chatId, name);
    revalidatePath(path);
    return newMockInterviewId
}

export async function updateMockInterviewAction(
    id: string,
    data: Partial<MockInterviewClass>,
    path: string
) {
    await updateMockInterview(id, data);
    revalidatePath(path);
}

export async function addMockInterviewMessageAction(
    id: string,
    newMessages: Message,
    path: string
) {
    await addMockInterviewMessage(id, newMessages);
    revalidatePath(path);
}

export async function addMockInterviewRecordingActions(
    id: string,
    newRecording: Recording,
    path: string
) {
    await addMockInterviewRecording(id, newRecording);
    revalidatePath(path);
}

export async function deleteMockInterviewAction({
    id,
    path,
}: {
    id: string;
    path: string;
}) {
    const { MockInterview } = await getMockInterview(id)
    const recordings = MockInterview?.recordings
    if (recordings && recordings.length > 0) {
        await Promise.all(recordings.map(rec => rec.vercelLink && del(rec.vercelLink)))
    }
    const { error } = await deleteMockInterview(id);
    revalidatePath(path);
    return { error }
}

export const handleMockInterviewDeletion: ActionItemType = async (chatId: string, path: string) => {
    "use server"
    const { error } = await deleteMockInterviewAction({ id: chatId, path })
    if (error) {
        return { error }
    } else {
        const url = "/mockinterview"
        return { url }
    }
}

export async function uploadFile(formData: FormData) {
    'use server';
    const recordingFile = formData.get('recording') as File;
    const blob = await put(recordingFile.name, recordingFile, {
        access: 'public',
    });
    revalidatePath('/');
    return blob;
}