'use client'
import JobMenu from './JobMenu'
import JobDescription from './pages/JobDescription'
import { useEffect, useState } from 'react';
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
import ProgressBar from './ui/ProgressBar';
import Networking from './pages/Networking';
import ResumeBuilder from '../resume/ResumeBuilder';
import FeedbackAside from '../landingpage/FeedbackAside';
import { Button } from '../Button';

type ApplicationState = 'Research' | 'Phone Screen' | 'Interviewing' | 'Post-Offer';

export function JobApplication({ jobApp, activeSubscription }: { jobApp: any, activeSubscription: boolean }) {
  const [hideMenu, setHideMenu] = useState(false);

  function toggleEdit() {
    setHideMenu(!hideMenu)
  }

  // Extract the high level objects
  const userResume: ResumeClass = jobApp.userResume
  const job: JobClass = jobApp.job
  const profile: ProfileClass = jobApp.profile
  const userId = jobApp.userId
  const profileId = profile._id.toString()
  const jobAppId = jobApp._id.toString()


  // Limit the number of keywords
  let jobKeyWords: string[] = [];

  // Extracting keywords from the skills property
  if (jobApp.job.skills) {
    jobKeyWords.push(...jobApp.job.skills.map((skill: any) => skill.skill));
  }

  if (jobApp.job.tfidf) {
    jobKeyWords.push(...jobApp.job.tfidf.map((tf: any) => tf.term).slice(0, 20));
  }

  // If neither tfidf nor skills are provided, default the keywords to an array with an empty string
  if (!jobApp.job.tfidf && !jobApp.job.skills) {
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
  const profileStripped = stripObject(profile, profileKeys)
  const userResumeStripped: Partial<ResumeClass> = stripObject(userResume, profileKeys)
  const jobKeys = ["jobTitle", 'company', "aboutCompany", "jobDescription", "qualifications", "responsibilities"];
  const jobStripped: Partial<JobClass> = stripObject(job, jobKeys)
  const resumeId = userResume._id.toString()
  const companyDiffbotId = job.companyDiffbotUri ? job.companyDiffbotUri.split('/').pop() : null;


  const progressStates = ['Research', 'Phone Screen', 'Interviewing', 'Post-Offer'];

  const getCurrentProgress = (state: string) => {
    switch (state) {
      case 'WISHLIST':
        return 'Research';
      case 'PHONE SCREEN':
        return 'Phone Screen';
      case 'FIRST ROUND':
      case 'SECOND ROUND':
      case 'THIRD ROUND':
      case 'FINAL ROUND':
        return 'Interviewing';
      case 'JOB OFFER':
      case 'ACCEPTED':
        return 'Post-Offer';
      default:
        return 'Research';
    }
  };
  const [currentProgress, setCurrentCurrentProgress] = useState<ApplicationState>(getCurrentProgress(jobApp.state));

  const pageList = [
    { label: "Job Description", section: 'jobDescription' },
    { label: "Elevator Pitch", section: 'story' },
    { label: "Networking", section: 'networking' },
    { label: "Interview Stories", section: `experience` },
    { label: "Mock Interview", section: 'mockInterview' },
    { label: "Emails", section: 'emails' },
    { label: "Cover Letter", section: 'coverLetter' },
    { label: "Resume", section: 'resume' },
  ]

  // Dynamically create the 'Research' state pages based on the existence of companyDiffbotUri
  const researchPages = ['jobDescription', 'elevatorPitch', 'coverLetter', 'resume'];
  if (job.companyDiffbotUri) {
    researchPages.push('networking');
  }

  // Map the states to the corresponding pages
  const statePagesMap: { [key in ApplicationState]: string[] } = {
    'Research': researchPages,
    'Phone Screen': ['story', 'emails', 'experience'],
    'Interviewing': ['story', 'experience', 'mockInterview', 'emails'],
    'Post-Offer': ['emails']
  };

  // Filter the pages based on the current state
  const filteredPages = pageList.filter(page =>
    statePagesMap[currentProgress].includes(page.section)
  );

  const [currentSection, setCurrentSection] = useState(filteredPages[0].section);

  useEffect(() => {
    const pages = statePagesMap[currentProgress];
    setCurrentSection(pages.length > 0 ? pages[0] : '');
  }, [currentProgress]);

  return (
    <div className='w-full'>
      {!hideMenu &&
        <ProgressBar
          progressStates={progressStates}
          currentProgress={currentProgress}
          setCurrentCurrentProgress={setCurrentCurrentProgress}
        />
      }
      <div className="flex flex-col w-full md:flex-row py-2 min-h-screen lg:px-4 lg:mt-6">
        {!hideMenu &&
          <div className='md:w-1/4'>
            <JobMenu
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              filteredPages={filteredPages}
            />
          </div>
        }
        <div className={`lg:m-3 p-2 ${hideMenu ? 'w-full' : 'lg:p-3 md:w-3/4'}`} key="1">
          {renderCurrentSection(
            currentSection,
            job,
            jobStripped,
            jobKeyWords,
            userResume,
            userResumeStripped,
            profile,
            profileStripped,
            userId,
            profileId,
            resumeId,
            jobAppId,
            jobApp,
            toggleEdit,
            hideMenu,
            activeSubscription,
            companyDiffbotId
          )}
        </div>
        {!hideMenu &&
          <div>
            <FeedbackAside />
          </div>
        }
      </div>
    </div>
  );
}

function renderCurrentSection(
  currentSection: string,
  jobData: JobClass,
  jobStripped:  Partial<JobClass>,
  jobKeyWords: string[],
  userResume: ResumeClass,
  userResumeStripped: Partial<ResumeClass>,
  profile: ProfileClass,
  profileStripped: Partial<ProfileClass>,
  userId: string,
  profileId: string,
  resumeId: string,
  jobAppId: string,
  jobApp: AppClass,
  toggleEdit: any,
  hideMenu: boolean,
  activeSubscription: boolean,
  companyDiffbotId?: string | null
) {
  switch (currentSection) {
    case 'jobDescription':
      return <JobDescription jobData={jobData} topWords={jobKeyWords} companyDiffbotId={companyDiffbotId} activeSubscription={activeSubscription} />;
    case 'mockInterview':
      return (
        <MockInterview
          userName={userResume.name}
          jobStripped={jobStripped}
          jobTitle={jobData.jobTitle}
          company={jobData.company}
          activeSubscription={activeSubscription}
        />
      );
    case 'coverLetter':
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
          {!hideMenu && <Button size='md' onClick={toggleEdit}>Edit Resume</Button>}
          <ResumeBuilder
            data={userResume}
            toggleEdit={toggleEdit}
            editResume={hideMenu}
            activeSubscription={activeSubscription}
            resumeId={userResume._id.toString()}
            job={jobStripped}
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
          profileId={profileId}
          resumeId={resumeId}
          jobStripped={jobStripped}
          jobKeyWords={jobKeyWords}
          userId={userId}
          activeSubscription={activeSubscription}
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
