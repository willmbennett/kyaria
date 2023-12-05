import { PricingCards } from '../components/landingpage/PricingCards'
import { PlanFeatures } from '../components/landingpage/PlanFeatures'
import { FeaturedTestimonials } from '../components/landingpage/FeaturedTestimonials'
import { PlansTable } from '../components/landingpage/PlansTable'
import { Faqs } from '../components/landingpage/Faqs'
import { CallToAction } from '../components/landingpage/CallToAction'

export const metadata = {
  title: 'Wavvy - Pricing',
  description: 'Get our fully featured bundle for only $39 a month.',
}

export default function PricingPage() {
  return (
    <>
      <PricingCards />
      <PlanFeatures />
      <FeaturedTestimonials />
      <PlansTable />
      <Faqs />
      <CallToAction />
    </>
  )
}
