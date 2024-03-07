"use server";
import { getFirstResume } from "../../lib/resume-db";

export async function getResumeAction(userId: string) {
    const { resume } = await getFirstResume(userId)
    return resume
}