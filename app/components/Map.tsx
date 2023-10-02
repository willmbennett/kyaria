import Image from 'next/image'

import MapImage from '/public/images/map.png'
import { Button } from './Button'
import { Container } from './Container'

export function Map() {
  return (
    <section className="relative bg-vanilla py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="flex flex-col items-center lg:items-start">
            <p className="flex items-center space-x-3.5 text-xl font-medium text-amber-900/70">
              <svg
                className=""
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

              <span>Our office</span>
            </p>
            <h1 className="mt-3 text-center text-4xl font-semibold leading-snug text-slate-900 sm:mt-4 sm:max-w-xl sm:text-[40px] sm:leading-snug md:mx-auto lg:mx-0 lg:text-left">
              Come and visit us
            </h1>
          </div>

          <div className="relative mt-12 sm:mt-16 lg:mt-20">
            <Image
              src={MapImage}
              alt="Map"
              className="h-auto object-cover object-center lg:w-5/6"
              sizes="(min-width: 1280px) 63.33rem, (min-width: 1024px) 83.33vw, (min-width: 768px) 42rem, (min-width: 640px) 36rem, calc(100vw - 2rem)"
            />
            <div className="flex flex-col border border-gray-secondary-400/60 bg-gray-secondary-50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:absolute lg:right-0 lg:top-1/2 lg:w-1/3 lg:-translate-y-1/2 lg:flex-col lg:items-start">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Wavy Offices
                </h3>
                <p className="mt-5 leading-relaxed text-slate-700">
                  4974 Duck Creek Road <br />
                  San Francisco, CA 94108
                </p>
              </div>

              <Button
                href="#"
                className="mt-8 w-auto sm:mt-0 lg:mt-8"
                size="md"
                variant="ghost"
              >
                View on Google Maps
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
