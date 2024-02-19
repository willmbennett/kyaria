import { redirect } from "next/navigation";
import { getJobApp } from "../../../lib/app-db";
import Await from "../../jobs/await";
import { JobApplication } from "../../components/apps/JobApplication";
import { AppClass } from "../../../models/App";
import { checkSubscription } from "../../../lib/hooks/check-subscription";

interface getJobAppInterface {
  jobApp: AppClass
}

export default async function JobAppPage({ params }: { params: { id: string } }) {
  const { jobApp } = await getJobApp(params.id) as getJobAppInterface
  const { activeSubscription, userId } = await checkSubscription()

  if (!userId) {
    redirect('/auth/signin')
  }

  return (
    <>
      {
        jobApp ?
          <JobApplication jobApp={jobApp} activeSubscription={activeSubscription} currentUserId={userId} />
          :
          <p>Job app not found</p>
      }
    </>
  );
}