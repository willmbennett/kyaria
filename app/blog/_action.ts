"use server"

import { createPost } from "../../lib/post-db";
import { revalidatePath } from "next/cache";

export async function createPostAction(data: any, path: string) {
  const res = await createPost(data);
  revalidatePath(path);
  return res
}