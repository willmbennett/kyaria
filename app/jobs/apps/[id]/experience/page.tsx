import { getJobApp } from "../../../../../lib/app-db";
import Experience from "../../../../components/jobs/apps/pages/Experience";

export default async function ExperiencePage({ params }: { params: { id: string } }) {
    const { jobApp } = await getJobApp(params.id);
    const jobData = jobApp?.job

    return (
        <div className="lg:px-4 lg:mt-6">
            {jobData && (
                <Experience
                    jobApp={jobApp}
                />
            )}
        </div>
    );
}