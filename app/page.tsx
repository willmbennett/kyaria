import dynamic from 'next/dynamic';
import { HomeHero } from './components/landingpage/HomeHero'
import { SignedInHero } from './components/landingpage/SignedInHero'
// Dynamic imports
//const LogosRow = dynamic(() => import('./components/landingpage/LogosRow'))
//const FeatureBlocks = dynamic(() => import('./components/landingpage/FeatureBlocks'))
//const FeaturesGrid = dynamic(() => import('./components/landingpage/FeaturesGrid'))
//const Process = dynamic(() => import('./components/landingpage/Process'))
//const TestimonialsSlide = dynamic(() => import('./components/landingpage/TestimonialsSlide'))
//const Faqs = dynamic(() => import('./components/landingpage/Faqs'))
const CallToAction = dynamic(() => import('./components/landingpage/CallToAction'))

// Data fetching
import { checkSubscription } from '../lib/hooks/check-subscription'
import { redirect } from 'next/navigation'
import { MockInterviewDemo } from './components/landingpage/MarketingDemo';

export default async function HomePage() {
  const { userId } = await checkSubscription()

  if (!userId) {
    return (
      <>
        <HomeHero />
        <MockInterviewDemo />
        {/*<LogosRow />*/}
        {/*totalResumes && <FeatureBlocks totalResumes={totalResumes} />*/}
        {/*<FeaturesGrid /> */}
        {/*<Process /> */}
        {/*<TestimonialsSlide />*/}
        {/*< Faqs /> */}
        <CallToAction />
      </>
    )
  }

  if (userId) {
    redirect("/eve");
  }

  return (
    <SignedInHero userId={userId} />
  )
}
