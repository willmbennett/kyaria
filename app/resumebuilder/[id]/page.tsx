import Await from "../../jobs/await";
import ResumeBuilder from "../../components/resume/ResumeBuilder";
import { redirect } from "next/navigation";
import { getResume } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { Button } from "../../components/Button";

export default async function ResumeScanPage({ params }: { params: { id: string } }) {
    const { activeSubscription, userId } = await checkSubscription()
    const promise = getResume(params.id)

    if (!userId) {
        redirect('/');
    }

    return (
        <div className="flex flex-col justify-center">
            {/* @ts-expect-error Server Component */}
            <Await promise={promise}>
                {({ resume }: { resume: ResumeClass }) => (
                    <>
                        {
                            resume ?
                                <ResumeBuilder
                                    data={resume}
                                    toggleEdit={undefined}
                                    userId={userId}
                                    activeSubscription={activeSubscription}
                                    resumeId={params.id}
                                />
                                : <p>Resume Not Found</p>
                        }
                    </>
                )}
            </Await>
        </div>
    );
}
