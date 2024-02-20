import { redirect } from "next/navigation";
import { getJobApp } from "../../../lib/app-db";
import Await from "../../jobs/await";
import { JobApplication } from "../../components/apps/JobApplication";
import { AppClass } from "../../../models/App";
import { checkSubscription } from "../../../lib/hooks/check-subscription";

interface getJobAppInterface {
  app: AppClass
}

export default async function JobAppPage({ params }: { params: { id: string } }) {
  const { app } = await getJobApp(params.id) as getJobAppInterface
  const { activeSubscription, userId } = await checkSubscription()

  if (!userId) {
    redirect('/auth/signin')
  }

  if (!app) return <p>Job app not found</p>

  return (
    <div className="flex items-center justify-center">
      <JobApplication jobApp={app} activeSubscription={activeSubscription} currentUserId={userId} />
    </div>
  );
}