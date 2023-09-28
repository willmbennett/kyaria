import { getJobApp } from "../../../../../lib/app-db";
import CoverLetter from "../../../../components/board/apps/pages/CoverLetter";

export default async function CoverLetterPage({ params }: { params: { id: string } }) {
    const { jobApp } = await getJobApp(params.id);
    const jobData = jobApp?.job

    return (
        <div className="lg:px-4 lg:mt-6">
            {jobData && (
                <CoverLetter
                    jobApp={jobApp}
                />
            )}
        </div>
    );
}