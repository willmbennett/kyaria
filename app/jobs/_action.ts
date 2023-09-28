"use server";

import { getJobs, createJob, updateJob, deleteJob } from "../../lib/job-db";
import { revalidatePath } from "next/cache";

export async function getJobsAction(data: any, path: string) {
  const res = await getJobs(data);
  revalidatePath(path);
  return res
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

export async function createJobAction(data: any, path: string) {
  const { jobId } = await createJob(data);
  revalidatePath(path);
  return jobId
}