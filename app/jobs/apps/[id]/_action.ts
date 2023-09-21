"use server";

import {
  createJobApp,
  deleteJobApp,
  updateJobApp
} from "../../../../lib/jobapp-db";
import { revalidatePath } from "next/cache";
import { createResume, updateResume } from "../../../../lib/resume-db";

export async function createJobAppAction(data: any, path: string) {
  await createJobApp(data);
  revalidatePath(path);
}

export async function updateJobAppAction(
  id: string,
  data: any,
  path: string
) {
  await updateJobApp(id, data);
  revalidatePath(path);
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
  const newResume = await createResume(data);
  revalidatePath(path);
  return (newResume)
}

export async function updateResumeAction(
  id: string,
  data: any,
  path: string
) {
  await updateResume(id, data);
  revalidatePath(path);
}