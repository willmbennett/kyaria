import { HomeHero } from './components/HomeHero'
import { LogosRow } from './components/LogosRow'
import { FeatureBlocks } from './components/FeatureBlocks'
import { FeaturesGrid } from './components/FeaturesGrid'
import { Process } from './components/Process'
import { TestimonialsSlide } from './components/TestimonialsSlide'
import { Faqs } from './components/Faqs'
import { CallToAction } from './components/CallToAction'

export default function HomePage() {
  return (
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
  )
}
