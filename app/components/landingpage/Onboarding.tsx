'use client'
import { Container } from './Container'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import JobAppUploader from '../../apps/new/components/JobAppUploader'
import { Button } from '../Button'
import { DropdownMenu } from '../ui/DropdownMenu'
import { interviewTypeOptions } from '../../mockinterviews/helper'
import { useState } from 'react'

interface OnboardingPageProps {
  userId: string,
  profileId: string,
  resumeId?: string
}

export default function OnboardingPage({ userId, profileId, resumeId }: OnboardingPageProps) {
  const application = localStorage.getItem('onboardingApplication')
  const [interviewType, setInterviewType] = useState(interviewTypeOptions[0])

  const handleSelectInterviewType = async (id: string) => {
    const newInterviewType = interviewTypeOptions.find(j => j.id == id)
    if (newInterviewType) {
      setInterviewType(newInterviewType)
    }
  }

  return (
    <section className="relative pt-16 md:pt-20 xl:pt-32">
      <Container className='flex flex-col items-center justify-center gap-10'>
        <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl text-center xl:mx-0 xl:text-6xl">
          Let's create your first mock interview
        </h1>
        <div className="flex flex-col max-w-3xl gap-4 text-center">
          <h2 className="text-xl font-semibold  text-center leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-3xl">
            Step 1. Add your resume
          </h2>
          {resumeId ?
            <div className='flex gap-2 items-center justify-center'>
              <p>Resume created!</p>
              <CheckCircleIcon className=' w-5 text-green-700' />
            </div>
            : <JobAppUploader
              userId={userId}
              profileId={profileId}
              userResume={resumeId}
            />
          }
        </div>
        {resumeId &&
          <div className="flex flex-col max-w-3xl gap-4 text-center">
            <h2 className="text-xl font-semibold  text-center leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-3xl">
              Step 2. Add a link to a job post
            </h2>
            <p className='text-sm italic'>We'll use this job to generate questions tailored to the job description.</p>
            {application ?
              <div className='flex gap-2 items-center justify-center'>
                <p>Application packet created!</p>
                <CheckCircleIcon className=' w-5 text-green-700' />
              </div>
              : <JobAppUploader
                userId={userId}
                userResume={resumeId}
                profileId={profileId}
                onboarding={true}
              />
            }
          </div>
        }
        {application &&
          <div className='flex flex-col max-w-3xl gap-4'>
            <h2 className="text-xl font-semibold  text-center leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-3xl">
              Step 3. Select interview type
            </h2>
            <div className='flex justify-center'>
              <DropdownMenu
                selectedItem={interviewType}
                items={interviewTypeOptions}
                onclickAction={handleSelectInterviewType}
                altTitle={"Interview Type"}
              />
            </div>
            <p className='text-sm italic'>We'll use this job to generate questions tailored to the job description.</p>
            <div className='flex justify-center'>
              <Button size='md' href={`/mockinterviews/${JSON.parse(application)}?type=${interviewType.id}`}>Start your Interview</Button>
            </div>
          </div>
        }
      </Container>
    </section>
  )
}
