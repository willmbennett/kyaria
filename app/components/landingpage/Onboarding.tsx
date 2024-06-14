'use client'
//import Avatar from '/public/images/avatars/avatar-will.jpg'
import { Container } from './Container'
import AuthButton from '../AuthButton'
import { ResumeUploadForm } from '../resumebuilder/new/ResumeUploadForm'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import JobAppUploader from '../../apps/new/components/JobAppUploader'

export default function HomeHero() {
  const resume = localStorage.getItem('onboardingResume')
  const application = localStorage.getItem('onboardingApplication')
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 xl:pt-32">
      <Container className='flex flex-col items-center justify-center gap-10'>
        <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl text-center xl:mx-0 xl:text-6xl">
          Let's add your first job application
        </h1>
        <div className="flex flex-col max-w-3xl gap-4 text-center">
          <h2 className="text-xl font-semibold  text-center leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-3xl">
            Step 1. Add your resume
          </h2>
          <p className='text-sm italic'>We'll use this resume to conduct realistic mock interviews, craft compelling elevator pitches, help you talk about your accomplishments, and more. </p>
          {resume ?
            <div className='flex gap-2 items-center justify-center'>
              <p>Resume created!</p>
              <CheckCircleIcon className=' w-5 text-green-700' />
            </div>
            : <ResumeUploadForm userId={'n/a'} autoSubmit={true} />
          }
        </div>
        {resume &&
          <div className="flex flex-col max-w-3xl gap-4 text-center">
            <h2 className="text-xl font-semibold  text-center leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-3xl">
              Step 2. Add a link to a job post
            </h2>
            <p className='text-sm italic'>We'll go ahead and fetch the post for you.</p>
            {application ?
              <div className='flex gap-2 items-center justify-center'>
                <p>Application packet created!</p>
                <CheckCircleIcon className=' w-5 text-green-700' />
              </div>
              : <JobAppUploader
                userId={'n/a'}
                userResume={JSON.parse(resume)}
              />
            }
          </div>
        }
        {application &&
          <div className='flex flex-col max-w-3xl gap-4'>
            <h2 className="text-xl font-semibold  text-center leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-3xl">
              Step 3. Sign in to checkout your packet!
            </h2>
            <div className='flex justify-center'>
              <AuthButton altText="Get Started" callbackUrl={`/apps/${JSON.parse(application)}`} />
            </div>
          </div>
        }
      </Container>
    </section>
  )
}
