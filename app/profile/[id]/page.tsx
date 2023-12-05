import Profile from '../../components/profile/Profile';
import { getProfile } from "../../../lib/profile-db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import Await from '../../jobs/await';
import FeedbackAside from '../../components/landingpage/FeedbackAside';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
    return null; // Add this to ensure no further rendering happens after redirect
  }

  const profilePromise = getProfile(params.id);

  return (
    <div className="flex max-w-5xl mx-auto flex-col md:flex-row justify-center py-2 min-h-screen">
      <div className="flex flex-1 w-full flex-col items-center text-center lg:px-4">
        {/* @ts-expect-error Server Component */}
        <Await promise={profilePromise}>
          {({ profile }) =>
            <Profile
              userId={params.id}
              profile={profile}
              sessionUserId={session?.user?.id}
              edit={params.id == session?.user?.id}
            />
          }
        </Await>
      </div>
      <div>
        <FeedbackAside />
      </div>
    </div>
  );
}
