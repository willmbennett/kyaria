import { createProfile, getProfile } from "../../../lib/profile-db";
import { redirect } from 'next/navigation';
import { checkSubscription } from '../../../lib/hooks/check-subscription';
import { ProfileNotFound } from '../../components/profile/notfound/ProfileNotFound';
import { getResumes } from '../../../lib/resume-db';
import { ResumeClass } from '../../../models/Resume';
import OnboardingMenu from '../../components/profile/onboarding/OnboardingMenu';
import ResumeBuilderHome from '../../components/resumebuilder/ResumeBuilderHome';
import { Bio } from '../../components/bio/Bio';
import { Pitch } from '../../components/pitch/Pitch';

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

      {/* User's Name and Onboarding Menu */}
      {onboarding &&
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <OnboardingMenu
            hasResumes={hasResumes}
            hasQuestionaire={hasQuestionaire}
            hasPitch={hasPitch}
            hasBio={hasBio}
          />
        </div>
      }

      {/* LinkedIn Bio Section */}
      {questionnaire && (
        <div className="bg-white shadow-sm p-6 rounded-lg space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Questionnaire Answers</h3>
          <ul className="list-disc pl-5 space-y-2">
            {questionnaire.desiredRole && (
              <li><strong>Desired Role:</strong> {questionnaire.desiredRole}</li>
            )}
            {questionnaire.industryExperience !== undefined && (
              <li><strong>Industry Experience:</strong> {questionnaire.industryExperience} years</li>
            )}
            {questionnaire.jobSearchStatus && (
              <li><strong>Job Search Status:</strong> {questionnaire.jobSearchStatus}</li>
            )}
            {questionnaire.salaryMin !== undefined && questionnaire.salaryMax !== undefined && (
              <li><strong>Salary Range:</strong> ${questionnaire.salaryMin.toLocaleString()} - ${questionnaire.salaryMax.toLocaleString()}</li>
            )}
          </ul>
        </div>
      )}

      {/* LinkedIn Bio Section */}
      {bio && activeSubscription && (
        <div className='bg-white shadow-sm p-6 rounded-lg flex flex-col space-y-5'>
          <h3 className="text-2xl font-bold text-slate-900">
            LinkedIn Bio
          </h3>
          <Bio
            resumes={resumes}
            profileId={profileId}
            currentBio={bio}
            desiredRole={questionnaire?.desiredRole}
          />
        </div>
      )}

      {/* Elevator Pitch Section */}
      {story && activeSubscription && (
        <div className='bg-white shadow-sm p-6 rounded-lg flex flex-col space-y-5'>
          <h3 className="text-2xl font-bold text-slate-900">
            Elevator Pitch
          </h3>
          <Pitch
            resumes={resumes}
            profileId={profileId}
            currentPitch={story || ''}
            desiredRole={questionnaire?.desiredRole}
          />
        </div>
      )}

      {/* Resume Section */}
      {hasResumes && (
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            Resumes
          </h3>
          <ResumeBuilderHome
            userId={userId}
            resumes={resumes}
            activeSubscription={activeSubscription}
          />
        </div>
      )}
    </div>
  );
}
