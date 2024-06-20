"use server";
import { Message } from "ai";
import { revalidatePath } from "next/cache";
import { addMockInterviewMessage, addMockInterviewRecording, createMockInterview, deleteMockInterview, getMockInterview, updateMockInterview } from "../../../../lib/mockinterview-db";
import { InterviewScore, MockInterviewClass, Recording } from "../../../../models/MockInterview";
import { del, put } from "@vercel/blob";
import { ActionItemType } from "../../../board/job-helper";
import { openai } from "../../../openai";
import { ChatCompletionMessageParam } from "openai/resources";

const logging = false

interface CreateMockInterviewActionProps {
    data: Partial<MockInterviewClass>
    path: string;
}

export async function createMockInterviewAction({
    data,
    path,
}: CreateMockInterviewActionProps) {
    const { newMockInterviewId } = await createMockInterview(data);
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
        const url = "/mockinterviews"
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

export async function getFeedback(id: string, questions: string[], messages: Message[], path: string) {
    'use server';

    const chatMessages: ChatCompletionMessageParam[] = [
        {
            role: 'system', content:
                `You are an expert at grading job interviews. Interviews are graded using the following scoring rubric:
0 No answer given or answer completely irrelevant. No examples given.
1 Very poor answer. A few points mentioned but most issues missing. No examples/irrelevant examples given.
2 Poor answer. Some points covered but not all relevant. Few examples given.
3 Below average answer. Some points covered with some relevant information. Some examples given.
4 Average answer. Covers some points with relevant information. Examples given but could be improved.
5 Good answer. Relevant information given. Most points covered. Good examples.
6 Very good answer. All points addressed. All points relevant. Good examples.
7 Excellent answer. Comprehensive details and relevant points. All points addressed. Excellent examples.
8 Exceptional answer. Thorough details and comprehensive points. All points addressed. Outstanding examples.
9 Outstanding answer. Extensive details and exceptional points. All points addressed. Exemplary examples.
10 Extraordinary answer. Exhaustive details and unparalleled points. All points addressed. Exceptional examples.
        
        The data will be stored in this format:
        class InterviewScore {
            @prop()
            public _id?: string;
        
            @prop()
            public question: string;
        
            @prop()
            public explanation: string;
        
            @prop()
            public score: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        }

        Please also return a paragraph with overall feedback, it will be stored separately in an object:

        @prop()
        public feedback: string;
        
        Please return the scores in JSON format {feedback: string, interviewScores: InterviewScore[] }.` },
        { role: 'user', content: `I just did a mock interview where I was asked these questions: ${JSON.stringify(questions)}. Please grade my intervew, here is the full text: ${JSON.stringify(messages)}` }
    ]

    const completion = await openai.chat.completions.create({
        messages: chatMessages,
        model: "gpt-4o",
        response_format: { type: "json_object" }
    });

    // Process the response from OpenAI and format it as needed
    const optimizedData = completion.choices[0].message.content;

    if (optimizedData) {
        const data = JSON.parse(optimizedData);
        if (data) {
            updateMockInterviewAction(id, data, path)
        }
    } else {
        console.log('No interviewScores provided')
    }
}