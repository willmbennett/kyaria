import clsx from 'clsx'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

import { Container } from './Container'
import { Button } from './Button'

const tiers = [
  {
    name: 'Hobby',
    href: '#',
    description:
      'Lorem ipsum dolor sit amet molestie condimentum nisl mollis iaculis etiam. ',
    price: 19,
    features: [
      'Unlimited recording ​​& editing',
      'Up to 720p video quality',
      '10GB of cloud storage',
      '128 kbps audio quality',
      '2 hours of automatic transcript generation',
      '1 hour of clips',
    ],
  },
  {
    name: 'Standard',
    href: '#',
    description:
      'Lorem ipsum dolor sit amet molestie condimentum nisl mollis iaculis etiam. ',
    price: 39,
    features: [
      'Unlimited recording ​​& editing',
      'Up to 1080p video quality',
      '50GB of cloud storage',
      '256 kbps audio quality',
      '5 hours of automatic transcript generation',
      '3 hour of clips',
      'Listener analytics',
      'Screen sharing',
    ],
  },
  {
    name: 'Pro',
    href: '#',
    description:
      'Lorem ipsum dolor sit amet molestie condimentum nisl mollis iaculis etiam. ',
    price: 59,
    features: [
      'Unlimited recording ​​& editing',
      'Up to 4k video quality',
      'Unlimitted cloud storage',
      '320 kbps audio quality',
      'Unlimitted automatic transcript generation',
      'Unlimitted clips',
      'Listener analytics',
      'Screen sharing',
      'Team spaces',
      '24/7 live support',
    ],
  },
]

export function PricingCards() {
  return (
    <section className="relative overflow-hidden bg-amber-100 pt-16 sm:pt-24">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none">
          <h1 className="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0">
            Choose a plan that is right for you
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700 sm:mt-6">
            Lorem ipsum dolor sit amet dapibus fusce sed. Aliquet porta bibendum
            est platea fermentum tempus egestas. Luctus volutpat mauris quisque
            dictum et rhoncus habitasse.
          </p>
        </div>
      </Container>
      <div className="relative pt-20">
        <div className="absolute inset-0 flex flex-col" aria-hidden="true">
          <div className="flex-1 bg-amber-100" />
          <div className="w-full flex-1 bg-vanilla" />
          <div className="flex-1 bg-vanilla" />
        </div>
        <Container>
          <div className="relative mx-auto grid max-w-lg divide-x-0 divide-y divide-gray-secondary-400/75 border border-gray-secondary-400/60 sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={clsx(
                  index == 2 ? 'bg-purple-light' : 'bg-gray-secondary-50',
                  'p-8 sm:p-10',
                )}
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {tier.name}
                </h3>
                <p className="mt-4 text-slate-600">{tier.description}</p>
                <p className="mt-12">
                  <span className="text-4xl font-semibold text-slate-900">
                    ${tier.price}
                  </span>
                  <span className="ml-2.5 text-lg font-medium text-slate-500">
                    / month
                  </span>
                </p>
                <Button href={tier.href} className="mt-8 w-full">
                  Try free for 30 days
                </Button>
                <p className="mt-3.5 text-center text-sm text-slate-500">
                  No credit card required
                </p>
                <hr className="my-10 border-gray-secondary-400/30" />
                <p className="font-medium text-slate-900">
                  {tier.name} includes:
                </p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-6">
                      <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800" />
                      <p className="text-slate-600">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-12 max-w-lg border border-gray-secondary-400/60 bg-gray-secondary-50 p-8 sm:max-w-xl sm:p-12 md:max-w-2xl lg:max-w-5xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full lg:w-3/5">
                <h3 className="text-lg font-semibold text-slate-900">Free</h3>
                <p className="mt-4 text-slate-600">
                  Lorem ipsum dolor sit amet aliqua vitae curabitur libero urna
                  dolore orci adipiscing. Praesent tristique dictum aliqua
                  eleifend malesuada dictumst vulputate rhoncus justo.
                </p>
              </div>
              <Button href="/signin" className="mt-8 lg:mt-0" variant="ghost">
                Get started for free
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <div className="h-16 bg-vanilla sm:h-24"></div>
    </section>
  )
}
