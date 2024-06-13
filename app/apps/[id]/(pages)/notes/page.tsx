import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface } from "../../../app-helper";
import Notes from "./components/Notes";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { app } = await loadJob(params.id) as getJobAppInterface
  const jobAppId = app._id.toString()

  return (
    <Notes
      jobAppId={jobAppId}
      content={app.notes}
    />
  );
}
