'use client'
import DemoJobMenu from './DemoJobMenu'
import JobDescription from './board/apps/pages/JobDescription'
import { Container } from './Container'
import { useState } from 'react';
import CoverLetter from './board/apps/pages/CoverLetter';
import Resume from './board/apps/pages/Resume';
import Experience from './board/apps/pages/Experience';
import Emails from './board/apps/pages/Emails';
import Story from './board/apps/pages/Story';

export function ProductDemo({ jobApp }: { jobApp: any }) {
  const [currentSection, setCurrentSection] = useState('jobDescription');

  const jobData = jobApp?.job
  return (<>
    <section className="relative overflow-hidden pt-16 md:pt-20 xl:pt-32">
      <Container>
        <div className="flex flex-col items-center">
          <p className="flex items-center space-x-3.5 text-xl font-medium text-amber-900/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={3}
              viewBox="0 0 28 3"
              fill="none"
            >
              <line
                y1="1.5"
                x2={28}
                y2="1.5"
                stroke="currentColor"
                strokeOpacity="0.65"
                strokeWidth={3}
              />
            </svg>

            <span>Product Demo</span>
          </p>
          <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg my-5 max-w-2xl text-center">
            This is an example packet that will get created for you every time you add a job post. This is a real profile from a founder and a recent job post.
          </p>
        </div>
      </Container>
      <div className="flex max-w-5xl mx-auto flex-col py-2 min-h-screen border">
        <div className="lg:px-4 lg:mt-6">
          <div className="flex h-auto min-h-screen w-full lg:px-4 lg:mt-6">
            <div className="lg:w-1/4 hidden lg:flex lg:flex-col">
              <DemoJobMenu
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
              />
            </div>
            <div className="lg:w-3/4 flex flex-col bg-white lg:m-3 lg:p-3 rounded-lg">
              {currentSection == 'jobDescription' && (
                <Container>
                  {jobData && (
                    <JobDescription
                      jobData={jobData}
                    />
                  )}
                </Container>
              )}
              {currentSection == 'coverLetter' && (
                <Container>
                  {jobApp && (
                    <CoverLetter
                      jobApp={jobApp}
                    />
                  )}
                </Container>
              )}
              {currentSection == 'resume' && (
                <Container>
                  {jobApp && (
                    <Resume
                      application={jobApp}
                    />
                  )}
                </Container>
              )}
              {currentSection == 'story' && (
                <Container>
                  {jobApp && (
                    <Story
                      jobApp={jobApp}
                    />
                  )}
                </Container>
              )}
              {currentSection == 'experience' && (
                <Container>
                  {jobApp && (
                    <Experience
                      jobApp={jobApp}
                    />
                  )}
                </Container>
              )}
              {currentSection == 'emails' && (
                <Container>
                  {jobApp && (
                    <Emails
                      jobApp={jobApp}
                    />
                  )}
                </Container>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
    <div className='lg:hidden sticky bottom-0 w-full'>
      <DemoJobMenu
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
    </div>
  </>)
}
