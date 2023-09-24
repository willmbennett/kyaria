import Job from "../../../components/jobs/job/Job";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import { getJobApp } from "../../../../lib/app-db";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { jobApp } = await getJobApp(params.id);
  const session = await getServerSession(authOptions)

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
        {jobApp && (
          <Job
            jobApp={jobApp}
          />
        )}
      </div>
    </div>
  );
}