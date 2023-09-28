import { getJob } from "../../../lib/job-db";
import JobDescription from "../../components/board/apps/pages/JobDescription";

export default async function JobPage({ params }: { params: { id: string } }) {
    const { job } = await getJob(params.id)


    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen bg-gray-100">
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
                <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-md">
                    <JobDescription
                        jobData={job}
                    />
                </div>
            </main>
        </div>
    );
}
