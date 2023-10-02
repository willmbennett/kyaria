'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import Podcast01 from '/public/images/podcasts/podcast-01.jpeg'
import Podcast02 from '/public/images/podcasts/podcast-02.jpeg'
import Podcast03 from '/public/images/podcasts/podcast-03.jpeg'
import Podcast04 from '/public/images/podcasts/podcast-04.png'
import Podcast05 from '/public/images/podcasts/podcast-05.jpeg'
import Podcast06 from '/public/images/podcasts/podcast-06.png'
import Podcast07 from '/public/images/podcasts/podcast-07.jpeg'
import Podcast08 from '/public/images/podcasts/podcast-08.jpeg'
import Podcast09 from '/public/images/podcasts/podcast-09.jpeg'
import Podcast10 from '/public/images/podcasts/podcast-10.jpeg'
import Podcast11 from '/public/images/podcasts/podcast-11.jpeg'
import Podcast12 from '/public/images/podcasts/podcast-12.jpeg'
import Podcast13 from '/public/images/podcasts/podcast-13.jpeg'
import Podcast14 from '/public/images/podcasts/podcast-14.jpeg'

const testimonials = [
  [
    {
      person: 'Tim Ferriss',
      podcast: 'The Tim Ferriss Show',
      image: Podcast01,
      quote:
        'We took our time to evaluate various options before choosing Wavvy, and we are SO glad that we did. The features are easy to use, and their customer service team is friendly and helpful! We highly recommend them for podcast hosting.',
    },
    {
      person: 'Lex Fridman',
      podcast: 'Lex Fridman Podcast',
      image: Podcast02,
      quote:
        "We're a rapidly growing podcast, and need a reliable podcast host that can scale with us. Wavvy's speed, ease of use, and flexibility have allowed us to grow our audience more quickly than ever before. We love Wavvy, and would recommend it to any podcaster out there.",
    },
  ],
  [
    {
      person: 'Eric Weinstein',
      podcast: 'The Portal',
      image: Podcast03,
      quote:
        "We have been really happy with Wavvy's customer service, and the pricing is competitive with other podcast hosting companies. This is a great service for anyone looking to host a podcast or audio blog.",
    },
    {
      person: 'Joe Rogan',
      podcast: 'The Joe Rogan Experience',
      image: Podcast04,
      quote:
        "Wavvy is a great tool for podcasters. It's easy to use, and the support team is quick to respond. I would recommend Wavvy to anyone looking to host their podcast.",
    },
  ],
  [
    {
      person: 'Cal Newport',
      podcast: 'Deep Questions with Cal Newport',
      image: Podcast05,
      quote:
        'Wavvy has been very helpful in our podcasting endeavors. They take care of all the backend hosting, which leaves us free to focus on growing our audience and creating great content.',
    },
    {
      person: 'Jocko Willink',
      podcast: 'Jocko Podcast',
      image: Podcast06,
      quote:
        'I have to say, the Wavvy team is so easy to work with, and every time I have an issue, I get a response within minutes. This is for real, folks. They are hands down the best podcast host out there.',
    },
  ],
  [
    {
      person: 'Sam Parr',
      podcast: 'My First Million',
      image: Podcast07,
      quote:
        "We're thrilled to have Wavvy as a podcast partner. They have an amazing service, and have helped us grow our business and become more successful.",
    },
    {
      person: 'Duncan Trussell',
      podcast: 'Duncan Trussell Family Hour',
      image: Podcast08,
      quote:
        "Wavvy's pricing and features are a no brainer, especially for podcasters. I can't recommend it enough. If you're looking for podcast hosting, look no further.",
    },
  ],
  [
    {
      person: 'Benjamin Grundy',
      podcast: 'Mysterious Universe',
      image: Podcast09,
      quote:
        "Wavvy is a great choice for podcasters of any level. The interface is intuitive, and you can easily keep track of the stats. If you're looking for a podcast hosting service, give Wavvy a try.",
    },
    {
      person: 'Arvid Kahl',
      podcast: 'The Bootstrapped Founder',
      image: Podcast10,
      quote: 'I would recommend Wavvy to any podcaster just starting out.',
    },
  ],
  [
    {
      person: 'Dr. Andrew Huberman',
      podcast: 'Huberman Lab',
      image: Podcast11,
      quote:
        "The Wavvy team is extremely helpful in every aspect of their offering. They are quick to answer questions, and they continually make improvements based on user feedback. If you're looking to start a podcast, I would trust no one else than Wavvy to host it.",
    },
    {
      person: 'Stephen West',
      podcast: 'Philosophize This!',
      image: Podcast12,
      quote:
        "We've found Wavvy to be a reliable and capable podcast host. In fact, we're using it right now to power our own podcast. We've been able to grow our audience with Wavvy's helpful marketing tools.",
    },
  ],
  [
    {
      person: 'Krystal Ball',
      podcast: 'Breaking Points',
      image: Podcast13,
      quote:
        "I can't recommend Wavvy highly enough. It's the best podcast hosting platform out there, and it's perfect for podcasters. It's easy to use, easy to navigate, and has a ton of helpful features.",
    },
    {
      person: 'Michael Bisping',
      podcast: 'Believe You Me',
      image: Podcast14,
      quote:
        "We've been using Wavvy for a few months, now, and it's been a great experience. The support team is fantastic. The integration with Spotify is simple. And the pricing is absolutely unbeatable.",
    },
  ],
]

