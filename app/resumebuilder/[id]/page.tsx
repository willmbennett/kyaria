import ResumeBuilder from "../../components/resumebuilder/ResumeBuilder";
import { redirect } from "next/navigation";
import { getResume } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";

type resumeType = {
    resume: ResumeClass
}

export default async function ResumeScanPage({ params }: { params: { id: string } }) {
    const { activeSubscription, userId } = await checkSubscription()
    const { resume } = await getResume(params.id) as resumeType

    if (!userId) {
        redirect('/');
    }

    if (!userId) {
        redirect('/resumebuilder');
    }

    return (
        <div className="flex justify-center pb-14">
            <ResumeBuilder
                data={resume}
                toggleEdit={undefined}
                userId={userId}
                activeSubscription={activeSubscription}
                resumeId={params.id}
            />
        </div>
    );
}
