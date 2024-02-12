'use client'

import { signIn, signOut } from "next-auth/react";
import { Fragment } from 'react'
//import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure, Transition, Popover, Menu } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { DiscordButton } from "./ui/DiscordButton";

import { Container } from './landingpage/Container'
import { Button } from './Button'
//import logo from '/public/images/logo-dark.png'
//import logoIcon from '/public/images/logo-icon.png'

type pageListType = {
  label: string,
  href: string
}

const links = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  /*{ label: 'Contact', href: '/contact' },*/
]
/*
const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'Sign in', href: '/auth/signin' },
  { label: 'Sign up', href: '/signin' },
  { label: 'Password reset', href: '/password-reset' },
  { label: '404', href: '/404' },
]*/

const userPages = [
  { label: 'Resume Builder', href: '/resumebuilder' },
  { label: 'Networking', href: '/networking' },
  /*{ label: 'Pricing', href: '/pricing' },*/
  /*{ label: 'Contact', href: '/contact' },*/
]

const loggedInLinks = [
  { label: 'Jobs (beta)', href: '/jobs' },
  { label: 'AI Career Concierge (beta)', href: '/board' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  /*{ label: 'Pricing', href: '/pricing' },*/
  /*{ label: 'Contact', href: '/contact' },*/
]


//{ label: 'Profile', href: `/profile/${userId?.user?.id}` },

export function Header({userId}: {userId: string}) {
  const pathname = usePathname()

  const signedInLinks = [
    { label: 'Resume Builder', href: '/resumebuilder' },
    { label: 'Networking (beta)', href: '/networking' },
    /*{ label: 'Pricing', href: '/pricing' },*/
    /*{ label: 'Contact', href: '/contact' },*/
  ]

  const desktopMenuLinks = userId ? signedInLinks : links

  const signedInMenuLinks = [
    { label: 'Profile (beta)', href: `/profile/${userId}` },
    { label: 'Manage Subscription', href: `https://billing.stripe.com/p/login/fZedQQbuK5Ke2Q06oo` },
  ]

  const MobileLinks = userId ? [ ...signedInLinks, ...signedInMenuLinks] : links

  function MenuIcon({ open }: { open: any }) {
    return (
      <span className={`relative h-3.5 w-4`}>
        <span
          className={clsx(
            'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-slate-900',
            open ? 'left-1/2 top-1.5 w-0' : 'left-0 top-0 w-full',
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900',
            open ? 'rotate-45' : 'rotate-0',
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900',
            open ? '-rotate-45' : 'rotate-0',
          )}
        />
        <span
          className={clsx(
            'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900',
            open ? 'left-1/2 top-1.5 w-0' : 'left-0 top-3 w-full',
          )}
        />
      </span>
    )
  }

  function MobileNav() {
    return (
      <Popover>
        <Popover.Button
          className="group relative z-50 flex cursor-pointer items-center justify-center border border-gray-secondary-400/75 bg-gray-secondary-50 p-3 transition duration-300 ease-in-out focus:outline-none md:hidden"
          aria-label="Toggle Navigation"
        >
          {({ open }) => <MenuIcon open={open} />}
        </Popover.Button>

        <Transition.Root>
          <Transition.Child
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 z-20 bg-slate-900 bg-opacity-25 backdrop-blur" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100 "
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-90"
          >
            <Popover.Panel
              as="div"
              className="absolute inset-x-0 top-0 z-30 overflow-hidden px-5 pb-8 pt-24"
            >
              <div>
                <div className="flex flex-col divide-y divide-gray-secondary-400/75">
                  {MobileLinks.map((link) => (
                    <Link
                      key={`${link.label}-mobile`}
                      href={link.href}
                      className={
                        'block px-4 pb-2 pt-4 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }
                    >
                      {link.label}
                    </Link>
                  ))}
                  {mobileDropDownMenu(userId ? 'More' : 'For Job Seekers', userId ? loggedInLinks : userPages)}
                </div>
                <div className="mt-6">
                  <Button
                    size="md"
                    variant="ghost"
                    className="w-full"
                    onClick={!userId ? () => signIn() : () => signOut()}
                  >
                    {!userId ? 'Sign In' : 'Sign Out'}
                  </Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition.Child>
        </Transition.Root>
      </Popover>
    )
  }

  const mobileDropDownMenu = (title: string, pageList: pageListType[]) => (
    <Disclosure as="div" className="relative">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`group flex w-full items-center justify-between px-4 pb-2 pt-4 font-medium duration-150 ease-in-out ${open
              ? 'bg-amber-50 text-slate-900'
              : 'text-slate-700 hover:bg-slate-100  hover:text-slate-900'
              }`}
          >
            <span>{title}</span>
            <ChevronRightIcon
              className={`ml-2 h-5 w-5 duration-300 ${open
                ? 'rotate-90 text-slate-900'
                : 'text-slate-600/90 group-hover:text-slate-900'
                }`}
              aria-hidden="true"
            />
          </Disclosure.Button>

          <Disclosure.Panel className="z-20 space-y-0 px-4">
            {pageList.map((subLink) => (
              <div
                className="mt-2"
                key={`${subLink.label}-dropdown-desktop`}
              >
                <Link
                  href={subLink.href}
                  className="block px-3 py-3 font-medium text-slate-700 transition duration-300 ease-in-out hover:bg-slate-100 hover:text-slate-900"
                >
                  {subLink.label}
                </Link>
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )

  const desktopDropDownMenu = (title: string, pageList: pageListType[]) => (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          {title == 'Menu' ?
            <Menu.Button
              className="group relative z-50 flex cursor-pointer items-center justify-center border border-gray-secondary-400/75 bg-gray-secondary-50 p-3 transition duration-300 ease-in-out focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <MenuIcon open={open} />
            </Menu.Button>
            :
            <Menu.Button
              className={`group flex items-center px-4  py-2  font-medium outline-none duration-150 ease-in-out focus:outline-none ${open
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-700 hover:bg-slate-100  hover:text-slate-900'
                }`}
            >
              <span>{title}</span>
              <ChevronDownIcon
                className={`ml-2 h-5 w-5 duration-300 ${open
                  ? 'rotate-180 text-slate-900'
                  : 'text-slate-600/90 group-hover:text-slate-900'
                  }`}
                aria-hidden="true"
              />
            </Menu.Button>
          }


          <Menu.Items className="absolute right-0 z-20 mt-3 w-52 space-y-1 bg-gray-secondary-50 p-2.5 outline-none drop-shadow filter focus:outline-none">
            {pageList.map((subLink: pageListType, i) => (
              <Menu.Item key={`${subLink.label}-dropdown-desktop`}>
                <Link
                  href={subLink.href}
                  className={`block px-5 py-3.5 font-medium ${pathname == subLink.href
                    ? 'bg-gray-secondary-100/60 text-slate-900'
                    : 'text-slate-700 transition duration-300 ease-in-out hover:bg-gray-secondary-100/60 hover:text-slate-900'
                    }`}
                >
                  {subLink.label}
                </Link>
              </Menu.Item>
            ))}
            {title == 'Menu' &&
              <Button
                size="md"
                variant="solid"
                className="w-full"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            }
          </Menu.Items>
        </>
      )}
    </Menu>
  )

  return (
    <header className="h-24">
      <Container className="flex h-full w-full items-center border-b border-gray-secondary-300/60">
        <nav className="relative z-50 flex w-full items-center justify-between ">
          <div className="flex items-center space-x-8 lg:space-x-12">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center font-bold text-slate-700"
              aria-label="Home"
            >
              {/*<Image
                src={logo}
                className="h-7 w-auto sm:h-8 md:hidden lg:block lg:h-9"
                alt="Logo"
              />
              <Image
                src={logoIcon}
                className="hidden h-7 w-auto md:block lg:hidden"
                alt="Logo Icon"
              />*/}
              KYARIA.AI
            </Link>
            <div className="hidden items-center space-x-3 md:flex lg:space-x-4">
              {desktopMenuLinks.map((link) => (
                <Link
                  key={`${link.label}-desktop`}
                  href={link.href}
                  className={clsx(
                    pathname == link.href
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                    'inline-block px-4 py-2 font-medium',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {userId ?
                desktopDropDownMenu('More', loggedInLinks)
                :
                desktopDropDownMenu('For Job Seekers', userPages)
              }
            </div>
          </div>

          <div>
            <div className="hidden items-center space-x-4 md:flex">
              <div className="hidden lg:block">
                < DiscordButton />
              </div>
              <div className="hidden lg:block">
                {!userId &&
                  <Button
                    size="md"
                    variant="solid"
                    className="w-full"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </Button>
                }
              </div>
              {userId && desktopDropDownMenu('Menu', signedInMenuLinks)}
              {/*<Button size="md" href="/signin">
                Sign up free
              </Button>
              */}
            </div>
          </div>
        </nav>
        <div className="ml-4 md:hidden">
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
