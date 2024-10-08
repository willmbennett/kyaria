import Image from 'next/image'

import { Container } from './Container'
import featureImage1 from '/public/images/stock/interview-meeting.jpg'
import featureImage2 from '/public/images/stock/student-laptop.jpg'
import AuthButton from '../AuthButton'

export default function FeatureBlocks() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-24">
      <Container>
        <div className="relative mx-auto w-full max-w-lg sm:max-w-xl lg:mx-0 lg:max-w-none">
          <div className="left-0 top-1/2 z-10 w-full lg:absolute lg:w-1/2 lg:-translate-y-1/2">
            <Image
              src={featureImage1}
              className="h-auto w-full"
              alt="Feature 1"
              sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 50vw, (min-width: 640px) 36rem, calc(100vw - 2rem)"
            />
            <div className="absolute right-0 top-0 w-64 -translate-y-24 bg-gray-secondary-100/95 p-6 backdrop-blur-sm sm:py-7 lg:bottom-0 lg:left-0 lg:top-[unset] lg:translate-y-24 2xl:-translate-x-16">
              <p className="text-4xl font-semibold text-slate-900 xl:text-5xl">
                280
              </p>
              <p className="mt-5 text-slate-700">
                Applications Created
              </p>
            </div>
          </div>
          <div className="w-full border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-10 sm:p-14 lg:ml-auto lg:w-7/12 lg:py-32 lg:pl-28 xl:pl-36 xl:pr-20">
            <h2 className="text-4xl font-semibold leading-tight text-slate-900 xl:text-5xl xl:leading-tight">
              Organize your job search
            </h2>
            <p className="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8">
              Use our kanban board to organize all your job applications. You'll never have to use spreadsheets or local file storage again.
            </p>
            <AuthButton variant="ghost" size="md" className="mt-10 sm:mt-12" altText='Get started' callbackUrl='/board' />
          </div>
        </div>

        <div className="relative mx-auto mt-48 w-full max-w-lg sm:max-w-xl lg:mx-0 lg:mt-32 lg:max-w-none">
          <div className="right-0 top-1/2 z-10 w-full lg:absolute lg:w-1/2 lg:-translate-y-1/2">
            <Image
              src={featureImage2}
              className="h-auto w-full"
              alt="Feature 2"
              sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 50vw, (min-width: 640px) 36rem, calc(100vw - 2rem)"
            />
            <div className="absolute left-0 top-0 w-64 -translate-y-24 bg-gray-secondary-100/95 p-6 backdrop-blur-sm sm:py-7 lg:bottom-0 lg:left-[unset] lg:right-0 lg:top-[unset] lg:translate-y-24 2xl:translate-x-16">
              <p className="text-4xl font-semibold text-slate-900 xl:text-5xl">
                {285}
              </p>
              <p className="mt-5 text-slate-700">
                Resumes Created
              </p>
            </div>
          </div>
          <div className="w-full border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-10 sm:p-14 lg:w-7/12 lg:py-32 lg:pr-28 xl:pl-16 xl:pr-36 ">
            <h2 className="text-4xl font-semibold leading-tight text-slate-900 xl:text-5xl xl:leading-tight">
              Create a ATS approved resume
            </h2>
            <p className="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8">
              Use our AI-powered resume builder to craft the perfect resume. Upload your own or use one of our templates to get started.
            </p>
            <AuthButton variant="ghost" size="md" className="mt-10 sm:mt-12" altText='Get started' callbackUrl='/resumebuilder/new' />
          </div>
        </div>
      </Container>
    </section>
  )
}
