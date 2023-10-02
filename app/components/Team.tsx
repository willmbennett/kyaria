import Image from 'next/image'
import Link from 'next/link'

import Team01 from '/public/images/avatars/james-headshot.jpg'
import Team02 from '/public/images/avatars/will-headshot.jpeg'
import { Container } from './Container'

const team = [
  {
    name: 'James Jia',
    role: 'CEO / Cofounder',
    avatar: Team01,
    linkedin: 'https://www.linkedin.com/in/james-jia-77264bb0/',
  },
  {
    name: 'Will Bennett',
    role: 'CPO & CTO / Cofounder',
    avatar: Team02,
    linkedin: 'https://www.linkedin.com/in/willmbennett/',
  },
]

export function Team() {
  return (
    <section className="relative overflow-hidden bg-vanilla pb-16 sm:pb-20 lg:pb-24">
      <div className="bg-slate-100 py-16 sm:pb-24 sm:pt-28 lg:pt-32">
        <Container>
          <div className="mx-auto max-w-lg items-center sm:max-w-3xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-center lg:items-start">
              <p className="flex items-center space-x-3.5 text-xl font-medium text-amber-900/70">
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={3}
                  viewBox="0 0 28 3"
                  fill="none"
                >
                  <line
                    y1="1.5"
                    x2={28}
                    y2="1.5"
                    stroke="currentColor"
                    strokeOpacity="0.65"
                    strokeWidth={3}
                  />
                </svg>

                <span>Our team</span>
              </p>
              <h1 className="mt-5 text-center text-4xl font-semibold leading-snug text-slate-900 sm:max-w-xl sm:text-5xl sm:leading-snug md:mx-auto lg:text-left xl:mx-0">
                The people behind Kyaria.ai
              </h1>
            </div>
            <div>
              <p className="mx-auto mt-5 max-w-lg text-center text-lg leading-relaxed text-slate-700 lg:ml-auto lg:mr-0 lg:mt-0 lg:text-left">
                True professionals, our team blends industry experience with passion.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative bg-vanilla">
        <div className="absolute inset-x-0 h-40 bg-slate-100"></div>
        <Container>
          <div className="mx-auto grid max-w-lg gap-x-8 gap-y-14 sm:max-w-xl lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="relative z-10">
                <div className="aspect-square">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover object-center"
                    sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 33.33vw, (min-width: 640px) 36rem, calc(100vw - 2rem)"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-slate-900">
                      {member.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <Link
                        href={member.linkedin}
                        className="group flex h-8 w-8 items-center justify-center border border-gray-secondary-400/75 duration-150 hover:bg-gray-secondary-50"
                        target={"_blank"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5 fill-slate-700 duration-150"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <p className="mt-1 text-lg text-slate-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
