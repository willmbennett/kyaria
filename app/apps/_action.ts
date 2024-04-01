"use server";

import {
    createApp,
    createJobApplication,
    deleteJobApp,
    updateJobApp
} from "../../lib/app-db";
import { revalidatePath } from "next/cache";

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