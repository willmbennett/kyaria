'use client'
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageListType } from "../../helper";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";

export const desktopDropDownMenu = (title: string, pageList: pageListType[]) => {
    const pathname = usePathname()

    // Split the pageList into two based on pricingTier
    const freePages = pageList.filter(page => page.pricingTier === 'free');
    const proPages = pageList.filter(page => page.pricingTier === 'PRO');

    const MenuItem = (subLink: pageListType) => {
        return (
            <p className='flex gap-2 items-center'>
                {subLink.icon && <subLink.icon className="h-5 w-5 text-gray-500" aria-hidden="true" />}
                {subLink.label}
            </p>
        );
    }

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button
                        className={`group flex items-center px-4 py-2 font-medium outline-none duration-150 ease-in-out focus:outline-none ${open
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
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

                    <Menu.Items className="absolute left-1/2 transform -translate-x-1/2 z-20 mt-3 bg-gray-secondary-50 p-2.5 outline-none drop-shadow filter focus:outline-none flex">
                        {/* Free Features List */}
                        <div className="w-52">
                            <div className="flex gap-2 items-center justify-center">
                                <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Free Features</p>
                            </div>
                            <div className="mt-1">
                                {freePages.map((subLink: pageListType) => (
                                    <Menu.Item key={`${subLink.label}-dropdown-desktop-free`}>
                                        <Link
                                            href={subLink.href}
                                            className={`block px-5 py-3.5 w-full font-medium ${pathname == subLink.href
                                                ? 'bg-gray-secondary-100/60 text-slate-900'
                                                : 'text-slate-700 transition duration-300 ease-in-out hover:bg-gray-secondary-100/60 hover:text-slate-900'
                                                }`}
                                        >
                                            {MenuItem(subLink)}
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </div>
                        </div>

                        {/* PRO Features List */}
                        <div className="border-l pl-4 w-52">
                            <div className="flex gap-2 items-center justify-center">
                                <CheckBadgeIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pro Features</p>
                            </div>
                            <div className="mt-1">
                                {proPages.map((subLink: pageListType) => (
                                    <Menu.Item key={`${subLink.label}-dropdown-desktop-pro`}>
                                        <Link
                                            href={subLink.href}
                                            className={`block px-5 py-3.5 w-full font-medium ${pathname == subLink.href
                                                ? 'bg-gray-secondary-100/60 text-slate-900'
                                                : 'text-slate-700 transition duration-300 ease-in-out hover:bg-gray-secondary-100/60 hover:text-slate-900'
                                                }`}
                                        >
                                            {MenuItem(subLink)}
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </div>
                        </div>
                    </Menu.Items>
                </>
            )}
        </Menu>
    )
}
