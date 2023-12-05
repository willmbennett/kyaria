import Image from 'next/image'

import { Container } from './Container'
import logoChase from '/public/images/logos/chase.svg'
import logoDailyNews from '/public/images/logos/daily-news-dark.svg'
import logoEntrepreneur from '/public/images/logos/entrepreneur-dark.svg'
import logoQuartz from '/public/images/logos/quartz-dark.svg'
import logoFacebook from '/public/images/logos/facebook.svg'
import logoNetflix from '/public/images/logos/netflix.svg'
import logoHubspot from '/public/images/logos/hubspot.svg'
import logoAmazon from '/public/images/logos/amazon.svg'

const companies = [
  { name: 'Chase', logo: logoChase },
  { name: 'Daily News', logo: logoDailyNews },
  { name: 'Entrepreneur', logo: logoEntrepreneur },
  { name: 'Quartz', logo: logoQuartz },
  { name: 'Facebook', logo: logoFacebook },
  { name: 'Netflix', logo: logoNetflix },
  { name: 'Hubspot', logo: logoHubspot },
  { name: 'Amazon', logo: logoAmazon },
]

export function LogosGrid() {
  return (
    <section className="relative overflow-hidden bg-vanilla py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg sm:max-w-xl lg:mx-0 lg:max-w-none">
          <h1 className="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug">
            The investors behind Wavvy
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700 sm:mt-6">
            Lorem ipsum dolor sit amet dapibus fusce sed. Aliquet porta bibendum
            est platea fermentum tempus egestas. Luctus volutpat mauris quisque
            dictum et rhoncus habitasse.
          </p>
          <ul className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {companies.map((company) => (
              <li
                key={company.name}
                className={
                  'flex items-center justify-center bg-gray-secondary-50 py-10'
                }
              >
                <Image src={company.logo} alt={company.name} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
