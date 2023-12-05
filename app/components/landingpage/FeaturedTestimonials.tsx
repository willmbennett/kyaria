import clsx from 'clsx'
import Image from 'next/image'

import { Container } from './Container'
import podcastImage1 from '/public/images/stock/podcast-01.jpg'
import podcastImage2 from '/public/images/stock/podcast-02.jpg'

const testimonials = [
  {
    person: 'Theo Von',
    podcast: 'This Past Weekend',
    image: podcastImage1,
    quote:
      'Wavvy has taken the headache out of our podcast hosting, and allowed us to focus on what we love to do – record great content, and grow a loyal audience.',
  },
  {
    person: 'John Doe',
    podcast: 'The Fake Podcast',
    image: podcastImage2,
    quote:
      "I'm a podcast host, and Wavvy makes it so easy to upload and import our episodes. I also love the analytics I get, and the ease of communicating with listeners in the app!",
  },
]

export function FeaturedTestimonials() {
  return (
    <section className="overflow-hidden bg-amber-100 py-16 sm:py-24">
      <Container className="relative">
        <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="mx-auto max-w-2xl text-center text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
            Podcasters love to use our platform
          </h2>

          <div className="mt-16 space-y-20 sm:mt-20 lg:space-y-28">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.person}
                className="flex flex-col lg:flex-row "
              >
                <div
                  className={clsx(
                    index % 2 == 0 ? 'lg:order-1' : undefined,
                    'relative order-2 lg:mt-20 lg:w-1/2 lg:bg-gray-secondary-100',
                  )}
                >
                  <div
                    className={clsx(
                      index % 2 == 0 ? 'lg:left-[15%]' : 'lg:right-[15%]',
                      '-mt-24  w-full border border-gray-secondary-400/60 bg-gray-secondary-50/95 px-6 py-8 backdrop-blur-lg sm:p-8 lg:absolute lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:p-12 xl:p-14',
                    )}
                  >
                    <svg
                      className="h-8 w-8 transform text-purple-dark/60 sm:h-12 sm:w-12"
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
                    <p className="mt-6 text-lg leading-relaxed text-slate-700 sm:mt-8 sm:text-xl sm:leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="mt-10 flex items-center space-x-3 text-base sm:mt-16 sm:text-[17px]">
                      <span className="font-medium text-slate-900">
                        {testimonial.person}
                      </span>{' '}
                      <span className="font-bold text-purple-dark">/</span>{' '}
                      <span className="font-medium text-slate-500">
                        {testimonial.podcast}
                      </span>
                    </div>
                  </div>
                </div>
                <Image
                  src={testimonial.image}
                  alt={testimonial.person}
                  className={clsx(
                    index % 2 == 0 ? 'lg:order-2' : undefined,
                    'order-1 object-cover object-center lg:w-1/2',
                  )}
                  sizes="(min-width: 1280px) 38rem, (min-width: 1024px) calc(50vw - 2rem), (min-width: 768px) 42rem, (min-width: 640px) 36rem, calc(100vw - 2rem)"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
