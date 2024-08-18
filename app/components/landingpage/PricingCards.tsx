'use client'
import clsx from 'clsx'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

import { Container } from './Container'
import { Button } from '../Button'
import Checkout from './Checkout'
import { useState } from 'react'
import AuthButton from '../AuthButton'

const tiers = [
  {
    name: 'Free',
    href: '#',
    description:
      "The free tier offers access to a suite of powerful AI tools to streamline the job search.",
    price: 0,
    features: [
      "AI-powered Resume Builder: Enjoy a user-friendly interface that simplifies creating impactful resumes.",
      "Kanban-Style Job Board: Organize and track your job search with ease for maximum efficiency.",
      "Comprehensive Application Kit: Elevate your job applications with customized resumes, cover letters, interview preparation, and professional email templates.",
      "In-depth Company Research: Gain insights into potential employers with detailed information on company background, fundraising activities, and employee insights."
    ]
  },
  {
    name: 'Pro',
    href: '#',
    description:
      "The Pro package grants exclusive access to all current and beta products, empowering you with advanced resources at every step.",
    price: 29.99,
    features: [
      "Everything included in the Free tier.",
      "Eve: The world's first AI-powered virtual career coach.",
      "Mock interviews with instant feedback.",
    ],
  },
  /*{
    name: 'Standard',
    href: '#',
    description:
      'Lorem ipsum dolor sit amet molestie condimentum nisl mollis iaculis etiam. ',
    price: 39,
    features: [
      'Resume Builder with unlimited AI-powered optimization',
      '"Tell Me About Yourself" Helper',
      'Behavioral Interview Prep:',
      'Organize your job hunt with our kanban-style board',
      'Try our automated interview prep tool',
      'Email Writing',
      'Networking Support',
      'Company Research',
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
  */
]

export function PricingCards({ activeSubscription, userId }: { activeSubscription: boolean, userId?: string }) {
  const [checkout, setCheckout] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const couponCode = "KYARIABETA";
  const handleCouponClick = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setSuccessAlert("Coupon code copied to clipboard!"); // Optionally, provide user feedback
    } catch (err) {
      console.error("Failed to copy coupon:", err);
    }
  };

  return (
    <section className="relative overflow-hidden bg-vanilla pt-16 sm:pt-24 min-h-screen">

      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none">
          <h1 className="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0">
            Launch your career for <span className='text-emerald-500'>FREE</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700 sm:mt-6">
            Unlock the full potential of your job search with our comprehensive suite of AI-enhanced tools. Get ahead of the competition!
          </p>
          {['6526c43cca06a466f98a8358', '65281343cfe03a938334b768', '651e2fe7298cc2095da37448', '6525b8886c67f8dab5faec4b', '6514b9f6ffaf0f09ad31c43b', '650f813286f63a9d8c0080ee'].includes(userId || '') &&
            <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700 sm:mt-6">
              Congrats on being a beta user! We're excited to give you 3 months free of Kyaria.ai pro!
              Use coupon <span className="cursor-pointer text-emerald-600 hover:text-emerald-800" onClick={handleCouponClick}>{couponCode}</span> at checkout.
            </p>
          }
          {successAlert &&
            <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700 sm:mt-6">
              Code <span className="text-emerald-600">{couponCode}</span> copied to clipboard
            </p>}
        </div>
      </Container>
      {!checkout &&
        <>
          <div className="relative pt-20">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1" />
              <div className="w-full flex-1 bg-vanilla" />
              <div className="flex-1 bg-vanilla" />
            </div>
            <Container className='mb-5 flex justify-center'>
              <div className="relative mx-auto grid max-w-lg divide-x-0 divide-y divide-gray-secondary-400/75 border border-gray-secondary-400/60 sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-5xl lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                {tiers.map((tier, index) => (
                  <div
                    key={tier.name}
                    className={clsx(
                      index == 2 ? 'bg-purple-light' : 'bg-gray-secondary-50',
                      'p-8 sm:p-10',
                    )}
                  >
                    <div className='flex flex-row space-x-3'>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {tier.name}
                      </h3>
                      {activeSubscription &&
                        <div className='text-emerald-500 flex flex-row items-center justify-center space-x-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" fill='rgb(16 185 129)' viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                          <p>Subscribed</p>
                        </div>
                      }
                    </div>
                    <p className="mt-4 text-slate-600">{tier.description}</p>
                    <p className="mt-12">
                      {tier.price == 0 ?
                        <span className="text-4xl font-semibold text-emerald-500">
                          FREE
                        </span>
                        :
                        <>
                          <div className="flex items-baseline">
                            <span className="text-4xl font-semibold text-slate-900">
                              ${tier.price}
                            </span>
                            <span className="ml-2.5 text-lg font-medium text-slate-500">
                              / month
                            </span>
                          </div>
                          <span className="mt-1 text-sm font-medium text-green-600">
                            First week free! No credit card required.
                          </span>
                        </>
                      }
                    </p>
                    {tier.price == 0 ?
                      <>
                        {userId ?
                          <Button className="mt-8 w-full" href={`/profile/${userId}`}>
                            Get Started
                          </Button>
                          :
                          <AuthButton className="mt-8 w-full" altText="Sign in" />
                        }
                        <p className="mt-3.5 text-center text-sm text-slate-500">
                          No credit card required
                        </p>
                      </>
                      :
                      <>
                        {activeSubscription ?
                          <Button className="mt-8 w-full" href="https://billing.stripe.com/p/login/fZedQQbuK5Ke2Q06oo">
                            Manage Subscription
                          </Button> :
                          <>
                            {
                              userId ?
                                <Button className="mt-8 w-full" onClick={() => setCheckout(true)}>
                                  Select Plan
                                </Button>
                                :
                                <AuthButton className="mt-8 w-full" altText="Sign in to subscribe" callbackUrl='/pricing' />
                            }
                          </>
                        }
                      </>
                    }
                    {/*
                  <p className="mt-3.5 text-center text-sm text-slate-500">
                    No credit card required
                  </p>
                  */}
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
              {
                /*
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
                          */
              }
            </Container>
          </div>
        </>
      }
      {
        false &&
        <div className="bg-vanilla my-3">
          <div className="flex justify-center my-3">
            <Button onClick={() => setCheckout(false)}>
              Return to Plans
            </Button>
          </div>
          <Checkout />
        </div>
      }
    </section >
  )
}
