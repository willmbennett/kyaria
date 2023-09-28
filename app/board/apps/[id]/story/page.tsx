import { getJobApp } from "../../../../../lib/app-db";
import Story from "../../../../components/board/apps/pages/Story";

export default async function ExperiencePage({ params }: { params: { id: string } }) {
    const { jobApp } = await getJobApp(params.id);
    const jobData = jobApp?.job

    return (
        <div className="lg:px-4 lg:mt-6">
            {jobData && (
                <Story
                    jobApp={jobApp}
                />
            )}
        </div>
    );
}