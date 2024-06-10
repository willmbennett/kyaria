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
import { JobStateType } from "../../board/job-helper";
import { Button } from "../../components/Button";
import { cache } from "react";
import { useGetOrCreateProfile } from "../../../lib/hooks/use-create-profile";
import { updateJobAppAction } from "../_action";
import { updateResumeAction } from "../../resumebuilder/_action";
import { ResumeClass } from "../../../models/Resume";

interface getJobAppInterface {
  app: AppClass
}

interface JobAppPageProps {
  params: { id: string }
  searchParams: { section: string, progress: string }
}

export default async function JobAppPage({ params, searchParams }: JobAppPageProps) {
  const { activeSubscription, userId, admin } = await checkSubscription()
  if (!userId) {
    redirect('/auth/signin')
  }

  let app

  const { app: foundApp } = await getJobApp(params.id) as getJobAppInterface
  app = foundApp
  if (!app) return <p>Job app not found</p>
  const appId = app._id.toString()

  const profileId = app.profile
  let onboardingProfileId

  if (!profileId) {
    const { profile } = await useGetOrCreateProfile(userId);
    onboardingProfileId = profile?._id.toString()
  }

  if (app.userId == 'n/a' && onboardingProfileId) {
    const resumeId = (app.userResume as ResumeClass)._id.toString()
    if (resumeId) {
      updateResumeAction(resumeId, { userId })
    }
    await updateJobAppAction(app._id.toString(), { userId, profile: onboardingProfileId }, `/apps/${appId}`) as { jobApp: AppClass }
    const { app: foundApp } = await getJobApp(params.id) as getJobAppInterface
    app = foundApp
  }

  const job = app.job as JobClass
  const appState = app.state as JobStateType

  const { currentSection, filteredPages, activeProgressSection } = useAppNavigation(appState, searchParams, job.companyDiffbotUri);

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