import JobApp from "../../../components/jobs/apps/JobApp";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import { getJobApp } from "../../../../lib/app-db";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { jobApp } = await getJobApp(params.id);
  const session = await getServerSession(authOptions)

  return (
    <div className="flex w-full lg:px-4 lg:mt-6">
        {jobApp && (
          <JobApp
            jobApp={jobApp}
          />
        )}
      </div>
  );
}