export function TestimonialsSlide() {
  useEffect(() => {
    if (
      (navigator.userAgent.indexOf('Opera') ||
        navigator.userAgent.indexOf('OPR')) != -1
    ) {
      return
    } else if (navigator.userAgent.indexOf('Edg') != -1) {
      return
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
      return
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
      // There is an issue with safari not lazy loading off-screen images that come into view with CSS animations. Hence, we make sure to eager load these images.
      document.querySelectorAll('.podcast-image').forEach((img) => {
        img.loading = 'eager'
      })
    }
  }, [])

  return (
    <section className="overflow-hidden py-16 sm:py-24 lg:py-28">
      <h2 className="mx-auto max-w-xl px-4 text-center text-4xl font-semibold leading-tight text-slate-900 sm:max-w-2xl sm:px-6 sm:text-5xl sm:leading-tight lg:px-8">
        See what podcasters have to say about us
      </h2>
      <div className="relative mt-20">
        <div className="flex w-max animate-infiniteScroll items-center gap-6 px-12 sm:gap-8 lg:gap-12">
          {[...Array(2)].map((_, index) => (
            <div
              key={`testimonials-row-${index}`}
              className="flex w-1/2 justify-around gap-6 sm:gap-8 lg:gap-12"
            >
              {testimonials.map((testimonialGroup, groupIndex) => (
                <div
                  key={`testimonial-group-${index}-${groupIndex}`}
                  className="w-full space-y-6 sm:space-y-8"
                >
                  {testimonialGroup.map((testimonial) => (
                    <div
                      key={`${testimonial.person}-${index}`}
                      className="w-80 border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-8 sm:w-96 sm:p-8 lg:w-[512px] lg:p-10"
                    >
                      <div className="flex ">
                        <div className="h-12 w-12 shrink-0 bg-gray-secondary-100 lg:h-14 lg:w-14">
                          <Image
                            className="podcast-image h-full w-full object-cover object-center"
                            width={56}
                            height={56}
                            src={testimonial.image}
                            alt={testimonial.person}
                            sizes="(min-width: 1024px) 3rem, 3.5rem"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-md font-medium text-slate-900 lg:text-lg">
                            {testimonial.person}
                          </p>

                          <p className="text-slate-600/90 sm:text-md lg:text-lg">
                            {testimonial.podcast}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <svg
                          className="absolute -left-3 -top-3 z-0 h-10 w-10 transform text-purple-dark/20 sm:-left-4 sm:-top-4 sm:h-12 sm:w-12 lg:-left-6 lg:-top-6 lg:h-16 lg:w-16"
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
                        <p className="relative z-10 mt-8 text-md leading-relaxed text-slate-700 lg:mt-10 lg:text-lg">
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
