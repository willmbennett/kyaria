import { HomeHero } from './components/landingpage/HomeHero'
import { LogosRow } from './components/landingpage/LogosRow'
import { FeatureBlocks } from './components/landingpage/FeatureBlocks'
import { FeaturesGrid } from './components/landingpage/FeaturesGrid'
import { Process } from './components/landingpage/Process'
import { TestimonialsSlide } from './components/landingpage/TestimonialsSlide'
import { Faqs } from './components/landingpage/Faqs'
import { CallToAction } from './components/landingpage/CallToAction'
import { SignedInHero } from './components/landingpage/SignedInHero'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import { ProductDemo } from './components/landingpage/ProductDemo'
import { getJobApp } from '../lib/app-db'

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const { jobApp } = await getJobApp("651c2c45705785cff67bb3c9");

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
