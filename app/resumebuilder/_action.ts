"use server";
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