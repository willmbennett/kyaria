import { PricingCards } from '../components/PricingCards'
import { PlanFeatures } from '../components/PlanFeatures'
import { FeaturedTestimonials } from '../components/FeaturedTestimonials'
import { PlansTable } from '../components/PlansTable'
import { Faqs } from '../components/Faqs'
import { CallToAction } from '../components/CallToAction'

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
