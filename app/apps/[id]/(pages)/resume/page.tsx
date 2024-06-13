import { checkSubscription } from "../../../../../lib/hooks/check-subscription";
import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface } from "../../../app-helper";
import CustomPDFViewer from "../../../../components/resumebuilder/pdfviewer/CustomPDFViewer";
import { ResumeSelection } from "../../../../components/apps/pages/Resume/ResumeSelect";
import { extractAppObjects } from "../../../_action";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { userId } = await checkSubscription(true)
  const { app } = await loadJob(params.id) as getJobAppInterface
  const { resume, resumeId, jobId, jobAppId } = await extractAppObjects(app)

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