'use client'
import JobMenu from './JobMenu'
import JobDescription from './pages/JobDescription'
import { Container } from '../Container'
import { useState } from 'react';
import CoverLetter from './pages/CoverLetter';
import Resume from './pages/Resume';
import Experience from './pages/Experience';
import Emails from './pages/Emails';
import Story from './pages/Story';
import { Chat } from '../chat/Chat';
import { type Message } from 'ai/react'
import { stripObject } from '../../apps/[id]/app-helper';
import { AppClass } from '../../../models/App';
import { ResumeClass } from '../../../models/Resume';
import { JobClass } from '../../../models/Job';
import { ProfileClass } from '../../../models/Profile';

export function JobApplication({ jobApp }: { jobApp: any }) {
  const [currentSection, setCurrentSection] = useState('jobDescription');

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

  const initialMessages: Message[] = [
    {
      "id": "1",
      "role": "system",
      "content": `You are a career coach that is helping ${userResume.name} do a mock interview
                  They are applying for this job ${JSON.stringify(jobStripped)}
                  Act only in your capacity as a career coach and do not discuss any other topic.
                  `
    },
    {
      "id": "2",
      "role": "assistant",
      "content": `Hi ${userResume.name} are you ready to do a mock interview for the ${jobApp.job.jobTitle} position at ${jobApp.job.company}?`
    }
  ];

  const jobData = jobApp?.job
  return (
    <section>
      <div className="flex flex-col max-w-5xl md:flex-row py-2 min-h-screen lg:px-4 lg:mt-6">
        <div className='md:w-1/4'>
          <JobMenu
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        </div>
        <div className="lg:m-3 p-2 lg:p-3 md:w-3/4">
          {currentSection == 'jobDescription' && jobData && (
            <JobDescription
              jobData={jobData}
              topWords={jobKeyWords}
            />
          )}
          {currentSection == 'mockInterview' && jobData && (
            <Chat initialMessages={initialMessages} />
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
    </section>
  )
}
