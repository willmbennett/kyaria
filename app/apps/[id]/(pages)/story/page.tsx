import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface, stripObojects } from "../../../app-helper";
import Story from "../../../../components/apps/pages/Story";
import { extractAppObjects } from "../../../_action";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { app } = await loadJob(params.id) as getJobAppInterface
  const { resume, job, jobAppId, profileId, profile } = await extractAppObjects(app)
  const { userResumeStripped, jobStripped } = stripObojects(resume, job)

  return (
    <Story
      jobAppId={jobAppId}
      currentStory={app.userStory || ''}
      userResumeStripped={userResumeStripped}
      job={jobStripped}
      profileStory={profile.story || ''}
      profileId={profileId}
      userCanEdit={true}
    />
  );
}