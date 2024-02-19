'use client'
import { Container } from './Container'
import { useState } from 'react';
import { JobApplication } from '../apps/JobApplication';

export function ProductDemo({ jobApp, userId }: { jobApp: any, userId: string }) {
  return (
    <section className="relative pt-16 md:pt-20 xl:pt-32">
      <Container>
        <div className="lg:px-4 lg:mt-6 w-full justify-center">
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
              Below you'll find an example of a packet that will be created for you every time you add a job post. This is a fully interactable live demo of a real profile and a recent job post.
            </p>
          </div>
          <JobApplication
            jobApp={jobApp}
            activeSubscription={true}
            currentUserId={userId}
          />
        </div>
      </Container>
    </section>
  )
}
