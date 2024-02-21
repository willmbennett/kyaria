'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Analytics } from '@segment/analytics-node'

// instantiation
const analytics = new Analytics({ writeKey: 'wayhHKaPEXQc0mIChRaLHikN33jwEIKM' })

import logo from '/public/images/logo-light.png'
import { Container } from './landingpage/Container'
import {
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  TiktokIcon,
} from './SocialIcons'
import { useSession } from 'next-auth/react';

const navigation = {
  company: [
    { name: 'About us', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    /*{ name: 'Careers', href: '#' },*/
    /*{ name: 'Customers', href: '#' },*/
    { name: 'Privacy', href: '/policies/privacy' },
    /*{ name: 'Contact us', href: '/contact' },*/
  ],
  solutions: [
    { name: 'Resume Builder', href: '/resumebuilder' },
    { name: 'AI Career Concierge', href: '/board' },
    { name: 'LinkedIn Bio', href: '/bio' },
    { name: 'Elevator Pitch', href: '/pitch' },
    { name: 'Networking (beta)', href: '/networking' },
    { name: 'Jobs (beta)', href: '/jobs' },
  ],
  integrations: [
    { name: 'Youtube', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Spotify', href: '#' },
    { name: 'Tiktok', href: '#' },
    { name: 'Apple Podcasts', href: '#' },
    { name: 'Google Podcasts', href: '#' },
  ],
  resources: [
    { name: 'Blog', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Case studies', href: '#' },
    { name: 'Help center', href: '#' },
  ],
}

type IconComponentType = React.ComponentType<React.SVGAttributes<SVGElement>>;

interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: IconComponentType;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href = '', ...props }) => {
  // Ensure Icon is a component by capitalizing it
  return (
    <Link href={href} target="_blank" {...props}>
      <Icon className="h-5 w-5 text-slate-100/90 duration-150 group-hover:text-slate-50" />
    </Link>
  );
};

interface FooterProps {
  userId: string;
  userName: string;
  email?: string;
}


export function Footer({ userId, userName, email }: FooterProps) {

  if (userId) {
    analytics.identify({
      userId: userId,
      traits: {
        name: userName,
        email: email
      }
    });
  }

  return (
    <section className="overflow-hidden bg-slate-700 pb-12 pt-20 text-slate-50">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="max-w-xl lg:col-span-4 lg:max-w-none">
            <Link href="/" className="flex flex-shrink-0" aria-label="Home">
              {/*<Image
                src={logo}
                className="h-7 w-auto sm:h-8 lg:h-9"
                alt="Logo"
                />*/}
              KYARIA.AI
            </Link>
            <p className="mt-10 text-md leading-relaxed text-slate-50">
              Our mission is to make the job search effortless using the power of AI
            </p>

            <div className="mt-8 flex items-center gap-4">
              {/*
              <SocialLink
                href="https://facebook.com"
                aria-label="Follow on Facebook"
                icon={FacebookIcon}
              />
              <SocialLink
                href="https://youtube.com"
                aria-label="Follow on Youtube"
                icon={YoutubeIcon}
              />
              <SocialLink
                href="https://twitter.com"
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
              <SocialLink
                href="https://instagram.com"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              */}
              <SocialLink
                href="https://www.linkedin.com/company/kyariaai"
                aria-label="Follow on Instagram"
                icon={LinkedInIcon}
              />
              <SocialLink
                href="https://www.tiktok.com/@kyaria.ai"
                aria-label="Follow on Tiktok"
                icon={TiktokIcon}
              />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-12 gap-8 lg:col-span-8 lg:mt-0">
            <div className="col-span-6 md:col-span-3">
              <p className="text-md font-semibold text-white">Company</p>
              <div className="mt-4 flex flex-col space-y-3">
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-md text-slate-100 duration-150 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-6 md:col-span-3">
              <p className="text-md font-semibold text-white">Solutions</p>
              <div className="mt-4 flex flex-col space-y-3">
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-md text-slate-100 duration-150 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* 
            <div className="col-span-6 md:col-span-3">
              <p className="text-md font-semibold text-white">Integrations</p>
              <div className="mt-4 flex flex-col space-y-3">
                {navigation.integrations.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-md text-slate-100 duration-150 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <p className="text-md font-semibold text-white">Resources</p>
              <div className="mt-4 flex flex-col space-y-3">
                {navigation.resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-md text-slate-100 duration-150 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            */}
          </div>
        </div>

        <hr className="mt-16 border-gray-secondary-400/60" />
        <div className="flex w-full flex-col justify-between pt-8 sm:flex-row">
          <p className="text-md text-slate-200">
            {/*© {new Date().getFullYear()} Kyaria, LLC. All rights reserved. */}
            Kyaria, LLC
          </p>
          <div className="mt-5 flex gap-3 sm:mt-0">
            {/*<Link
              href="#"
              className="text-md text-slate-100 underline duration-150 hover:text-white"
            >
              Terms
            </Link>
            */}
            <Link
              href="/policies/privacy"
              className="text-md text-slate-100 underline duration-150 hover:text-white"
            >
              Privacy
            </Link>
            {/*<Link
              href="#"
              className="text-md text-slate-100 underline duration-150 hover:text-white"
            >
              Cookies
            </Link>
            */}
          </div>
        </div>
      </Container>
    </section>
  )
}
