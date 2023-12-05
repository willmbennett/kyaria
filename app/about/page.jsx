import { AboutHero } from '../components/landingpage/AboutHero'
import { StoryWithStats } from '../components/landingpage/StoryWithStats'
import { FeaturesGridDark } from '../components/landingpage/FeaturesGridDark'
import { Team } from '../components/landingpage/Team'
import { LogosGrid } from '../components/landingpage/LogosGrid'
import { CareersCTA } from '../components/landingpage/CareersCTA'

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
