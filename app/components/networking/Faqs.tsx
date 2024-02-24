'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { Disclosure, Transition } from '@headlessui/react'
import faqImage from '/public/images/stock/business-woman.jpg'
import { Container } from '../landingpage/Container'

const faqs = [
  {
    question: 'Do I need a resume to get started?',
    answer:
      'Nope, you can start with a template.',
  },
  {
    question: 'What is your pricing like?',
    answer:
      "Kyaria.ai's Pro plan costs $10 per month, which gives you access to the resume builder and all features still in beta.",
  },
  {
    question: 'How do I know my AI-generated results are good.',
    answer:
      'Results are built upon prompts and templates provided by experienced industry professionals. However, it is still possible to get results that you are not happy with. If that happens, you can regenerate a response or copy and paste to a text editor of your choice to refine further.',
  },
  {
    question: 'What do you mean when you say you leverage AI?',
    answer:
      'We utilize ChatGPT to generate text data, we provide custom prompts and necessary data to generate the best possible outcomes.',
  },
]

export default function Faqs() {
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
