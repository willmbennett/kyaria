import Resume from "../../../../components/board/apps/pages/Resume";
import { getJobApp } from "../../../../../lib/app-db";

export default async function ResumePage({ params }: { params: { id: string } }) {
    const { jobApp } = await getJobApp(params.id);
    const jobData = jobApp?.job

    return (
        <div className="lg:px-4 lg:mt-6">
            {jobData && (
                <Resume
                    application={jobApp}
                />
            )}
        </div>
    );
}