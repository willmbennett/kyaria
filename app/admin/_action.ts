"use server";

import { checkEmployerDiffbotId, createEmployer, getEmployer } from "../../lib/employer-db";
import { checkInstitutionDiffbotId, createInstitution } from "../../lib/institution-db";
import { checkDiffbotId, createPerson, getPeople, updatePerson } from "../../lib/person-db";
import { revalidatePath } from "next/cache";
import { InstitutionClass } from "../../models/Institution";

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

export async function checkDiffbotIdAction(
  diffbotId: string,
  path: string
) {
  const { existingPerson } = await checkDiffbotId(diffbotId);
  revalidatePath(path);
  return existingPerson
}

export async function getPeopleAction(
  filter: { limit: number, skip: number },
  path: string
) {
  const { people } = await getPeople(filter);
  revalidatePath(path);
  return people
}

export async function getEmployerAction(
  id: string,
  path: string
) {
  const { employer } = await getEmployer(id);
  revalidatePath(path);
  return employer
}

export async function createEmployerAction(data: any, path: string) {
  const { employerId } = await createEmployer(data);
  revalidatePath(path);
  return employerId
}

export async function checkEmployerDiffbotIdAction(
  targetDiffbotId: string,
  path: string
) {
  const { existingEmployer } = await checkEmployerDiffbotId(targetDiffbotId);
  revalidatePath(path);
  return existingEmployer
}

export async function createInstitutionAction(data: Partial<InstitutionClass>, path: string) {
  const { institutionId } = await createInstitution(data);
  revalidatePath(path);
  return institutionId
}

export async function checkInstitutionDiffbotIdAction(
  targetDiffbotId: string,
  path: string
) {
  const { existingInstitution } = await checkInstitutionDiffbotId(targetDiffbotId);
  revalidatePath(path);
  return existingInstitution
}