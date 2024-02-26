import { createProfile, getProfile } from "../../../lib/profile-db";
import { redirect } from 'next/navigation';
import { checkSubscription } from '../../../lib/hooks/check-subscription';
import { ProfileNotFound } from '../../components/profile/notfound/ProfileNotFound';
import { getResumes } from '../../../lib/resume-db';
import { ResumeClass } from '../../../models/Resume';
import OnboardingMenu from '../../components/profile/onboarding/OnboardingMenu';
import { getUserJobApps } from "../../../lib/app-db";
import { AppClass } from "../../../models/App";

type getResumesType = {
  resumes: ResumeClass[]
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { activeSubscription, userId, userName } = await checkSubscription()

  // Login protection
  if (!userId) {
    redirect('/')
  }

  const { profile } = await getProfile(params.id);

  if (!profile) {
    if (params.id == userId) {
      await createProfile({ userId })
      redirect(`/profile/${userId}`)
    } else {
      return <ProfileNotFound userId={userId} />
    }
  }
  const profileId = profile._id.toString()

  const { resumes } = await getResumes(userId) as getResumesType
  const { jobApps } = await getUserJobApps({ userId: userId }) as { jobApps: AppClass[] }
  const { bio, story, questionnaire } = profile

  return (
    <div className="flex flex-col w-full md:w-3/4 lg:px-4 space-y-10">
      <h1 className="bg-white text-4xl font-semibold text-slate-900 p-6">{userName}'s Profile</h1>
      <div className="shadow-sm p-6 rounded-lg">
        <OnboardingMenu
          // hasResumes={hasResumes}
          // hasQuestionnaire={hasQuestionaire}
          questionnaire={questionnaire}
          bio={bio}
          story={story}
          activeSubscription={activeSubscription}
          resumes={resumes}
          apps={jobApps}
          userId={userId}
          profileId={profileId}
        />
      </div>
    </div>
  );
}
