'use client'
import JobMenu from './JobMenu'
import JobDescription from '../components/board/apps/pages/JobDescription'
import { Container } from '../components/Container'
import { useState } from 'react';
import CoverLetter from '../components/board/apps/pages/CoverLetter';
import Resume from '../components/board/apps/pages/Resume';
import Experience from '../components/board/apps/pages/Experience';
import Emails from '../components/board/apps/pages/Emails';
import Story from '../components/board/apps/pages/Story';

export function JobApplication({ jobApp }: { jobApp: any }) {
  const [currentSection, setCurrentSection] = useState('jobDescription');

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
                />
              )}
              {currentSection == 'coverLetter' && jobApp && (
                <CoverLetter
                  jobApp={jobApp}
                />
              )}
              {currentSection == 'resume' && jobApp && (
                <Resume
                  application={jobApp}
                />
              )}
              {currentSection == 'story' && jobApp && (
                <Story
                  jobApp={jobApp}
                />
              )}
              {currentSection == 'experience' && jobApp && (
                <Experience
                  jobApp={jobApp}
                />
              )}
              {currentSection == 'emails' && jobApp && (
                <Emails
                  jobApp={jobApp}
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
