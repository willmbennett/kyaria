import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

import { Container } from './Container'

type TierValue = string | boolean;
type Tiers = {
  [key in typeof tiers[number]]: TierValue;
}

interface Feature {
  name: string;
  tiers: Tiers;
}


const tiers = ['free', 'hobby', 'standard', 'pro']

const features: Feature[] = [
  {
    name: 'Video quality',
    tiers: { free: '720p', hobby: '720p', standard: '1080p', pro: '4k' },
  },
  {
    name: 'Audio quality',
    tiers: {
      free: '64 kbps',
      hobby: '128 kbps',
      standard: '256 kbps',
      pro: '320 kbps',
    },
  },
  {
    name: 'Cloud storage',
    tiers: {
      free: '2GB',
      hobby: '10GB',
      standard: '50GB',
      pro: 'Unlimited',
    },
  },
  {
    name: 'Transcript generation',
    tiers: {
      free: '1 hour',
      hobby: '2 hours',
      standard: '5 hours',
      pro: 'Unlimited',
    },
  },
  {
    name: 'Clip generation',
    tiers: {
      free: '30 minutes',
      hobby: '1 hour',
      standard: '3 hours',
      pro: 'Unlimited',
    },
  },
  {
    name: 'Recording software',
    tiers: {
      free: true,
      hobby: true,
      standard: true,
      pro: true,
    },
  },
  {
    name: 'Editing software',
    tiers: {
      free: true,
      hobby: true,
      standard: true,
      pro: true,
    },
  },
  {
    name: 'Audio support',
    tiers: {
      free: true,
      hobby: true,
      standard: true,
      pro: true,
    },
  },
  {
    name: 'Video support',
    tiers: {
      free: false,
      hobby: true,
      standard: true,
      pro: true,
    },
  },
  {
    name: 'Listener analytics',
    tiers: {
      free: false,
      hobby: false,
      standard: true,
      pro: true,
    },
  },
  {
    name: 'Screen sharing',
    tiers: {
      free: false,
      hobby: false,
      standard: true,
      pro: true,
    },
  },
  {
    name: 'Custom backdrops',
    tiers: {
      free: false,
      hobby: false,
      standard: true,
      pro: true,
    },
  },
  {
    name: 'Team spaces',
    tiers: {
      free: false,
      hobby: false,
      standard: false,
      pro: true,
    },
  },
  {
    name: '24/7 live support',
    tiers: {
      free: false,
      hobby: false,
      standard: false,
      pro: true,
    },
  },
  {
    name: 'Live streaming',
    tiers: {
      free: false,
      hobby: false,
      standard: false,
      pro: true,
    },
  },
]

export function PlansTable() {
  return (
    <section
      id="plan-comparison-table"
      className="relative overflow-hidden bg-vanilla py-16 sm:py-24"
    >
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none">
          <h1 className="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0">
            A detailed comparison of our plans
          </h1>
          <div className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700">
            Compare the features and benifits of each plan. If you’re still
            unsure about anything feel free to{' '}
            <Link
              href="/contact"
              className="font-medium text-slate-900 underline"
            >
              reach out to us
            </Link>
            .
          </div>
        </div>

        <div className="mt-16 overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="border-b border-gray-secondary-100">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-3 text-left text-lg font-semibold text-slate-900 sm:pl-6"
                >
                  Feature
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier}
                    scope="col"
                    className="px-3 py-2 text-center text-lg font-semibold capitalize text-slate-900"
                  >
                    {tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={index % 2 === 0 ? 'bg-amber-50' : undefined}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-slate-800 sm:pl-6">
                    {feature.name}
                  </td>
                  {tiers.map((tier) => (
                    <td key={tier} className="px-3 py-4">
                      {typeof feature['tiers'][tier] == 'boolean' ? (
                        <div className="flex w-full justify-center">
                          {feature['tiers'][tier] && (
                            <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800" />
                          )}
                        </div>
                      ) : (
                        <p className="whitespace-nowrap text-center text-md text-slate-700">
                          {feature['tiers'][tier]}
                        </p>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}
