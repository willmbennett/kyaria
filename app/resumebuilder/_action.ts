"use server";
import { createResume, deleteResume, updateResume } from "../../lib/resume-db";
import { createResumeScan } from "../../lib/resumescan-db";
import { revalidatePath } from "next/cache";

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
  path: string
) {
  await updateResume(id, data);
  revalidatePath(path);
}

export async function deleteResumeAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  const { error } = await deleteResume(id);
  revalidatePath(path);
  return { error }
}