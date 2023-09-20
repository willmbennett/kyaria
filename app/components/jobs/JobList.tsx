import { getUserJobs } from '../../../lib/job-db';
import { JobClass } from '../../../models/Job';
import JobItem from './JobItem';

export default function JobList({ userId }: { userId: string }) {
  const { jobs } = getUserJobs({ userId: userId })

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
        {JSON.stringify(jobs)}
        {jobs?.map((job: JobClass) => (
          <div key={job.id}>
            <JobItem
              job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
