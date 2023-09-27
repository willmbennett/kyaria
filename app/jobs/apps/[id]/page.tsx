import { getJobApp } from "../../../../lib/app-db";
import JobDescription from '../../../components/jobs/apps/pages/JobDescription';

export default async function JobAppPage({ params }: { params: { id: string } }) {
  const { jobApp } = await getJobApp(params.id);
  const jobData = jobApp?.job

  return (
    <div className="lg:px-4 lg:mt-6">
      {jobData && (
        <JobDescription
          jobData={jobData}
        />
      )}
    </div>
  );
}