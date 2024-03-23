import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

//import Avatar from '/public/images/avatars/avatar-will.jpg'
import homeHeroImg from '/public/images/stock/job-interview2.jpg'
import { Container } from './Container'
import AuthButton from '../AuthButton'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 xl:pt-32">
      <Container>
        <div className="mx-auto max-w-lg pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-xl xl:pb-14">
          <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-6xl xl:leading-tighter">
            Revolutionize your job hunt with Kyaria.ai
          </h1>
          <ul className="mt-6 flex flex-col space-y-4 md:mx-auto md:mt-8 md:max-w-3xl md:flex-row md:space-x-2 md:space-y-0 lg:space-x-4 xl:mx-0 xl:flex-col xl:space-x-0 xl:space-y-4">

            <li className="flex items-center md:items-start xl:items-center">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
              <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                Introducing Eve: Your AI-Powered Career Coach, ready to guide your journey.
              </p>
            </li>
            <li className="flex items-center md:items-start xl:items-center">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
              <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                Create standout resumes with our AI-driven builder, optimized for ATS compatibility.
              </p>
            </li>
            <li className="flex items-center md:items-start xl:items-center">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
              <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                Secure your dream job with tailored application packets, crafted just for you.
              </p>
            </li>
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-5 md:mt-12 md:justify-center xl:justify-start">
            <AuthButton altText="Get Started" />
          </div>
          <p className="mt-4 flex text-md text-slate-600/90 md:justify-center xl:justify-start xl:text-base">
            Eve is included with Kyaria.ai Pro, only $10 per month.
          </p>
        </div>
      </Container>

      <div className="bg-gradient-to-r from-white via-slate-100 to-slate-200">
        <Container className="relative">
          <div className="mx-auto max-w-lg pb-8 pl-4 pt-20 md:mx-0 md:max-w-md lg:max-w-lg lg:pb-16 lg:pt-28 xl:max-w-xl xl:py-12 xl:pl-14 2xl:pl-0">
            <blockquote>
              <div className="relative leading-relaxed text-slate-700 xl:text-lg">
                <svg
                  className="absolute -top-12 left-0 h-8 w-8 transform text-gray-secondary-200 xl:-left-5 xl:top-0 xl:-translate-x-full xl:-translate-y-2"
                  height="48"
                  width="48"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M21.66145,33.81676c0,4.29661-3.96109,8.22346-8.91304,8.22346C4.56585,42.04022,1,35.98671,1,27.90615 c0-9.27484,9.34862-18.21943,17.83035-21.94637l2.26574,3.64916C14.10766,12.9954,8.88433,17.58691,8.14413,25.28492h2.89106 c3.09587,0,6.31198,0.4991,8.45903,2.72402C21.02498,29.59761,21.66145,31.62025,21.66145,33.81676z M47,33.81676 c0,4.29661-3.96109,8.22346-8.91304,8.22346c-8.18256,0-11.74842-6.05352-11.74842-14.13408 c0-9.27484,9.34862-18.21943,17.83035-21.94637l2.26574,3.64916c-6.98843,3.38646-12.21176,7.97797-12.95195,15.67598 c3.15316,0,5.76908-0.11425,8.09925,0.71955C45.21084,27.30299,47,30.10812,47,33.81676z"
                      fill="currentColor"
                    />
                  </g>
                </svg>

                <p className="relative">
                  My resume was DOA for years. Mostly because resume writing was such a pain, it was hard to know where to start. Kyaria made it so easy to get my resume back in shape. I didn't have to worry about not knowing keywords, phrases, or metrics recruiters are optimizing for, because Kyaria would either synthesize them for me or remind me. Cheers to never having an outdated resume again!
                </p>
              </div>
              <div className="mt-7 flex items-center">
                <div className="h-14 w-14 rounded-full bg-gray-secondary-100">
                  <Image
                    className="h-full w-full rounded-full object-cover object-center"
                    width={56}
                    height={56}
                    src='https://res.cloudinary.com/kyaria/image/upload/c_thumb,g_face,w_200/v1706748948/facebook_profile_cmjkp1.jpg'
                    alt="Home Hero Testimonial"
                    sizes="3.5rem"
                  />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-slate-900">Jessica Fan</p>

                  <p className="font-medium text-slate-500">
                    Senior Software Engineer at Google
                  </p>
                </div>
              </div>
            </blockquote>
          </div>
          <div className="absolute bottom-0 right-6 hidden w-1/3 bg-gray-secondary-100 md:block lg:right-12 xl:-right-0 xl:w-full xl:max-w-xl 2xl:-right-32 2xl:max-w-[640px]">
            <Image
              src={homeHeroImg}
              className="h-auto w-full object-cover"
              priority
              alt="Podcaster recording a podcast with Wavvy"
              sizes="(min-width: 1536px) 40rem, (min-width: 1280px) 36rem, (min-width: 768px) 33.33vw, 0"
            />
          </div>
        </Container>
      </div>
    </section>
  )
}
