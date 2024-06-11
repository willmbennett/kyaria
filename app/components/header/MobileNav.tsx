import { Popover, Transition } from "@headlessui/react"
import { MenuIcon } from "./MenuIcon"
import { Fragment } from 'react'
import { pageListType } from "../../helper"
import { mobileDropDownMenu } from "./MobileMenu"
import Link from "next/link"
import { Button } from "../Button"
import { signIn, signOut } from "next-auth/react"

interface MobileNavProps {
    userId?: string;
    mobileLinks: pageListType[];
    loggedInMenuLinks: pageListType[],
    allProductLinks: pageListType[]
}

export const MobileNav = ({
    userId,
    mobileLinks,
    loggedInMenuLinks,
    allProductLinks
}: MobileNavProps) => {
    return (
        <Popover>
            <Popover.Button
                className="group relative mt-2 ml-2 z-50 flex cursor-pointer items-center justify-center border border-gray-secondary-400/75 bg-gray-secondary-50 p-3 transition duration-300 ease-in-out focus:outline-none md:hidden"
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
                                {mobileLinks.map((link) => (
                                    <Popover.Button
                                        as={Link}
                                        key={`${link.label}-mobile`}
                                        href={link.href}
                                        className={
                                            'block px-4 pb-2 pt-4 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                        }
                                    >
                                        {link.label}
                                    </Popover.Button>
                                ))}
                                {userId && mobileDropDownMenu(userId ? 'More' : 'For Job Seekers', userId ? loggedInMenuLinks : allProductLinks)}
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