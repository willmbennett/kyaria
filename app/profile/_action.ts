"use server";

import { createProfile, deleteProfile, getProfile, updateProfile } from "../../lib/profile-db";
import { revalidatePath } from "next/cache";

export async function createProfileAction(data: any, path: string) {
  await createProfile(data);
  revalidatePath(path);
}

export async function updateProfileAction(
  id: string,
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
  id: string;
  path: string;
}) {
  await deleteProfile(id);
  revalidatePath(path);
}

export async function getProfileAction(
  userId: string
) {
  const profile = await getProfile(userId);
  return profile
}