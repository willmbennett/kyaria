import Image from 'next/image'

import { Container } from './Container'
import ctaImage1 from '/public/images/stock/job-interview2.jpg'
import ctaImage2 from '/public/images/stock/entrepreneurship-3822492_1280.jpg'
import AuthButton from '../AuthButton'

export default function CallToAction() {
  return (
    <section className="overflow-hidden py-20 md:py-28 lg:py-32">
      <Container className="relative items-center md:grid md:grid-cols-12 md:gap-12">
        <div className="mx-auto max-w-lg md:col-span-6 md:mx-0 lg:pr-12">
          <h2 className="text-center text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight md:text-left">
            Kickstart Your Career with Kyaria.ai
          </h2>
          <p className="mt-6 text-center text-[17px] leading-relaxed text-slate-700 sm:text-lg sm:leading-relaxed md:text-left ">
            Say goodbye to the hassle of drafting cover letters and resumes from scratch. With Kyaria.ai, our AI-powered Career Coach, Eve, guides you through creating standout resumes, preps you for interviews, and offers personalized advice. Plus, keep your job search organized and on track with our intuitive Kanban tracker. Start your journey towards landing your dream job with confidence and ease.
          </p>

          <div className="mt-10 flex w-full justify-center md:justify-start">
            <AuthButton />
          </div>
        </div>
        <div className="col-span-6 hidden grid-cols-12 md:grid">
          <Image
            src={ctaImage2}
            className="col-span-5 my-auto ml-px h-auto w-full"
            alt="CTA image 2"
            sizes="(min-width: 1280px) 15.25rem, (min-width: 768px) 20.83vw, 0"
          />
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
