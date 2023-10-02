import { AboutHero } from '../components/AboutHero'
import { StoryWithStats } from '../components/StoryWithStats'
import { FeaturesGridDark } from '../components/FeaturesGridDark'
import { Team } from '../components/Team'
import { LogosGrid } from '../components/LogosGrid'
import { CareersCTA } from '../components/CareersCTA'

export const metadata = {
  title: 'Kyaria - streamlining the job search with AI.',
  description:
    'Kyaria is a small and passionate team in San Francisco with the goal of streamlining the job search.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StoryWithStats />
      {/*<FeaturesGridDark />*/}
      <Team />
      {/*<LogosGrid />*/}
      {/*<CareersCTA />*/}
    </>
  )
}
