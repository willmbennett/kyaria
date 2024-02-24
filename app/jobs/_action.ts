"use server";

import { getJobs, createJob, updateJob, deleteJob, findJobByLink } from "../../lib/job-db";
import { revalidatePath } from "next/cache";
import { JobClass } from "../../models/Job";

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

export async function findJobByLinkAction(link: string, path: string) {
  const { jobId } = await findJobByLink(link)
  revalidatePath(path);
  return jobId
}