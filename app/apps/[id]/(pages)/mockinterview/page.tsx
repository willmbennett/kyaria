import { checkSubscription } from "../../../../../lib/hooks/check-subscription";
import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, extractAppObjects, getJobAppInterface, stripObojects } from "../../../app-helper";
import Eve from "../../../../components/apps/pages/Eve";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { userId, activeSubscription, admin } = await checkSubscription(true)
  const { app } = await loadJob(params.id) as getJobAppInterface
  const { resume, job, jobId, jobAppId, chatId } = extractAppObjects(app)
  const { userResumeStripped, jobStripped } = stripObojects(resume, job)

  return (
    <>{/* @ts-ignore */}
      <Eve
        jobAppId={jobAppId}
        jobId={jobId}
        jobStripped={jobStripped}
        userId={userId}
        chatId={chatId}
        activeSubscription={activeSubscription}
        admin={admin} />
    </>
  );
}