import ResumeBuilder from "../../components/resumebuilder/ResumeBuilder";
import { redirect } from "next/navigation";
import { getResume } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { cache } from "react";

type resumeType = {
    resume: ResumeClass
}

const loadResume = cache(async (resumeId: string) => {
    console.log('made it to [loadResume]')
    return await getResume(resumeId)
})

export default async function ResumeScanPage({ params }: { params: { id: string } }) {
    const { userId } = await checkSubscription()
    const { resume } = await loadResume(params.id) as resumeType

    if (!userId) {
        redirect('/');
    }

    return (
        <div className="flex justify-center">
            <ResumeBuilder
                data={resume}
                toggleEdit={undefined}
                userId={userId}
                resumeId={params.id}
            />
        </div>
    );
}
