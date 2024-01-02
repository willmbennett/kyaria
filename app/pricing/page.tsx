import { PricingCards } from '../components/landingpage/PricingCards'
import { PlanFeatures } from '../components/landingpage/PlanFeatures'
import { FeaturedTestimonials } from '../components/landingpage/FeaturedTestimonials'
import { PlansTable } from '../components/landingpage/PlansTable'
import { Faqs } from '../components/landingpage/Faqs'
import { CallToAction } from '../components/landingpage/CallToAction'
import { checkSubscription } from '../../lib/hooks/check-subscription'

export const metadata = {
  title: 'Wavvy - Pricing',
  description: 'Get our fully featured bundle for only $39 a month.',
}

export default async function PricingPage() {
  const {activeSubscription, userId } = await checkSubscription()
  return (
    <>
      <PricingCards activeSubscription={activeSubscription} userId={userId || ''}/>
      {/*<PlanFeatures />
      <FeaturedTestimonials />
      <PlansTable />
      <Faqs />
  <CallToAction />*/}
    </>
  )
}
