import { redirect } from "next/navigation";
import JobDescription from "../../../../components/apps/pages/JobDescription";
import { checkSubscription } from "../../../../../lib/hooks/check-subscription";
import { getJobApp } from "../../../../../lib/app-db";
import { useGetOrCreateProfile } from "../../../../../lib/hooks/use-create-profile";
import { ResumeClass } from "../../../../../models/Resume";
import { updateResumeAction } from "../../../../resumebuilder/_action";
import { JobClass } from "../../../../../models/Job";
import { AppClass } from "../../../../../models/App";
import { updateJobAppAction } from "../../../_action";

interface getJobAppInterface {
  app: AppClass
}

interface JobAppPageProps {
  params: { id: string }
  searchParams: { section: string, progress: string }
}

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { userId } = await checkSubscription()
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

  return (
    <JobDescription
      jobData={job}
      topWords={job.skills?.map((skill: any) => skill.skill) || []}
      companyDiffbotId={job.companyDiffbotUri}
      activeSubscription={true}
      currentUserId={userId} />
  );
}