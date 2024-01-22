"use server";

import {
  createJobApplication,
  deleteJobApp,
  updateJobApp
} from "../../lib/app-db";
import { revalidatePath } from "next/cache";
import { createResume, updateResume } from "../../lib/resume-db";

export async function createJobApplicationAction(data: any, path: string) {
  const { jobApp } = await createJobApplication(data);
  revalidatePath(path);
  return jobApp
}

export async function updateJobAppAction(
  id: string,
  data: any,
  path: string
) {
  const res = await updateJobApp(id, data);
  revalidatePath(path);
  return res;
}

export async function deleteJobAppAction({
  id,
  resumeId,
  path,
}: {
  id: string;
  resumeId: string;
  path: string;
}) {
  await deleteJobApp(id, resumeId);
  revalidatePath(path);
}

export async function createResumeAction(data: any, path: string) {
  //console.log('made it to server action')
  const { resumeId } = await createResume(data);
  //console.log('server action resumeId:', resumeId)
  revalidatePath(path);
  return resumeId
}

export async function updateResumeAction(
  id: string,
  data: any,
  path: string
) {
  await updateResume(id, data);
  revalidatePath(path);
}