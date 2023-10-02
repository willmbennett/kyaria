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

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user?.id && (<SignedInHero userId={session.user.id}/>)}
      {!session && (
        <>
          <HomeHero />
          {/*<LogosRow />*/}
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
