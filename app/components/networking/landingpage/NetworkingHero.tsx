import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

import homeHeroImg from '/public/images/stock/job-interview2.jpg'
import AuthButton from '../../AuthButton'
import { Container } from '../../landingpage/Container'
import { Button } from '../../Button'

export function NetworkingHero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 xl:pt-32">
      <Container>
        <div className="mx-auto max-w-lg pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-xl xl:pb-14">
          <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-6xl xl:leading-tighter">
            Coming soon: An AI Networking Revolution
          </h1>
          <ul className="mt-6 flex flex-col space-y-4 md:mx-auto md:mt-8 md:max-w-3xl md:flex-row md:space-x-2 md:space-y-0 lg:space-x-4 xl:mx-0 xl:flex-col xl:space-x-0 xl:space-y-4">
            <li className="flex items-center md:items-start xl:items-center">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
              <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                Discover the power of AI to identify the <span className="font-medium text-slate-900">key connections</span> that can transform your career.
              </p>
            </li>
            <li className="flex items-center md:items-start xl:items-center">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
              <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                Seamless introductions made easy. We handle the outreach so you can focus on what matters - <span className="font-medium text-slate-900">building relationships.</span>
              </p>
            </li>
            <li className="flex items-center md:items-start xl:items-center">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
              <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                Tailored for your success. Our AI customizes each interaction based on your unique <span className="font-medium text-slate-900">professional goals.</span>
              </p>
            </li>
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-5 md:mt-12 md:justify-center xl:justify-start">
            {/*<AuthButton altText="Get Started" />*/}
            <Button
              href='https://forms.gle/S2fkwkxy6bquxnmC6'
            >
              Get Notified
            </Button>
          </div>
          {/*
          <p className="mt-4 flex text-md text-slate-600/90 md:justify-center xl:justify-start xl:text-base">
            Subscription to Kyaria.ai Pro required, only $10 per month.
          </p>
           */}
        </div>
      </Container>

      <div className="bg-gradient-to-r from-white via-slate-100 to-slate-200">
        <Container className="relative">
          <div className="mx-auto max-w-lg pb-8 pl-4 pt-20 md:mx-0 md:max-w-md lg:max-w-lg lg:pb-16 lg:pt-28 xl:max-w-xl xl:py-12 xl:pl-14 2xl:pl-0">
            {/* Testimonial or additional content can go here */}
          </div>
          <div className="absolute bottom-0 right-6 hidden w-1/3 bg-gray-secondary-100 md:block lg:right-12 xl:-right-0 xl:w-full xl:max-w-xl 2xl:-right-32 2xl:max-w-[640px]">
            <Image
              src={homeHeroImg}
              className="h-auto w-full object-cover"
              priority
              alt="Make meaningful connections with Kyaria.ai"
              sizes="(min-width: 1536px) 40rem, (min-width: 1280px) 36rem, (min-width: 768px) 33.33vw, 0"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
