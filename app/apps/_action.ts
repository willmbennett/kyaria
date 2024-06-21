"use server";

import { cache } from "react";
import {
    createApp,
    createJobApplication,
    deleteJobApp,
    getJobApp,
    updateJobApp
} from "../../lib/app-db";
import { revalidatePath } from "next/cache";
import { useGetOrCreateProfile } from "../../lib/hooks/use-create-profile";
import { getDefaultResumeId, getResume } from "../../lib/resume-db";
import { AppClass } from "../../models/App";
import { JobClass } from "../../models/Job";
import { ProfileClass } from "../../models/Profile";
import { ResumeClass } from "../../models/Resume";
import { redirect } from "next/navigation";

export async function createJobApplicationAction(data: any, path: string) {
    const { jobApp } = await createJobApplication(data);
    revalidatePath(path);
    return jobApp
}


export async function createAppAction(data: any, path: string) {
    const { appId } = await createApp(data);
    revalidatePath(path);
    return appId
}

export async function updateJobAppAction(
    id: string,
    data: any,
    path?: string
) {
    const res = await updateJobApp(id, data);
    if (path) {
        revalidatePath(path);
    }
    return res;
}

export async function deleteJobAppAction({
    id,
    path,
}: {
    id: string;
    path: string;
}) {
    await deleteJobApp(id);
    revalidatePath(path);
}

export const loadJob = cache((id: string) => {
    return getJobApp(id)
})

export const extractAppObjects = async (app: AppClass) => {
    "use server"
    const jobAppId = app._id.toString()

    let resume = app.userResume as ResumeClass
    let resumeId

    // Handle the case the user delete's their resume
    if (!resume) {
        // Get their default resume
        const { defaultResumeId } = await getDefaultResumeId(app.userId)

        // If that resume exists, set it as the new resume
        if (defaultResumeId) {
            resumeId = defaultResumeId
            const { resume: FoundResume } = await getResume(defaultResumeId)
            if (FoundResume) resume = FoundResume
            else redirect('/board')
            // else redirect to their board because they don't have any resumes, as of now this is the best way of handling it
        }
    }
    else resumeId = resume._id.toString()

    const job = (app.job as JobClass)
    const jobId = (app.job as JobClass)._id.toString()

    let profile = (app.profile as ProfileClass)
    let profileId: string

    // If the user doesn't have a profile yet because they just joined
    if (!profile) {

        // use the server action that finds or creates a profile for them
        const { profile: FoundProfile } = await useGetOrCreateProfile(app.userId);

        if (FoundProfile) {
            profileId = FoundProfile._id.toString()
            profile = FoundProfile
            updateJobAppAction(jobAppId, { profile: profileId })
        }
        else {
            // If for some reason it's still failing fail gracefully and sent them  to their board
            profileId = ''
            redirect('/board')
        }
    } else {
        profileId = profile._id.toString()
    }

    const chatId = app.chatId?.toString()
    return { jobAppId, resumeId, resume, jobId, job, profileId, profile, chatId }
}