'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { Disclosure, Transition } from '@headlessui/react'

import { Container } from '../../landingpage/Container'
import faqImage from '/public/images/stock/business-woman.jpg'

const faqs = [
  {
    question: 'Is a resume required to begin using your services?',
    answer: 'Not at all! You can easily get started using our intuitive templates. These templates are designed to guide you through creating a professional resume, even if you\'re starting from scratch.'
  },
  {
    question: 'Could you explain the pricing structure for Kyaria.ai?',
    answer: 'Sure! Kyaria.ai offers a Pro plan at a monthly rate of $10. This plan provides full access to our advanced resume builder and exclusive features that are currently in beta, ensuring you have the most comprehensive tools at your disposal.'
  },
  {
    question: 'How compatible are your resumes with Application Tracking Systems (ATS)?',
    answer: 'Our resumes are meticulously crafted to be ATS-friendly. They are designed by industry experts using templates that have undergone rigorous testing with Textkernel, a prominent resume parsing system. This ensures high compatibility with ATS, maximizing your resume\'s visibility in job applications.'
  },
  {
    question: 'What does "AI-powered" mean in the context of your services?',
    answer: 'By "AI-powered," we refer to our use of the latest technology, ChatGPT 4.0-turbo, equipped with custom prompts. This advanced AI assists you in refining key resume elements like summaries, skills, and bullet points, ensuring a high level of quality and effectiveness in your job applications.'
  }
];


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
