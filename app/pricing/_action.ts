"use server";

import { createSubscription, updateSubscription } from "../../lib/sub-db";
import { revalidatePath } from "next/cache";

export async function updateSubscriptionAction(
  customer: string,
  data: any,
  path: string
) {
  //console.log(`updateSubscriptionAction called with customer: ${customer}, data: ${JSON.stringify(data)}, path: ${path}`);

  try {
    //console.log(`Attempting to update subscription for customer: ${customer}`);
    await updateSubscription(customer, data);
    //console.log(`Subscription updated successfully for customer: ${customer}`);

    //console.log(`Attempting to revalidate path: ${path}`);
    revalidatePath(path);
    //console.log(`Path revalidated successfully: ${path}`);

    //console.log(`updateSubscriptionAction completed successfully for customer: ${customer}`);
  } catch (error) {
    //console.error(`Error in updateSubscriptionAction for customer: ${customer}`, error);
    throw error; // Rethrow the error for further handling, if necessary
  }
}


export async function createSubscriptionAction(data: any, path: string) {
  const { subscription } = await createSubscription(data);
  revalidatePath(path);
  return subscription
}