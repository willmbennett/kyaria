"use server";

import { createResumeScan } from "../../lib/resumescan-db";
import { revalidatePath } from "next/cache";

export async function createResumeScanAction(data: any, path: string) {
  const { resumeScanId } = await createResumeScan(data);
  revalidatePath(path);
  return resumeScanId
}