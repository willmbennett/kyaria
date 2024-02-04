import Image from 'next/image'

import processImage from '/public/images/stock/interview.jpg'
import AuthButton from '../AuthButton'
import { Container } from '../landingpage/Container'
import { Button } from '../Button'

export function Process() {
  return (
    <section className="relative overflow-hidden bg-slate-700 pt-24 lg:py-24">
      <Container>
        <div className="relative z-10 mx-auto w-full max-w-lg sm:max-w-xl lg:mx-0">
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            How Kyaria.ai works
          </h2>
          <div className="mt-12 space-y-8 divide-y divide-gray-secondary-400/90 sm:mt-16">
            <div className="flex items-center space-x-10">
              <span className="text-4xl font-semibold text-white">01</span>
              <span className="text-xl leading-snug text-slate-50">
                Add your information
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">02</span>
              <span className="text-xl leading-snug text-slate-50">
                Select what you're tring to achieve
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">03</span>
              <span className="text-xl leading-snug text-slate-50">
                We'll automatically network for you.
              </span>
            </div>
          </div>
          {/*<AuthButton variant="ghost" color="light" className="mt-16 sm:mt-20" altText='Get started' />*/}
          <Button
            variant="ghost"
            color="light"
            className="mt-16 sm:mt-20"
            href='https://forms.gle/S2fkwkxy6bquxnmC6'
          >
            Get Notified
          </Button>
        </div>
      </Container>
      <div className="relative mt-16 h-80 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-5/12">
        <Image
          src={processImage}
          className="h-full w-full object-cover object-right-top"
          alt="A person holding a microphone"
          sizes="(min-width: 1024px) 41.66vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700 to-white/0 lg:bg-gradient-to-r"></div>
      </div>
    </section>
  )
}
