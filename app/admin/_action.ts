"use server";

import { createPerson, updatePerson } from "../../lib/person-db";
import { revalidatePath } from "next/cache";

export async function createPersonAction(data: any, path: string) {
  const { personId } = await createPerson(data);
  revalidatePath(path);
  return personId
}
export async function updatePersonAction(
  id: string,
  data: any,
  path: string
) {
  await updatePerson(id, data);
  revalidatePath(path);
}