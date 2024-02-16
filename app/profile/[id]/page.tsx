import { createProfile, getProfile } from "../../../lib/profile-db";
import { redirect } from 'next/navigation';
import { checkSubscription } from '../../../lib/hooks/check-subscription';
import { ProfileNotFound } from '../../components/profile/notfound/ProfileNotFound';
import { getResumes } from '../../../lib/resume-db';
import { ResumeClass } from '../../../models/Resume';
import OnboardingMenu from '../../components/profile/onboarding/OnboardingMenu';

type getResumesType = {
  resumes: ResumeClass[]
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { activeSubscription, userId, userName } = await checkSubscription()
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

  const hasResumes = resumes.length > 0
  const hasQuestionaire = profile?.questionnaire ? true : false
  const hasPitch = profile?.story ? true : false
  const hasBio = profile?.bio ? true : false

  const onboarding = !hasResumes || !hasQuestionaire || !hasPitch || !hasBio

  const { bio, story, questionnaire } = profile

  return (
    <div className="flex flex-col w-full md:w-3/4 lg:px-4 space-y-10">
      <h1 className="text-4xl font-semibold text-slate-900 p-6">{userName}'s Profile</h1>
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <OnboardingMenu
            // hasResumes={hasResumes}
            // hasQuestionnaire={hasQuestionaire}
            questionnaire={questionnaire}
            bio={bio}
            story={story}
            activeSubscription={activeSubscription}
            resumes={resumes}
            userId={userId}
            profileId={profileId}
          />
        </div>
    </div>
  );
}
