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
import Resume from './pages/Resume';
import React from 'react';

interface JobApplicationProps {
  jobApp: AppClass;
  activeSubscription: boolean;
  currentUserId: string;
  currentSection: string;
}

// Memoizing each component with React.memo
const MemoizedJobDescription = React.memo(JobDescription);
const MemoizedCoverLetter = React.memo(CoverLetter);
const MemoizedExperience = React.memo(Experience);
const MemoizedEmails = React.memo(Emails);
const MemoizedStory = React.memo(Story);
const MemoizedMockInterview = React.memo(MockInterview);
const MemoizedNetworking = React.memo(Networking);
const MemoizedResume = React.memo(Resume);


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

  const jobApplicationComponents: Map<string, {
    component: React.JSX.Element,
  }> = new Map([
    ['jobdescription', {
      component: <MemoizedJobDescription
        jobData={job}
        topWords={jobKeyWords}
        companyDiffbotId={companyDiffbotId}
        activeSubscription={activeSubscription}
        currentUserId={userId} />
    }],
    ['mockinterview', {
      component: <MemoizedMockInterview
        userName={userResume.name}
        jobStripped={jobStripped}
        jobTitle={job.jobTitle}
        company={job.company}
        activeSubscription={activeSubscription}
      />
    }],
    ['coverletter', {
      component: <MemoizedCoverLetter
        jobAppId={jobAppId}
        currentCoverLetter={jobApp.userCoverLetter || ''}
        userResumeStripped={userResumeStripped}
        jobStripped={jobStripped}
        job={job}
        userResume={userResume}
        jobKeyWords={jobKeyWords}
        activeSubscription={activeSubscription}
      />
    }],
    ['resume', {
      component:
        <MemoizedResume
          userResume={userResume}
          userId={userId}
          activeSubscription={activeSubscription}
        />
    }],
    ['story', {
      component: <MemoizedStory
        jobAppId={jobAppId}
        currentStory={jobApp.userStory || ''}
        userResumeStripped={userResumeStripped}
        job={job}
        profileStory={profile.story || ''}
        profileId={profileId}
        activeSubscription={activeSubscription}
        userCanEdit={userCanEdit}
      />
    }],
    ['networking', {
      component: <MemoizedNetworking
        companyDiffbotUri={companyDiffbotId || ''}
        userResumeStripped={userResumeStripped}
        jobStripped={jobStripped}
        company={job.company}
        activeSubscription={activeSubscription}
      />
    }],
    ['experience', {
      component: <MemoizedExperience
        professionalExperience={userResume.professional_experience || []}
        resumeId={resumeId}
        jobStripped={jobStripped}
        jobKeyWords={jobKeyWords}
        userId={userId}
        activeSubscription={activeSubscription}
        userCanEdit={userCanEdit}
      />
    }],
    ['emails', {
      component: <MemoizedEmails
        jobAppId={jobAppId}
        emails={jobApp.emails}
        jobStripped={jobStripped}
        jobKeyWords={jobKeyWords}
        userResumeStripped={userResumeStripped}
        activeSubscription={activeSubscription}
      />
    }],
    // Add other sections as needed
  ]);


  return (
    <div className='w-full'>
      {jobApplicationComponents.get(currentSection)?.component}
    </div>
  );
}