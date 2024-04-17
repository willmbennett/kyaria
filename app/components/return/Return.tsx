import Image from 'next/image'

import { Container } from '../landingpage/Container'
import ctaImage1 from '/public/images/eve-1.jpg'
import { Button } from '../Button'

export function Return({ customerEmail }: { customerEmail: string }) {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28 lg:py-32">
      <Container className="relative items-center md:grid md:grid-cols-12 md:gap-12">

        <div className="mx-auto max-w-lg md:col-span-6 md:mx-0 lg:pr-12">
          <h2 className="text-center text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight md:text-left">
            Welcome to your Kyaria PRO plan!
          </h2>
          <p className="mt-6 text-center text-[17px] leading-relaxed text-slate-700 sm:text-lg sm:leading-relaxed md:text-left ">
            Enjoy access to our AI-powered virtual career coach Eve and all beta features.
            If you have any questions, please email <a href="mailto:contact@kyaria.ai">contact@kyaria.ai</a>.
          </p>
          <div className="mt-10 flex w-full justify-center md:justify-start">
            <Button href="/eve">Get Started</Button>
          </div>
        </div>
        <div className="col-span-6 hidden grid-cols-12 md:grid">
          <Image
            src={ctaImage1}
            className="col-span-7 h-auto w-full"
            alt="CTA image 1"
            sizes="(min-width: 1280px) 21.3rem, (min-width: 768px) 29.17vw, 0"
          />
        </div>
      </Container>
    </section>
  )
}
