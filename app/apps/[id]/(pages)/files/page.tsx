import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface } from "../../../app-helper";
import Files from "./components/Files";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { app } = await loadJob(params.id) as getJobAppInterface
  const jobAppId = app._id.toString()

  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
        Upload any files
      </h1>
      <Files files={app.files} jobAppId={jobAppId} />
    </div>
  );
}
