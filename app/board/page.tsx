import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "../../lib/auth";
import { getUserJobApps } from "../../lib/app-db";
import { getProfile } from "../../lib/profile-db";
import JobAppsList from "../components/board/apps/JobApps";
import Await from "../jobs/await";
import { redirect } from "next/navigation";

export default async function BoarPage() {
  const session = await getServerSession(authOptions)
  const promise = getUserJobApps({ userId: session?.user?.id || '' })
  const { profile } = await getProfile(session?.user?.id || '');

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <>
      {!profile && (<div className="h-screen justify-center items-center flex flex-col">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
          Create a Profile First
        </h1>
        <Link href={`profile/${session?.user?.id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Go To Profile</button>
        </Link>
      </div>)}
      {profile && (<>
        {/* @ts-expect-error Server Component */}
        < Await promise={promise}>
          {({ jobApps }) => <JobAppsList
            jobApps={jobApps}
            profile={profile}
          />}
        </Await>
      </>)
      }
    </>
  );
}
