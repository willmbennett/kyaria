'use client'

import { signIn } from "next-auth/react";
//import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Container } from '../landingpage/Container'
import { Button } from '../Button'
import { desktopMenu } from "./DesktopMenu";
import { MobileNav } from "./MobileNav";
import { linkData } from "../../helper";
import { desktopDropDownMenu } from "./DesktopDropdownMenu";
//import logo from '/public/images/logo-dark.png'
//import logoIcon from '/public/images/logo-icon.png'

export function Header({ userId }: { userId: string }) {
  const pathname = usePathname()

  // Determine which links to show based on the user's state
  const allProductLinks = [...linkData.signedInLinks, ...linkData.productLinks]
  const desktopMenuLinks = userId ? linkData.signedInLinks : linkData.publicLinks;
  const mobileLinks = userId ? [...linkData.signedInLinks, ...linkData.signedInMenuLinks] : linkData.publicLinks;

  // Adjust Profile link dynamically based on userId
  if (userId) {
    const linkToUpdate = linkData.signedInMenuLinks.find(link => link.label === 'Profile')
    if (linkToUpdate) linkToUpdate.href = `/profile/${userId}`;
  }

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
                desktopDropDownMenu('More', linkData.productLinks)
                :
                desktopDropDownMenu('For Job Seekers', allProductLinks)
              }
            </div>
          </div>

          <div>
            <div className="hidden items-center space-x-4 md:flex">
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
              {userId && desktopMenu(linkData.signedInMenuLinks)}
            </div>
          </div>
        </nav>
        <div className="ml-4 md:hidden">
          <MobileNav
            userId={userId}
            mobileLinks={mobileLinks}
            loggedInMenuLinks={linkData.productLinks}
            allProductLinks={allProductLinks} />
        </div>
      </Container>
    </header>
  )
}
