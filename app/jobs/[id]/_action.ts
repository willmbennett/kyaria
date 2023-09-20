"use server";

import { createJob, deleteJob, getUserJobs, updateJob } from "../../../lib/job-db";
import { revalidatePath } from "next/cache";

export async function createJobAction(data: any, path: string) {
  await createJob(data);
  revalidatePath(path);
}

export async function updateJobAction(
  id: string,
  data: any,
  path: string
) {
  await updateJob(id, data);
  revalidatePath(path);
}

export async function deleteJobAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await deleteJob(id);
  revalidatePath(path);
}

export async function getJobsActions(
  userId: string,
) {
  const res = await getUserJobs({userId: userId});
  return(res)
}