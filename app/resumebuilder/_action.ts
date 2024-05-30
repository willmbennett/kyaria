"use server";
import { createResume, deleteResume, getDefaultResumeId, getResume, getResumes, updateResume } from "../../lib/resume-db";
import { revalidatePath } from "next/cache";
import { del } from '@vercel/blob';

export async function getResumeAction(resumeId: string) {
  const { resume } = await getResume(resumeId)
  return resume
}

export async function getResumesAction(userId: string) {
  const { resumes } = await getResumes(userId)
  return resumes
}


export async function getDefaultResumeIdAction(userId: string) {
  const { defaultResumeId } = await getDefaultResumeId(userId)
  return defaultResumeId
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
  path?: string
) {
  const { error } = await updateResume(id, data);
  if (path) {
    revalidatePath(path);
  }
  return { error }
}

export async function deleteResumeAction({
  id,
  path,
  fileUrl
}: {
  id: string;
  path: string;
  fileUrl?: string;
}) {
  const { error } = await deleteResume(id);

  if (fileUrl) {
    await del(fileUrl);
  }

  revalidatePath(path);
  return { error }
}