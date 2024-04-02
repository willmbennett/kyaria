import { ResumeBuilder } from "../../components/resumebuilder/ResumeBuilder";
import { redirect } from "next/navigation";
import { getResume } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { cache } from "react";
import { getJob } from "../../../lib/job-db";
import { JobClass } from "../../../models/Job";

type resumeType = {
    resume: ResumeClass
}

type jobType = {
    job: JobClass
}

const loadResume = cache(async (resumeId: string) => {
    //console.log('made it to [loadResume]')
    return await getResume(resumeId)
})

interface ResumeScanPageProps {
    params: { id: string },
    searchParams: { job: string }
}

export default async function ResumeScanPage({ params, searchParams }: ResumeScanPageProps) {
    const { userId } = await checkSubscription()
    const { resume } = await loadResume(params.id) as resumeType
    const { job } = await getJob(searchParams.job) as jobType

    if (!userId) {
        redirect('/');
    }

    return (
        <div className="flex justify-center">
            <ResumeBuilder
                resume={resume}
                userId={userId}
                job={job}
            />
        </div>
    );
}
