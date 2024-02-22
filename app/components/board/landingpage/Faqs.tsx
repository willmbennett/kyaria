'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { Disclosure, Transition } from '@headlessui/react'

import { Container } from '../../landingpage/Container'
import faqImage from '/public/images/stock/business-woman.jpg'

const faqs = [
  {
    question: "Can I paste a link from job sites like Indeed or LinkedIn?",
    answer: "Our service uses scraping, so the performance will depend on if the website is public and if the website blocks scrapers. LinkedIn especially will not work. Use the original job page links to ensure you get the most accurate information directly into your application."
  },
  {
    question: "What should I do if the job details don't import correctly?",
    answer: "If details don't import as expected, you can easily edit the job post to add important information. Our platform is designed to make editing straightforward, including the ability to copy and paste multiple bullet points at once."
  },
  {
    question: "How do I organize my job applications?",
    answer: "Our drag-and-drop interface lets you effortlessly organize your applications by status, from initial interest to accepted offers. This visual organization helps keep your job search structured and focused."
  },
  {
    question: "Can I customize the application materials for each job?",
    answer: "Absolutely! You can tailor your resume, cover letter, and elevator pitch for each job application, ensuring a personalized approach to your job search."
  },
  {
    question: "Is there a way to track my progress for each application?",
    answer: "Yes, our system allows you to track the progress of each application from start to finish. You can see at a glance where each application stands, helping you to manage follow-ups and interviews efficiently."
  },
  {
    question: "What happens to inactive applications?",
    answer: "Inactive applications can be marked as such and will be immediately hidden from your active view, helping you focus on current opportunities. They remain accessible for review or reactivation at any time."
  }
]



export function Faqs() {
  return (
    <section className="overflow-hidden bg-vanilla pb-64 md:pb-32 md:pt-24">
      <Container className="relative">
        <Image
          src={faqImage}
          className="absolute left-0 right-0 h-80 w-full object-cover object-center md:left-[unset] md:right-6 md:h-auto md:w-1/2 lg:right-8"
          alt="Frequently asked questions"
          sizes="(min-width: 1280px) 40rem, (min-width: 768px) 50vw, 100vw"
        />
        <div className="relative z-10 translate-y-48 md:w-4/5 md:translate-y-12 lg:w-2/3">
          <div className="border border-gray-secondary-400/60 bg-gray-secondary-50 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <h2 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
              Frequently asked questions
            </h2>
            <ul className="mt-12 space-y-8 divide-y divide-gray-secondary-400/75 sm:mt-16">
              {faqs.map((faq, index) => (
                <Disclosure
                  key={index}
                  as="li"
                  className={clsx(index > 0 && 'pt-8', '')}
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between">
                        <p className="text-left text-lg font-semibold text-slate-900 sm:text-xl">
                          {faq.question}
                        </p>
                        <span
                          className={clsx(
                            open
                              ? 'rotate-0 before:w-0'
                              : 'rotate-180 before:w-4 sm:before:w-[18px]',
                            "relative ml-4 flex h-4 w-4 duration-300 before:absolute before:bottom-1/2 before:h-0.5 before:-translate-y-1/2 before:rotate-90 before:bg-slate-800 before:transition-[width] before:content-[''] after:absolute after:bottom-1/2 after:h-0.5 after:w-4 after:-translate-y-1/2 after:bg-slate-800 after:content-[''] sm:h-[18px] sm:w-[18px] sm:after:w-[18px]",
                          )}
                        ></span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-1 pt-5 text-base leading-relaxed text-slate-700 sm:text-lg sm:leading-relaxed">
                          {faq.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
