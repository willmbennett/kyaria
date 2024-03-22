import Image from 'next/image'

import TeamImage from '/public/images/stock/team.jpg'
import { Container } from './Container'

export function StoryWithStats() {
  return (
    <section className="relative overflow-hidden bg-vanilla pb-[532px] pt-16 sm:pb-[500px] sm:pt-24 md:pb-64">
      <Container>
        <div className="flex flex-col sm:items-center">
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

            <span>Our story</span>
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-snug text-slate-900 sm:max-w-xl sm:text-center sm:text-5xl sm:leading-snug md:mx-auto xl:mx-0">
            Empowering jobseekers since 2023
          </h1>
        </div>
        <div className="mt-12 flex flex-col md:mt-8 md:flex-row md:divide-x md:divide-gray-secondary-400/60">
          <div className="md:w-1/2 md:py-8 md:pr-6 lg:pr-16">
            <p className="text-lg leading-relaxed text-slate-700">
              Will and James, friends and roommates from their college days, have always shared a passion for technology. After a decade of friendship, their paths converged once again. Will, having played a pivotal role in scaling Doximity from 200 to 800 employees leading up to its IPO as a product manager, decided to dive deeper into the realm of AI after completing a data science bootcamp. James, with 6 years under his belt as a product manager at Amazon, had garnered invaluable industry insights.
            </p>
            <p className="mt-8 text-lg leading-relaxed text-slate-700">
              Their shared history and professional journeys led to a powerful realization. They saw countless job seekers facing hurdles in the job search process, and not having the resources to overcome them. Recognizing the potential to combine James' industry expertise with Will's passion for cutting-edge technology, they created Kyaria.ai.
            </p>
          </div>
          <div className="mt-8 sm:mt-0 md:w-1/2 md:py-8 md:pl-6 lg:pl-16">
            <p className="text-lg leading-relaxed text-slate-700">
              Their vision was clear: offer a holistic approach to job hunting that was unmatched in its dedication to job seekers. By leveraging advanced technology and tried-and-true industry wisdom, Kyaria.ai stands as a beacon for those aiming to navigate the complex world of tech job searches. Kyaria.ai is committed to ensuring that the next generation of tech enthusiasts finds their perfect role with ease.
            </p>
          </div>
        </div>
        {/*
        <div className="relative mt-16 sm:mt-20">
          <div className="aspect-video">
            <Image
              className="h-full w-full object-cover object-center"
              src={TeamImage}
              alt="Team"
              sizes="(min-width: 1280px) 76rem, 100vw"
            />
          </div>
          <div className="absolute left-6 right-6 top-full flex max-w-4xl -translate-y-12 flex-col divide-y divide-gray-secondary-400/60 bg-amber-100 px-10 py-10 md:-bottom-1/4 md:left-[unset] md:right-0 md:top-[unset] md:w-full md:flex-row md:divide-x md:divide-y-0 md:px-8 lg:p-12">
            <div className="pb-10 md:w-1/3 md:pb-0 md:pr-10 lg:pr-12">
              <p className="text-center text-4xl font-semibold text-slate-900 lg:text-5xl">
                10+
              </p>
              <p className="mt-4 text-center text-md leading-snug text-slate-600">
                Years working on empowering podcasters
              </p>
            </div>
            <div className="py-10 md:w-1/3 md:px-10 md:py-0 lg:px-12">
              <p className="text-center text-4xl font-semibold text-slate-900 lg:text-5xl">
                $1.5M
              </p>
              <p className="mt-4 text-center text-md leading-snug text-slate-600">
                Capital raised by our investors
              </p>
            </div>
            <div className="pt-10 md:w-1/3 md:pl-10 md:pt-0 lg:pl-12">
              <p className="text-center text-4xl font-semibold text-slate-900 lg:text-5xl">
                120+
              </p>
              <p className="mt-4 text-center text-md leading-snug text-slate-600">
                Team members working on Wavy
              </p>
            </div>
          </div>
        </div>
  */}
      </Container>
    </section>
  )
}
