import Link from "next/link";
import { getUserJobApps } from "../../lib/app-db";
import { getProfile } from "../../lib/profile-db";
import Board from "../components/apps/Board";
import Await from "../jobs/await";
import { redirect } from "next/navigation";
import { Button } from "../components/Button";
import { AppClass } from "../../models/App";
import { checkSubscription } from "../../lib/hooks/check-subscription";

export default async function BoarPage() {
  const { activeSubscription, userId } = await checkSubscription()
  
  if (!userId) {
    redirect('/auth/signin')
  }

  const promise = getUserJobApps({ userId: userId })
  const { profile } = await getProfile(userId || ''); // true means hide any deleted items from profiles

  return (
    <>
      {!profile && (<div className="h-screen justify-center items-center flex flex-col">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
          Create a Profile First
        </h1>
        <Link href={`profile/${userId}`}>
          <Button
            variant="solid"
            size="md"
            className="mt-10 sm:mt-12"
          >
            Go to Profile
          </Button>
        </Link>
      </div>)}
      {profile && (<>
        {/* @ts-expect-error Server Component */}
        < Await promise={promise}>
          {({ jobApps }: {jobApps: AppClass[]}) => <Board
            jobApps={jobApps}
            profile={profile}
            activeSubscription={activeSubscription}
          />}
        </Await>
      </>)
      }
    </>
  );
}
