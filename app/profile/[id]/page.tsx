import Profile from '../../components/profile/Profile';
import { getProfile } from "../../../lib/profile-db";
import { redirect } from 'next/navigation';
import FeedbackAside from '../../components/landingpage/FeedbackAside';
import { checkSubscription } from '../../../lib/hooks/check-subscription';
import { Button } from '../../components/Button';
import { ProfileNotFound } from '../../components/profile/notfound/ProfileNotFound';
import { getResumes } from '../../../lib/resume-db';
import { ResumeClass } from '../../../models/Resume';
import { ProfileResumes } from '../../components/profile/ProfileResumes';
import OnboardingMenu from '../../components/profile/onboarding/OnboardingMenu';
import { ResumeUploadForm } from '../../components/resumebuilder/new/ResumeUploadForm';

type getResumesType = {
  resumes: ResumeClass[]
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { activeSubscription, userId, userName } = await checkSubscription()
  const { resumes } = await getResumes(userId) as getResumesType

  if (!userId) {
    redirect('/')
  }

  const { profile } = await getProfile(params.id);

  if (!profile && !(params.id == userId)) {
    return <ProfileNotFound userId={userId} />
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col md:flex-row justify-center px-4 py-2 min-h-screen">
      <div className="flex w-full flex-col lg:px-4">
        <OnboardingMenu />
      </div>
      <div>
        <FeedbackAside />
      </div>
    </div>
  );
}
