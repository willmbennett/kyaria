import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface, stripObojects } from "../../../app-helper";
import CoverLetter from "./components/CoverLetter";
import { extractAppObjects } from "../../../_action";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { app } = await loadJob(params.id) as getJobAppInterface

  const { resume, job } = await extractAppObjects(app)
  const jobAppId = app._id.toString()

  const { userResumeStripped, jobStripped } = stripObojects(resume, job)

  return (
    <CoverLetter
      jobAppId={jobAppId}
      currentCoverLetter={app.userCoverLetter || ''}
      userResumeStripped={userResumeStripped}
      jobStripped={jobStripped}
      job={job}
      userResume={resume}
      jobKeyWords={job.skills?.map((skill: any) => skill.skill) || []}
    />
  );
}
