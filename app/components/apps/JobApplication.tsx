'use client'
import JobDescription from './pages/JobDescription'
import CoverLetter from './pages/CoverLetter';
import Experience from './pages/Experience';
import Emails from './pages/Emails';
import Story from './pages/Story';
import { stripObject } from '../../apps/[id]/app-helper';
import { AppClass } from '../../../models/App';
import { ResumeClass } from '../../../models/Resume';
import { JobClass } from '../../../models/Job';
import { ProfileClass } from '../../../models/Profile';
import MockInterview from './pages/MockInterview';
import Networking from './pages/Networking';
import CustomPDFViewer from '../resumebuilder/pdfviewer/CustomPDFViewer';

interface JobApplicationProps {
  jobApp: AppClass;
  activeSubscription: boolean;
  currentUserId: string;
  currentSection: string;
}

export function JobApplication(
  {
    jobApp,
    activeSubscription,
    currentUserId,
    currentSection
  }: JobApplicationProps) {
  const userCanEdit = currentUserId == jobApp.userId

  // Extract the high level objects
  const userResume = jobApp.userResume as ResumeClass
  const job = jobApp.job as JobClass
  const profile = jobApp.profile as ProfileClass
  const userId = jobApp.userId
  const profileId = profile.toString()
  const jobAppId = jobApp._id.toString()


  // Limit the number of keywords
  let jobKeyWords: string[] = [];

  // Extracting keywords from the skills property
  if (job.skills) {
    jobKeyWords.push(...job.skills.map((skill: any) => skill.skill));
  }

  if (job.tfidf) {
    jobKeyWords.push(...job.tfidf.map((tf: any) => tf.term).slice(0, 20));
  }

  // If neither tfidf nor skills are provided, default the keywords to an array with an empty string
  if (!job.tfidf && !job.skills) {
    jobKeyWords = [''];
  }

  // Remove longer text from profile and limit to only relevant keys
  const profileKeys = [
    "name",
    "title",
    "summary",
    "areas_of_expertise",
    "skills",
    "education",
    "professional_experience",
    'details',
    'responsibilities',
    'content',
    'start_date',
    'end_date',
    'degree',
    'company',
    'institution'
  ];
  const userResumeStripped: Partial<ResumeClass> = stripObject(userResume, profileKeys)
  const jobKeys = ["jobTitle", 'company', "aboutCompany", "jobDescription", "qualifications", "responsibilities"];
  const jobStripped: Partial<JobClass> = stripObject(job, jobKeys)
  const resumeId = userResume._id.toString()
  const companyDiffbotId = job.companyDiffbotUri ? job.companyDiffbotUri.split('/').pop() : null;

  return (
    <div className='w-full'>
      {renderCurrentSection(
        currentSection,
        job,
        jobStripped,
        jobKeyWords,
        userResume,
        userResumeStripped,
        userId,
        profile,
        profileId,
        resumeId,
        jobAppId,
        jobApp,
        activeSubscription,
        userCanEdit,
        companyDiffbotId
      )}
    </div>
  );
}

function renderCurrentSection(
  currentSection: string,
  jobData: JobClass,
  jobStripped: Partial<JobClass>,
  jobKeyWords: string[],
  userResume: ResumeClass,
  userResumeStripped: Partial<ResumeClass>,
  userId: string,
  profile: ProfileClass,
  profileId: string,
  resumeId: string,
  jobAppId: string,
  jobApp: AppClass,
  activeSubscription: boolean,
  userCanEdit: boolean,
  companyDiffbotId?: string | null
) {
  switch (currentSection) {
    case 'jobdescription':
      return <JobDescription
        jobData={jobData}
        topWords={jobKeyWords}
        companyDiffbotId={companyDiffbotId}
        activeSubscription={activeSubscription}
        currentUserId={userId} />;
    case 'mockinterview':
      return (
        <MockInterview
          userName={userResume.name}
          jobStripped={jobStripped}
          jobTitle={jobData.jobTitle}
          company={jobData.company}
          activeSubscription={activeSubscription}
        />
      );
    case 'coverletter':
      return (
        <CoverLetter
          jobAppId={jobAppId}
          currentCoverLetter={jobApp.userCoverLetter || ''}
          userResumeStripped={userResumeStripped}
          jobStripped={jobStripped}
          job={jobData}
          userResume={userResume}
          jobKeyWords={jobKeyWords}
          activeSubscription={activeSubscription}
        />
      );
    case 'resume':
      return (
        <div className='w-full flex flex-col items-center justify-center'>
          <CustomPDFViewer
            data={userResume}
            useEdit={true}
            userId={userId}
            useSave={true}
            activeSubscription={activeSubscription}
          />
        </div>
      );
    case 'story':
      return (
        <Story
          jobAppId={jobAppId}
          currentStory={jobApp.userStory || ''}
          userResumeStripped={userResumeStripped}
          job={jobData}
          jobKeyWords={jobKeyWords}
          profileStory={profile.story || ''}
          userId={userId}
          profileId={profileId}
          activeSubscription={activeSubscription}
          userCanEdit={userCanEdit}
        />
      );
    case 'networking':
      return (
        <Networking
          companyDiffbotUri={companyDiffbotId || ''}
          userResumeStripped={userResumeStripped}
          jobStripped={jobStripped}
          company={jobData.company}
          activeSubscription={activeSubscription}
        />
      );
    case 'experience':
      return (
        <Experience
          professionalExperience={userResume.professional_experience || []}
          resumeId={resumeId}
          jobStripped={jobStripped}
          jobKeyWords={jobKeyWords}
          userId={userId}
          activeSubscription={activeSubscription}
          userCanEdit={userCanEdit}
        />
      );
    case 'emails':
      return (
        <Emails
          jobAppId={jobAppId}
          emails={jobApp.emails}
          jobStripped={jobStripped}
          jobKeyWords={jobKeyWords}
          userResumeStripped={userResumeStripped}
          activeSubscription={activeSubscription}
        />
      );
    default:
      return null;
  }
}
