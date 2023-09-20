import ProfileForm from '../../components/profile/ProfileForm';
import { getProfile } from "../../../lib/profile-db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { profile } = await getProfile(params.id);
  const session = await getServerSession(authOptions)

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
        <ProfileForm
            userId={params.id}
            userProfile={profile}
            sessionUserId={session?.user?.id}
          />
      </div>
    </div>
  );
}