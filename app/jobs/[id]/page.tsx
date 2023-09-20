import Job from "../../components/jobs/job/Job";
import { getJob } from "../../../lib/job-db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { getProfile } from "../../../lib/profile-db";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { job } = await getJob(params.id);
  const session = await getServerSession(authOptions)
  const { profile } = await getProfile(session?.user?.id || '');

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
      <Job
            job={job}
            profile={profile}
          />
      </div>
    </div>
  );
}