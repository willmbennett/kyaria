import Image from 'next/image'
import clsx from 'clsx'

import { Container } from './Container'
import logoAmazon from '/public/images/logos/amazon.svg'
import logoGoogle from '/public/images/logos/google.svg'
import logoEntrepreneur from '/public/images/logos/apple.svg'
import logoMeta from '/public/images/logos/meta.svg'
import logoMicrosoft from '/public/images/logos/microsoft.svg'

const companies = [
  { name: 'Amazon', logo: logoAmazon },
  { name: 'Google', logo: logoGoogle },
  { name: 'Apple', logo: logoEntrepreneur },
  { name: 'Meta', logo: logoMeta },
  { name: 'Microsoft', logo: logoMicrosoft },
]

export default function LogosRow() {
  return (
    <section className="relative overflow-hidden bg-vanilla py-20 lg:pt-24">
      <Container>
        <p className="text-center text-base font-semibold uppercase tracking-widest text-slate-500">
          Trusted by industry professionals at:
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-6 sm:gap-x-12 lg:grid-cols-5">
          {companies.map((company, index) => (
            <li
              key={company.name}
              className={clsx(
                index <= 2 ? 'sm:col-span-2' : 'sm:col-span-3',
                'flex justify-center sm:col-span-2 lg:col-span-1',
              )}
            >
              <Image src={company.logo} alt={company.name} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
