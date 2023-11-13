'use client'
import JobMenu from './JobMenu'
import JobDescription from './components/pages/JobDescription'
import { useEffect, useState } from 'react';
import CoverLetter from './components/pages/CoverLetter';
import Resume from './components/pages/Resume';
import Experience from './components/pages/Experience';
import Emails from './components/pages/Emails';
import Story from './components/pages/Story';
import { stripObject } from '../../apps/[id]/app-helper';
import { AppClass } from '../../../models/App';
import { ResumeClass } from '../../../models/Resume';
import { JobClass } from '../../../models/Job';
import { ProfileClass } from '../../../models/Profile';
import MockInterview from './components/pages/MockInterview';
import ProgressBar from './components/ProgressBar';

type ApplicationState = 'Research' | 'Phone Screen' | 'Interviewing' | 'Post-Offer';

export function JobApplication({ jobApp }: { jobApp: any }) {

  // Extract the high level objects
  const userResume: ResumeClass = jobApp.userResume
  const job: JobClass = jobApp.job
  const profile: ProfileClass = jobApp.profile
  const userId = jobApp.userId
  const profileId = profile._id.toString()


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
  const profileKeys = ["title",
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
  const userResumeStripped = stripObject(userResume, profileKeys)
  const jobdKeys = ["jobTitle", 'company', "aboutCompany", "jobDescription", "qualifications", "responsibilities"];
  const jobStripped = stripObject(job, jobdKeys)
  const resumeId = userResume._id.toString()

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
    { label: "Interview Stories", section: `experience` },
    { label: "Mock Interview", section: 'mockInterview' },
    { label: "Emails", section: 'emails' },
    { label: "Cover Letter", section: 'coverLetter' },
    { label: "Resume", section: 'resume' },
  ]

  // Map the states to the corresponding pages
  const statePagesMap: { [key in ApplicationState]: string[] } = {
    'Research': ['jobDescription', 'elevatorPitch', 'coverLetter', 'resume'],
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
    const updatedFilteredPages = pageList.filter(page =>
      statePagesMap[currentProgress].includes(page.section)
    );

    if (updatedFilteredPages.length > 0) {
      setCurrentSection(updatedFilteredPages[0].section);
    }
  }, [currentProgress]);

  const jobData = jobApp?.job
  return (
    <div className='w-full'>
      <ProgressBar
        progressStates={progressStates}
        currentProgress={currentProgress}
        setCurrentCurrentProgress={setCurrentCurrentProgress}
      />
      <div className="flex flex-col w-full md:flex-row py-2 min-h-screen lg:px-4 lg:mt-6">

        <div className='md:w-1/4'>
          <JobMenu
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            filteredPages={filteredPages}
          />
        </div>
        <div className="lg:m-3 p-2 lg:p-3 md:w-3/4" key="1">
          {currentSection == 'jobDescription' && jobData && (
            <JobDescription
              jobData={jobData}
              topWords={jobKeyWords}
            />
          )}
          {currentSection == 'mockInterview' && jobData && (
            <MockInterview
              userName={userResume.name}
              jobStripped={jobStripped}
              jobTitle={job.jobTitle}
              company={job.company}
            />
          )}
          {currentSection == 'coverLetter' && jobApp && (
            <CoverLetter
              jobAppId={jobApp._id}
              currentCoverLetter={jobApp.userCoverLetter}
              userResumeStripped={userResumeStripped}
              jobStripped={jobStripped}
              job={job}
              userResume={userResume}
              jobKeyWords={jobKeyWords}
            />
          )}
          {currentSection == 'resume' && jobApp && (
            <Resume
              jobKeyWords={jobKeyWords}
              job={jobStripped}
              userResume={userResume}
              userProfile={profileStripped}
            />
          )}
          {currentSection == 'story' && jobApp && (
            <Story
              jobAppId={jobApp._id}
              currentStory={jobApp.userStory}
              userResumeStripped={userResumeStripped}
              job={jobStripped}
              jobKeyWords={jobKeyWords}
              profileStory={profile.story || ''}
              userId={userId}
              profileId={profileId}
            />
          )}
          {currentSection == 'experience' && jobApp && (
            <Experience
              professionalExperience={userResume.professional_experience || []}
              profileId={profileId}
              resumeId={resumeId}
              jobStripped={jobStripped}
              jobKeyWords={jobKeyWords}
              userId={userId}
            />
          )}
          {currentSection == 'emails' && jobApp && (
            <Emails
              jobAppId={jobApp._id}
              emails={jobApp.emails}
              jobStripped={jobStripped}
              jobKeyWords={jobKeyWords}
              userResumeStripped={userResumeStripped}
            />
          )}
        </div>
      </div>
    </div>
  )
}
