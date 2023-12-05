import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Await from "../../jobs/await";
import { ResumeScanDataClass } from "../../../models/ResumeScan";
import ResumeBuilder from "../../components/resume/ResumeBuilder";
import { redirect } from "next/navigation";
import { transformParsedResume } from "../resumetest-helper";
import { getResume } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";

export default async function ResumeScanPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const promise = getResume(params.id)

    if (!session) {
        redirect('/');
    }

    return (
        <div className="w-screen md:flex-row justify-center">
            <div className="flex flex-col md:flex-row py-2 min-h-screen lg:px-4 lg:mt-6">
                {/* @ts-expect-error Server Component */}
                <Await promise={promise}>
                    {({ resume, resumeScan }: { resume: ResumeClass, resumeScan: ResumeScanDataClass }) =>
                        <ResumeBuilder
                            data={resume}
                            toggleEdit={undefined}
                            editResume={true}
                            resumeScanId={resumeScan._id.toString()}
                            userId={session.user?.id}
                        />}
                </Await>
            </div>
        </div>
    );
}
