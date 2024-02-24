import Image from 'next/image'

import { Container } from '../../landingpage/Container'
import AuthButton from '../../AuthButton'
import processImage from '/public/images/stock/interview.jpg'

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-slate-700 pt-24 lg:py-24">
      <Container>
        <div className="relative z-10 mx-auto w-full max-w-lg sm:max-w-xl lg:mx-0">
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            How Our Application Tracker Works
          </h2>
          <div className="mt-12 space-y-8 divide-y divide-gray-secondary-400/90 sm:mt-16">
            <div className="flex items-center space-x-10">
              <span className="text-4xl font-semibold text-white">01</span>
              <span className="text-xl leading-snug text-slate-50">
                Select which resume you want to use for this application.
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">02</span>
              <span className="text-xl leading-snug text-slate-50">
                Add a link to the job application you want to add.
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">03</span>
              <span className="text-xl leading-snug text-slate-50">
                We'll create a new application packet and add it to the tracker.
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">04</span>
              <span className="text-xl leading-snug text-slate-50">
                You can then manage the state of the application as needed.
              </span>
            </div>
          </div>
          <AuthButton
            variant="ghost"
            color="light"
            className="mt-16 sm:mt-20"
            altText="Get started"
          />
        </div>
      </Container>
      <div className="relative mt-16 h-80 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-5/12">
        <Image
          src={processImage}
          className="h-full w-full object-cover object-right-top"
          alt="A person holding a microphone"
          sizes="(min-width: 1024px) 41.66vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700 to-white/0 lg:bg-gradient-to-r"></div>
      </div>
    </section>
  )
}
