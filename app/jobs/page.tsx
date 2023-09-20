import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "../../lib/auth";
import { getUserJobs } from "../../lib/job-db";
import { JobClass } from "../../models/Job";
import JobItem from "../components/jobs/JobItem";

export default async function JobPage() {
  const session = await getServerSession(authOptions)
  const { jobs } = await getUserJobs({ userId: session?.user?.id || '' })


  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen bg-gray-100">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-md">
          {!session?.user?.id && (<>
            <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
              Create a Profile First
            </h1>
            <Link href={`profile/${session?.user?.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Go To Profile</button>
            </Link>
          </>)}
          {jobs?.map((job: JobClass) => (
          <div key={job.id}>
            <JobItem 
            id={job.id} 
            jobTitle={job.jobTitle} 
            company={job.company} 
            />
          </div>
        ))}
        </div>
      </main>
    </div>
  );
}
