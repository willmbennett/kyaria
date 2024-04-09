"use server";
import { createResume, deleteResume, updateResume } from "../../lib/resume-db";
import { createResumeScan } from "../../lib/resumescan-db";
import { revalidatePath } from "next/cache";
import { getModelForClass } from "@typegoose/typegoose";
import { ResumeClass } from "../../models/Resume";
import { del } from '@vercel/blob';

export async function createResumeScanAction(data: any, path: string) {
  //console.log('Resume Scan Action start')
  const { resumeScanId } = await createResumeScan(data);
  //console.log('Resume Scan ACtion resumeScanId: ', resumeScanId)
  revalidatePath(path);
  //console.log('Post revalidation page: ')
  return resumeScanId
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
  fileUrl: string;
}) {
  const { error } = await deleteResume(id);
  
  await del(fileUrl);

  revalidatePath(path);
  return { error }
}