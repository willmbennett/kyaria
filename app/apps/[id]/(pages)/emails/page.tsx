import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface, stripObojects } from "../../../app-helper";
import Emails from "./components/Emails";
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
    <div className='max-w-3xl w-full'>
      <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
        Let's write emails
      </h1>
      <Emails
        jobAppId={jobAppId}
        emails={app.emails}
        jobStripped={jobStripped}
        jobKeyWords={job.skills?.map((skill: any) => skill.skill) || []}
        userResumeStripped={userResumeStripped}
      />
    </div>
  );
}
