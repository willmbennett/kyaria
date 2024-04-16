'use server'
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
import Networking from './pages/Networking';
import Resume from './pages/Resume';
import Notes from './pages/Notes'
import React from 'react';
import Eve from './pages/Eve';
import Files from './pages/Files';

interface JobApplicationProps {
  jobApp: AppClass;
  currentUserId: string;
  currentSection: string;
  activeSubscription: boolean;
  admin: boolean;
}

// Memoizing each component with React.memo


export async function JobApplication(
  {
    jobApp,
    currentUserId,
    currentSection,
    activeSubscription,
    admin
  }: JobApplicationProps) {
  const userCanEdit = currentUserId == jobApp.userId

  // Extract the high level objects
  const userResume = jobApp.userResume as ResumeClass
  const job = jobApp.job as JobClass
  const jobId = job._id.toString()
  const chatId = jobApp.chatId?.toString()
  const profile = jobApp.profile as ProfileClass
  const userId = jobApp.userId
  const profileId = profile.toString()
  const jobAppId = jobApp._id.toString()
  const notes = jobApp.notes
  const files = jobApp.files


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
      component: <JobDescription
        jobData={job}
        topWords={jobKeyWords}
        companyDiffbotId={companyDiffbotId}
        activeSubscription={true}
        currentUserId={userId} />
    }],
    ['coverletter', {
      component: <CoverLetter
        jobAppId={jobAppId}
        currentCoverLetter={jobApp.userCoverLetter || ''}
        userResumeStripped={userResumeStripped}
        jobStripped={jobStripped}
        job={job}
        userResume={userResume}
        jobKeyWords={jobKeyWords}
      />
    }],
    ['resume', {
      component:
        <Resume
          userResume={userResume}
          userId={userId}
          jobId={jobId}
        />
    }],
    ['notes', {
      component:
        <Notes
          jobAppId={jobAppId}
          content={notes}
        />
    }],
    ['files', {
      component:
        <Files files={files} jobAppId={jobAppId}/>
    }],
    ['story', {
      component: <Story
        jobAppId={jobAppId}
        currentStory={jobApp.userStory || ''}
        userResumeStripped={userResumeStripped}
        job={job}
        profileStory={profile.story || ''}
        profileId={profileId}
        userCanEdit={userCanEdit}
      />
    }],
    ['networking', {
      component: <Networking
        companyDiffbotUri={companyDiffbotId || ''}
        userResumeStripped={userResumeStripped}
        jobStripped={jobStripped}
        company={job.company}
        activeSubscription={activeSubscription}
      />
    }],
    ['experience', {
      component: <Experience
        professionalExperience={userResume.professional_experience || []}
        resumeId={resumeId}
        originalResumeId={userResume.originalResumeId}
        jobStripped={jobStripped}
        jobKeyWords={jobKeyWords}
        userId={userId}
        userCanEdit={userCanEdit}
      />
    }],
    ['emails', {
      component: <Emails
        jobAppId={jobAppId}
        emails={jobApp.emails}
        jobStripped={jobStripped}
        jobKeyWords={jobKeyWords}
        userResumeStripped={userResumeStripped}
      />
    }],
    ['mockinterview', {
      component:
        <>{/* @ts-ignore */}
          <Eve
            jobAppId={jobAppId}
            jobId={jobId}
            resumeId={resumeId}
            userId={userId}
            chatId={chatId}
            activeSubscription={activeSubscription}
            admin={admin} />
        </>
    }],
    // Add other sections as needed
  ]);


  return (
    <div className='w-full'>
      {jobApplicationComponents.get(currentSection)?.component}
    </div>
  );
}