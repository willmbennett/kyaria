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
import { createJobKeywords } from '../../apps/[id]/app-helper';
import { Chat } from '../chat/Chat';
import { type Message } from 'ai/react'

export function JobApplication({ jobApp }: { jobApp: any }) {
  const [currentSection, setCurrentSection] = useState('jobDescription');
  const { jobKeyWords, topWords } = createJobKeywords(jobApp.job)

  const initialMessages: Message[] = [
    {
      "id": "1",
      "role": "system",
      "content": `You are a career coach that is helping ${jobApp.userResume.name} do a mock interview
                  They are applying for this job ${JSON.stringify(jobApp.job)}
                  Act only in your capacity as a career coach and do not discuss any other topic.
                  `
    },
    {
      "id": "2",
      "role": "assistant",
      "content": `Hi ${jobApp.userResume.name} are you ready to do a mock interview for the ${jobApp.job.jobTitle} position at ${jobApp.job.company}?`
    }
  ];

  const jobData = jobApp?.job
  return (<>
    <section className="relative overflow-hidden">
      <div className="flex max-w-5xl mx-auto flex-col py-2 min-h-screen">
        <div className="lg:px-4 lg:mt-6">
          <div className="flex flex-col lg:flex-row h-auto min-h-screen w-full p-2 lg:px-4 lg:mt-6">
            <div className="lg:w-1/4 flex flex-col">
              <JobMenu
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
              />
            </div>
            <div className="lg:w-3/4 flex flex-col lg:m-3 lg:p-3 rounded-lg">
              {currentSection == 'jobDescription' && jobData && (
                <JobDescription
                  jobData={jobData}
                  topWords={topWords}
                />
              )}
              {currentSection == 'mockInterview' && jobData && (
                <Chat initialMessages={initialMessages} />
              )}
              {currentSection == 'coverLetter' && jobApp && (
                <CoverLetter
                  jobApp={jobApp}
                  jobKeyWords={jobKeyWords}
                />
              )}
              {currentSection == 'resume' && jobApp && (
                <Resume
                  application={jobApp}
                  jobKeyWords={jobKeyWords}
                />
              )}
              {currentSection == 'story' && jobApp && (
                <Story
                  jobApp={jobApp}
                  jobKeyWords={jobKeyWords}
                />
              )}
              {currentSection == 'experience' && jobApp && (
                <Experience
                  jobApp={jobApp}
                  jobKeyWords={jobKeyWords}
                />
              )}
              {currentSection == 'emails' && jobApp && (
                <Emails
                  jobApp={jobApp}
                  jobKeyWords={jobKeyWords}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
    {/*<div className='lg:hidden sticky bottom-0 w-full'>
      <JobMenu
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
    </div>*/}
  </>)
}
