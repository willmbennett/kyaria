import { getJobApp } from "../../../../../lib/app-db";
import Emails from "../../../../components/board/apps/pages/Emails";

export default async function EmailsPage({ params }: { params: { id: string } }) {
    const { jobApp } = await getJobApp(params.id);
    const jobData = jobApp?.job

    return (
        <div className="lg:px-4 lg:mt-6">
            {jobData && (
                <Emails
                    jobApp={jobApp}
                />
            )}
        </div>
    );
}