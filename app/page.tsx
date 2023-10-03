import { HomeHero } from './components/HomeHero'
import { LogosRow } from './components/LogosRow'
import { FeatureBlocks } from './components/FeatureBlocks'
import { FeaturesGrid } from './components/FeaturesGrid'
import { Process } from './components/Process'
import { TestimonialsSlide } from './components/TestimonialsSlide'
import { Faqs } from './components/Faqs'
import { CallToAction } from './components/CallToAction'
import { SignedInHero } from './components/SignedInHero'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import { ProductDemo } from './components/ProductDemo'
import { getJobApp } from '../lib/app-db'

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const { jobApp } = await getJobApp("6515a83881105e328f7945a2");

  return (
    <>
      {session?.user?.id && (<>
        <SignedInHero userId={session.user.id} />
        <ProductDemo jobApp={jobApp} />
      </>)}
      {!session && (
        <>
          <HomeHero />
          {/*<LogosRow />*/}
          <ProductDemo jobApp={jobApp} />
          <FeatureBlocks />
          <FeaturesGrid />
          <Process />
          {/*<TestimonialsSlide />*/}
          <Faqs />
          <CallToAction />
        </>
      )}
    </>
  )
}
