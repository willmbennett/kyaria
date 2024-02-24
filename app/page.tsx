import dynamic from 'next/dynamic';
import { HomeHero } from './components/landingpage/HomeHero'
import { SignedInHero } from './components/landingpage/SignedInHero'
// Dynamic imports
const LogosRow = dynamic(() => import('./components/landingpage/LogosRow'))
const FeatureBlocks = dynamic(() => import('./components/landingpage/FeatureBlocks'))
const FeaturesGrid = dynamic(() => import('./components/landingpage/FeaturesGrid'))
const Process = dynamic(() => import('./components/landingpage/Process'))
const TestimonialsSlide = dynamic(() => import('./components/landingpage/TestimonialsSlide'))
const Faqs = dynamic(() => import('./components/landingpage/Faqs'))
const CallToAction = dynamic(() => import('./components/landingpage/CallToAction'))
const ProductDemo = dynamic(() => import('./components/landingpage/ProductDemo'))

// Data fetching
import { getJobApp } from '../lib/app-db'
import { countTotalResumes } from '../lib/resume-db'
import { checkSubscription } from '../lib/hooks/check-subscription'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { activeSubscription, userId } = await checkSubscription()
  //const { app } = await getJobApp("651c2c45705785cff67bb3c9");
  const { totalResumes } = await countTotalResumes()

  if (!userId) {
    return (
      <>
        <HomeHero />
        {/*<LogosRow />*/}
        {/*<ProductDemo jobApp={app} userId={userId} />*/}
        {totalResumes && <FeatureBlocks totalResumes={totalResumes} />}
        <FeaturesGrid />
        <Process />
        {/*<TestimonialsSlide />*/}
        <Faqs />
        <CallToAction />
      </>
    )
  }

  if (!activeSubscription) {
    redirect(`/profile/${userId}`);
  }

  if (userId) {
    redirect(`/profile/${userId}`);
  }

  return (
    <SignedInHero userId={userId} />
  )
}
