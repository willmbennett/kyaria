import { PricingCards } from '../components/landingpage/PricingCards'
import { checkSubscription } from '../../lib/hooks/check-subscription'

export default async function PricingPage() {
  const { activeSubscription, userId } = await checkSubscription()
  return (
    <div className='relative w-full h-full overflow-y-scroll'>
      <PricingCards activeSubscription={activeSubscription} userId={userId || ''} />
      {/*<PlanFeatures />
      <FeaturedTestimonials />
      <PlansTable />
      <Faqs />
  <CallToAction />*/}
    </div>
  )
}
