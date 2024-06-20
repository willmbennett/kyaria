"server only"

import { redirect } from "next/navigation"
import { getJobApp, getUserJobApps } from "../../lib/app-db"
import { updateJobAppAction } from "../apps/_action"
import { ActionItemType } from "../board/job-helper"
import { deleteChatAction, handleChatCreation } from "../eve/_action"
import { cache } from "react"
import { AppClass } from "../../models/Exports"
import { getChat } from "../../lib/chat-db"

export const loadApps = cache(async (filter: { userId: string }) => {
    "use server"
    return await getUserJobApps(filter)
})

export const createMockInterview = async () => {
    "use server"
    return { url: "/mockinterviews" }
}

export const handleMockInterviewDeletion: ActionItemType = async (appId: string, path: string) => {
    "use server"
    const { app } = await getJobApp(appId)
    const chatId = app?.chatId?.toString()
    console.log('About to delete chat for app: ', appId, 'with chatId: ', chatId)
    if (chatId) {
        const { error } = await deleteChatAction({ id: chatId, path })
        if (error) {
            return { error }
        } else {
            updateJobAppAction(appId, { chatId: null })
            const url = "/mockinterviews"
            return { url }
        }
    }
    return { error: 'No Chat found' }
}

export const setupMockInterview = async (userId: string, jobAppId: string, interviewdata: any) => {
    "use server"
    const { chatId } = await handleChatCreation({ userId, interviewdata });
    if (!chatId) {
        throw new Error('There was a problem creating a new chat');
    }
    const stateUpdate = { chatId };
    await updateJobAppAction(jobAppId, stateUpdate, '/mockinterviews/' + jobAppId);

    const { chat: newChat } = await getChat(chatId);
    if (!newChat) {
        throw new Error('There was a problem fetching the newly created chat');
    }

    return { chatId, chat: newChat };
}