import Image from 'next/image'

import Gallery01 from '/public/images/stock/gallery-01.jpg'
import Gallery02 from '/public/images/stock/gallery-02.jpg'
import Gallery03 from '/public/images/stock/gallery-03.jpg'
import Gallery04 from '/public/images/stock/gallery-04.jpg'
import Gallery05 from '/public/images/stock/gallery-05.jpg'
import Gallery06 from '/public/images/stock/gallery-06.jpg'
import Gallery07 from '/public/images/stock/gallery-07.jpg'
import { Container } from './Container'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-100 pt-16 sm:pt-24">
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

            <span>About Kyaria</span>
          </p>
          <h1 className="mt-5 text-center text-4xl font-semibold leading-snug text-slate-900 sm:mt-6 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0">
            We are a small and passionate team in San Francisco with the goal of streamlining the job search.
          </h1>
        </div>
      </Container>
      <div className="relative">
        <div className="absolute inset-0 flex flex-col" aria-hidden="true">
          <div className="flex-1 bg-slate-100" />
          <div className="w-full flex-1 bg-vanilla" />
          <div className="flex-1 bg-vanilla" />
        </div>
        <Container className="relative">
          <div className="mt-16 grid grid-cols-12 gap-3 sm:mt-24 lg:gap-5">
            <div className="col-span-6 flex flex-col gap-3 sm:col-span-4 lg:gap-5">
              <Image
                className="h-auto w-full object-cover object-center"
                src={Gallery01}
                alt="Gallery 01"
                sizes="(min-width: 1280px) 24.5rem, (min-width: 640px) 33.33vw, 50vw"
              />
              <Image
                className="ml-auto h-auto w-full object-cover object-center md:w-2/3"
                src={Gallery02}
                alt="Gallery 02"
                sizes="(min-width: 1280px) 16.33rem, (min-width: 768px) 22.22vw, (min-width: 640px) 33.33vw, 50vw"
              />
            </div>
            <div className="col-span-4 hidden flex-col gap-3 sm:flex md:col-span-2 lg:gap-5">
              <Image
                className="h-auto w-full object-cover object-center md:mt-12"
                src={Gallery03}
                alt="Gallery 03"
                sizes="(min-width: 1280px) 11.625rem, (min-width: 768px) 16.67vw, (min-width: 640px) 33.33vw, 0"
              />
              <Image
                className="ml-auto hidden h-auto w-full object-cover object-center md:block "
                src={Gallery04}
                alt="Gallery 04"
                sizes="(min-width: 1280px) 11.625rem, (min-width: 768px) 16.67vw, 0"
              />
            </div>
            <div className="col-span-6 flex flex-col gap-3 sm:col-span-4 lg:gap-5">
              <Image
                className="ml-auto h-auto w-full object-cover object-center md:w-1/2"
                src={Gallery06}
                alt="Gallery 06"
                sizes="(min-width: 1280px) 12.25rem, (min-width: 768px) 16.67vw, (min-width: 640px) 33.33vw, 50vw"
              />
              <Image
                className="h-full w-full object-cover object-center sm:h-auto"
                src={Gallery05}
                alt="Gallery 05"
                sizes="(min-width: 1280px) 24.5rem, (min-width: 640px) 33.33vw, 50vw"
              />
            </div>
            <div className="col-span-2 hidden flex-col gap-3 md:flex lg:gap-5">
              <Image
                className="mt-12 h-auto w-full object-cover object-center"
                src={Gallery07}
                alt="Gallery 07"
                sizes="(min-width: 1280px) 11.625rem, (min-width: 768px) 16.67vw, 0"
              />
            </div>
          </div>
        </Container>
        <div className="h-16 bg-vanilla sm:h-24"></div>
      </div>
    </section>
  )
}
