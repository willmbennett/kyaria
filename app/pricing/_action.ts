"use server";

import { createSubscription, updateSubscription } from "../../lib/sub-db";
import { revalidatePath } from "next/cache";

export async function updateSubscriptionAction(
  customer: string,
  data: any,
  path: string
) {
  await updateSubscription(customer, data);
  revalidatePath(path);
}

export async function createSubscriptionAction(data: any, path: string) {
  const { subscription } = await createSubscription(data);
  revalidatePath(path);
  return subscription
}