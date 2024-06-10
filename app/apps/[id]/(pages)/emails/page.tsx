import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, extractAppObjects, getJobAppInterface, stripObojects } from "../../../app-helper";
import Emails from "../../../../components/apps/pages/Emails";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { app } = await loadJob(params.id) as getJobAppInterface

  const { resume, job } = extractAppObjects(app)
  const jobAppId = app._id.toString()

  const { userResumeStripped, jobStripped } = stripObojects(resume, job)

  return (
    <Emails
      jobAppId={jobAppId}
      emails={app.emails}
      jobStripped={jobStripped}
      jobKeyWords={job.skills?.map((skill: any) => skill.skill) || []}
      userResumeStripped={userResumeStripped}
    />
  );
}
