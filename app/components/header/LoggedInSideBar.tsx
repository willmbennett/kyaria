'use client'

import { signOut } from "next-auth/react";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { DiscordButton } from "../ui/DiscordButton";
import { Button } from '../Button'
import { MobileNav } from "./MobileNav";
import { AcademicCapIcon, BriefcaseIcon, UserGroupIcon, ClipboardDocumentListIcon, ChartBarIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import { pageListType } from "../../helper";
import { MenuIcon } from "./MenuIcon";
import { Separator } from "../ui/separator";
import FeedbackAside from "../landingpage/FeedbackAside";

const linkData = {
  publicLinks: [
    { label: 'KYARIA.AI', href: '/', icon: HomeIcon },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  signedInLinks: [
    {
      label: 'Job Application Tracker',
      href: '/board',
      pricingTier: 'free',
      icon: ClipboardDocumentListIcon
    },
    {
      label: 'AI Career Coach',
      href: '/eve',
      pricingTier: 'PRO',
      icon: AcademicCapIcon
    }
  ],
  productLinks: [
    {
      label: 'Resume Builder',
      href: '/resumebuilder',
      icon: BriefcaseIcon,
      pricingTier: 'free'
    },
    {
      label: 'LinkedIn Bio',
      href: '/bio',
      icon: UserGroupIcon,
      pricingTier: 'free'
    },
    {
      label: 'Elevator Pitch',
      href: '/pitch',
      icon: ChartBarIcon,
      pricingTier: 'free'
    },
    {
      label: 'Goals',
      href: '/goals',
      icon: ClipboardDocumentListIcon,
      pricingTier: 'free'
    },
    /*
    {
      label: 'Networking (beta)',
      href: '/networking',
      pricingTier: 'PRO',
      icon: UserGroupIcon
    },
    {
      label: 'Jobs (beta)',
      href: '/jobs',
      pricingTier: 'PRO',
      icon: BriefcaseIcon
    },
    */
  ],
  signedInMenuLinks: [
    { label: 'Manage Subscription', href: 'https://billing.stripe.com/p/login/fZedQQbuK5Ke2Q06oo' },
  ]
};

const MenuItem = (link: pageListType, pathname: string) => (
  <Link
    key={`${link.label}-desktop`}
    href={link.href}
    className={clsx(
      (pathname.startsWith(link.href) && link.href != '/')
        ? 'bg-slate-100'
        : 'text-slate-800 hover:bg-slate-700 hover:text-white',
      'block px-4 py-2 text-sm',
    )}
  >
    <p className='flex gap-2 items-center'>
      {link.icon && <link.icon className="h-5 w-5 text-gray-500" aria-hidden="true" />}
      {link.label}
    </p>
  </Link>
);

export const DesktopMenu = (pageList: pageListType[], pathname: string, userName: string) => {
  return (
    <Menu as="div" className="relative w-full">
      {({ open }) => (
        <>
          <Menu.Button
            className="group relative z-30 flex w-full cursor-pointer items-center justify-between border text-slate-800 hover:bg-slate-700 hover:text-white px-4 py-2 transition duration-300 ease-in-out focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <p className="font-medium">{userName}</p>
            <MenuIcon open={open} />
          </Menu.Button>
          <Menu.Items className="absolute right-0 bottom-full gap-2 z-50 w-full space-y-1 outline-none drop-shadow filter focus:outline-none bg-white border shadow-xl">
            {pageList.map((link: pageListType, i) => (
              MenuItem(link, pathname)
            ))}
            <Button
              size="md"
              variant="solid"
              className="w-full"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}



export function LoggedInSideBar({ userId, userName }: { userId: string, userName: string }) {
  const pathname = usePathname()

  const desktopMenuLinks = userId ? linkData.signedInLinks : linkData.publicLinks;
  const mobileLinks = userId ? [...linkData.signedInLinks, ...linkData.signedInMenuLinks] : linkData.publicLinks;

  if (userId) {
    const linkToUpdate = linkData.signedInMenuLinks.find(link => link.label === 'Profile')
    if (linkToUpdate) linkToUpdate.href = `/profile/${userId}`;
  }

  return (
    <>
      <aside className="hidden md:flex md:flex-none flex-col h-screen w-60 py-5 border-r z-50">
        <nav className="h-full flex flex-col justify-between gap-4">
          {MenuItem(linkData.publicLinks.filter(l => l.href == '/')[0], pathname)}
          <Separator className="border-b" />
          <div className="flex flex-col h-full gap-4 justify-start" >
            <div className="flexflex-col gap-2">
              {desktopMenuLinks.map((link) => (
                MenuItem(link, pathname)
              ))}
            </div>
            <Separator className="border-b" />
            <div className="flexflex-col gap-2">
              {linkData.productLinks.map((link) => (
                MenuItem(link, pathname)
              ))}
            </div>
          </div>
          {/*<FeedbackAside />*/}
          <DiscordButton />
          <div className="flex px-2">
            {DesktopMenu(linkData.signedInMenuLinks, pathname, userName)}
          </div>
        </nav>
      </aside>
      <div className="md:hidden">
        <MobileNav
          userId={userId}
          mobileLinks={mobileLinks}
          loggedInMenuLinks={linkData.productLinks}
          allProductLinks={[...linkData.signedInLinks, ...linkData.productLinks]} />
      </div>
    </>
  )
}