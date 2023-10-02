import Image from 'next/image'

import { Container } from './Container'
import { Button } from './Button'
import featureImage1 from '/public/images/stock/interview-meeting.jpg'
import featureImage2 from '/public/images/stock/student-laptop.jpg'

export function FeatureBlocks() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-32 lg:pb-28 lg:pt-24">
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
                Unlimited
              </p>
              <p className="mt-5 text-slate-700">
                Resumes, cover letters, emails,
                stories.
              </p>
            </div>
          </div>
          <div className="w-full border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-10 sm:p-14 lg:ml-auto lg:w-7/12 lg:py-32 lg:pl-28 xl:pl-36 xl:pr-20">
            <h2 className="text-4xl font-semibold leading-tight text-slate-900 xl:text-5xl xl:leading-tight">
              Never worry about writing for your job search again
            </h2>
            <p className="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8">
              None of this "limited to 10 resumes", our products are unlimited and free.
              Why? Because we're job-seekers first. Our mission is to help you land the 
              job of your dreams and we're not going to stop till you've made it.
            </p>
            <Button
              href="/auth/signin"
              variant="ghost"
              size="md"
              className="mt-10 sm:mt-12"
            >
              Get started
            </Button>
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
                1
              </p>
              <p className="mt-5 text-slate-700">
                Time setup
              </p>
            </div>
          </div>
          <div className="w-full border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-10 sm:p-14 lg:w-7/12 lg:py-32 lg:pr-28 xl:pl-16 xl:pr-36 ">
            <h2 className="text-4xl font-semibold leading-tight text-slate-900 xl:text-5xl xl:leading-tight">
              Quick and easy setup, endless value
            </h2>
            <p className="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8">
              After a simple automated profile setup, you'll be able to immediatly
              jump to streamlining your job search. Simply add jobs that you're interested in
              and we'll provide you a customized comprehensive packet of everything you need to succeed.
            </p>
            <Button
              href="/auth/signup"
              variant="ghost"
              size="md"
              className="mt-10 sm:mt-12"
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
