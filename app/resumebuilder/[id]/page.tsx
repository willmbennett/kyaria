import { ResumeBuilder } from "../../components/resumebuilder/ResumeBuilder";
import { redirect } from "next/navigation";
import { getResume } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { cache } from "react";
import { getJob } from "../../../lib/job-db";
import { JobClass } from "../../../models/Job";
import { getJobApp } from "../../../lib/app-db";
import { AppClass } from "../../../models/App";

type resumeType = {
    resume: ResumeClass
}

const loadResume = cache(async (resumeId: string) => {
    //console.log('made it to [loadResume]')
    return await getResume(resumeId)
})

interface ResumeScanPageProps {
    params: { id: string }
}

export default async function ResumeScanPage({ params }: ResumeScanPageProps) {
    const { userId } = await checkSubscription(true)
    const { resume } = await loadResume(params.id) as resumeType

    if (!resume) redirect('/resumebuilder')
    let job: JobClass | undefined
    if (resume.appId) {
        const { app } = await getJobApp(resume.appId)
        job = app?.job as JobClass
    }

    return (
        <ResumeBuilder
            resume={resume}
            userId={userId}
            job={job}
        />
    );
}
