"use server"

import { createProfile, deleteProfile, getProfile, updateProfile } from "../../lib/profile-db";
import { revalidatePath } from "next/cache";

export async function createProfileAction(data: any, path: string) {
  const res = await createProfile(data);
  revalidatePath(path);
  return res
}

export async function updateProfileAction(
  id: any,
  data: any,
  path: string
) {
  await updateProfile(id, data);
  revalidatePath(path);
}

export async function deleteProfileAction({
  id,
  path,
}: {
  id: any;
  path: string;
}) {
  const res = await deleteProfile(id);
  console.log("res", res)
  revalidatePath(path);
  return res
}

export async function getProfileAction(
  userId: string
) {
  const profile = await getProfile(userId);
  return profile
}