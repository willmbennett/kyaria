"use server";

import { employerFuzzyMatching } from "../../lib/employer-db";
import { institutionFuzzyMatching } from "../../lib/institution-db";
import { revalidatePath } from "next/cache";

type result = {
  targetDiffbotId: string;
  name: string
}

type FuzzyMatchingReturn = {
  results?: result[],
  error?: Error
}

export async function institutionFuzzyMatchingAction(
  query: string,
  path: string
) {
  const { results, error } = await institutionFuzzyMatching(query) as FuzzyMatchingReturn
  revalidatePath(path);
  return { results, error }
}

export async function employerFuzzyMatchingAction(
  query: string,
  path: string
) {
  const { results, error } = await employerFuzzyMatching(query) as FuzzyMatchingReturn
  revalidatePath(path);
  return { results, error }
}