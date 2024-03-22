'use client'
import { Menu } from "@headlessui/react";
import { pageListType } from "../../helper";
import { MenuIcon } from "./MenuIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../Button";

export const desktopMenu = (pageList: pageListType[]) => {
    const pathname = usePathname()

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button
                        className="group relative z-50 flex cursor-pointer items-center justify-center border border-gray-secondary-400/75 bg-gray-secondary-50 p-3 transition duration-300 ease-in-out focus:outline-none"
                        aria-label="Toggle Navigation"
                    >
                        <MenuIcon open={open} />
                    </Menu.Button>
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