"use server";

import { createPerson } from "../../lib/person-db";
import { revalidatePath } from "next/cache";

export async function createPersonAction(data: any, path: string) {
  const { personId } = await createPerson(data);
  revalidatePath(path);
  return personId
}