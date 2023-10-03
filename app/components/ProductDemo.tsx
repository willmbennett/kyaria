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
import { JobApplication } from '../apps/JobApplication';

export function ProductDemo({ jobApp }: { jobApp: any }) {
  const [currentSection, setCurrentSection] = useState('jobDescription');

  const jobData = jobApp?.job
  return (<>
    <section className="relative pt-16 md:pt-20 xl:pt-32">
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
      <JobApplication
            jobApp={jobApp}
          />
    </section>
  </>)
}
