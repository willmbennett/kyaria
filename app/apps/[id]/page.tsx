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
    <div className="flex flex-col w-full lg:w-5/6 xl:w-4/5 2xl:w-3/4 gap-4 p-4">
      <ProgressBar
        activeProgressSection={activeProgressSection}
      />
      <div className="flex flex-col w-full items-stretch justify-center gap-8 lg:flex-row lg:items-start lg:gap-6">
        <div className="w-full lg:w-1/4 xl:w-1/5">
          <JobMenu
            boardId={app.boardId?.toString()}
            currentSection={currentSection}
            filteredPages={filteredPages}
            activeProgressSection={activeProgressSection}
          />
        </div>
        <div className="flex w-full lg:w-1/2 xl:w-3/5 flex-col justify-center items-center">
          {/* @ts-ignore */}
          <JobApplication
            jobApp={app}
            activeSubscription={activeSubscription}
            currentUserId={userId}
            currentSection={currentSection}
            admin={admin}
          />
        </div>
        <div className="w-full lg:w-1/4 xl:w-1/5">
          <FeedbackAside />
        </div>
      </div>
    </div>
  );
}