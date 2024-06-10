import { redirect } from "next/navigation";
import JobDescription from "../../../../components/apps/pages/JobDescription";
import { checkSubscription } from "../../../../../lib/hooks/check-subscription";
import { getJobApp } from "../../../../../lib/app-db";
import { useGetOrCreateProfile } from "../../../../../lib/hooks/use-create-profile";
import { ResumeClass } from "../../../../../models/Resume";
import { updateResumeAction } from "../../../../resumebuilder/_action";
import { JobClass } from "../../../../../models/Job";
import { AppClass } from "../../../../../models/App";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface } from "../../../app-helper";
import { updateJobAppAction } from "../../../_action";
import CustomPDFViewer from "../../../../components/resumebuilder/pdfviewer/CustomPDFViewer";
import { ResumeSelection } from "../../../../components/apps/pages/Resume/ResumeSelect";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { userId } = await checkSubscription()
  if (!userId) {
    redirect('/auth/signin')
  }
  const { app } = await loadJob(params.id) as getJobAppInterface

  const resume = app.userResume as ResumeClass
  const resumeId = resume._id.toString()
  const jobId = (app.job as JobClass)._id.toString()
  const jobAppId = app._id.toString()

  return (
    <div className='w-full h-full over relative items-center gap-4 max-w-xl'>
      <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
        Stand out with a Tailored Resume
      </h1>
      {/* @ts-ignore */}
      <ResumeSelection userId={userId} jobAppId={jobAppId} currentResume={resumeId} />
      <CustomPDFViewer
        data={resume}
        useEdit={true}
        userId={userId}
        useSave={true}
        jobId={jobId}
      />
    </div>
  );
}