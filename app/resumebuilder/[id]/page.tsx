import ResumeTest from "../../components/resumebuilder/ResumeTest";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { getResumeScan } from "../../../lib/resumescan-db";
import Await from "../../jobs/await";
import { ResumeScanDataClass } from "../../../models/ResumeScan";
import ResumeBuilder from "../../components/resume/ResumeBuilder";
import { redirect } from "next/navigation";
import { transformParsedResume } from "../resumetest-helper";

export default async function ResumeScanPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const promise = getResumeScan(params.id)

    if (!session) {
        redirect('/');
    }

    return (
        <div className="flex flex-col w-full md:flex-row justify-center">
            <div className="flex flex-col md:w-3/4 md:flex-row py-2 min-h-screen lg:px-4 lg:mt-6">
                {/* @ts-expect-error Server Component */}
                <Await promise={promise}>
                    {({ resumeScan }: { resumeScan: ResumeScanDataClass }) => <ResumeBuilder data={transformParsedResume(resumeScan)} />}
                </Await>
            </div>
        </div>
    );
}
