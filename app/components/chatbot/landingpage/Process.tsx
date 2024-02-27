import Image from 'next/image'

import { Container } from '../../landingpage/Container'
import AuthButton from '../../AuthButton'
import processImage from '/public/images/stock/interview.jpg'

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-slate-700 pt-24 lg:py-24">
      <Container>
        <div className="relative z-10 mx-auto w-full max-w-lg sm:max-w-xl lg:mx-0">
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            Why Choose a Virtual Career Coach?
          </h2>
          <div className="mt-12 space-y-8 divide-y divide-gray-secondary-400/90 sm:mt-16">
            <div className="flex items-center space-x-10">
              <span className="text-4xl font-semibold text-white">01</span>
              <span className="text-xl leading-snug text-slate-50">
                Affordable Access: Enjoy premium career coaching services for just $10 a month, making professional guidance accessible to everyone.
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">02</span>
              <span className="text-xl leading-snug text-slate-50">
                Always Available: Your virtual career coach is here for you 24/7, ready to offer support and advice whenever you need it, with no off days or holidays.
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">03</span>
              <span className="text-xl leading-snug text-slate-50">
                Intelligent and Informed: Leveraging the latest in AI technology, Eve provides instant access to the most up-to-date job listings, career advice, and market trends, tailoring guidance to your specific needs and goals.
              </span>
            </div>
            <div className="flex items-center space-x-10 pt-8">
              <span className="text-4xl font-semibold text-white">04</span>
              <span className="text-xl leading-snug text-slate-50">
                Privacy Guaranteed: With total anonymity, your sessions with Eve are a safe space for exploration and personal growth. Your privacy and trust are our top priority, ensuring a judgment-free coaching experience.
              </span>
            </div>
          </div>
          <AuthButton
            variant="ghost"
            color="light"
            className="mt-16 sm:mt-20"
            altText="Start chatting"
          />
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
