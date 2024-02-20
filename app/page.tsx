import { HomeHero } from './components/landingpage/HomeHero'
import { LogosRow } from './components/landingpage/LogosRow'
import { FeatureBlocks } from './components/landingpage/FeatureBlocks'
import { FeaturesGrid } from './components/landingpage/FeaturesGrid'
import { Process } from './components/landingpage/Process'
import { TestimonialsSlide } from './components/landingpage/TestimonialsSlide'
import { Faqs } from './components/landingpage/Faqs'
import { CallToAction } from './components/landingpage/CallToAction'
import { SignedInHero } from './components/landingpage/SignedInHero'
import { ProductDemo } from './components/landingpage/ProductDemo'
import { getJobApp } from '../lib/app-db'
import { countTotalResumes } from '../lib/resume-db'
import { checkSubscription } from '../lib/hooks/check-subscription'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { activeSubscription, userId } = await checkSubscription()
  const { app } = await getJobApp("651c2c45705785cff67bb3c9");
  const { totalResumes } = await countTotalResumes()

  if (!userId) {
    return (
      <>
        <HomeHero />
        {/*<LogosRow />*/}
        {/*<ProductDemo jobApp={app} userId={userId} />*/}
        <FeatureBlocks totalResumes={totalResumes || 200} />
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

  console.log(app)

  return (
    <SignedInHero userId={userId} />
  )
}
