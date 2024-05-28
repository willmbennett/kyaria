import { redirect } from "next/navigation";
import { getJobApp } from "../../../lib/app-db";
import { JobApplication } from "../../components/apps/JobApplication";
import { AppClass } from "../../../models/App";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { JobClass } from "../../../models/Job";
import JobMenu from "../../components/apps/JobMenu";
import ProgressBar from "../../components/apps/ui/ProgressBar";
import FeedbackAside from "../../components/landingpage/FeedbackAside";
import useAppNavigation from "../../../lib/hooks/use-app-section";
import { jobStateType } from "../../board/job-helper";
import { Button } from "../../components/Button";
import { cache } from "react";

interface getJobAppInterface {
  app: AppClass
}

interface JobAppPageProps {
  params: { id: string }
  searchParams: { section: string, progress: string }
}

const loadBoards = cache(async (id: string) => {
  return await getJobApp(id)
})

export default async function JobAppPage({ params, searchParams }: JobAppPageProps) {
  const { activeSubscription, userId, admin } = await checkSubscription()
  if (!userId) {
    redirect('/auth/signin')
  }

  const { app } = await loadBoards(params.id) as getJobAppInterface
  const job = app.job as JobClass
  const appState = app.state as jobStateType

  const { currentSection, filteredPages, activeProgressSection } = useAppNavigation(appState, searchParams, job.companyDiffbotUri);

  if (!app) return <p>Job app not found</p>

  return (
    <div className="flex flex-col w-full md:h-full sm:p-1 md:p-2 lg:p-3 xl:p-4">
      <ProgressBar
        activeProgressSection={activeProgressSection}
      />
      <div className="flex flex-col w-full md:h-full justify-center md:flex-row md:justify-start md:gap-4">
        <JobMenu
          boardId={app.boardId?.toString()}
          currentSection={currentSection}
          filteredPages={filteredPages}
          activeProgressSection={activeProgressSection}
        />
        {/* @ts-ignore */}
        <JobApplication
          jobApp={app}
          activeSubscription={activeSubscription}
          currentUserId={userId}
          currentSection={currentSection}
          admin={admin}
        />
      </div>
    </div>
  );
}