import { Disclosure, Popover } from "@headlessui/react";
import { pageListType } from "../../helper";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline"; // Assuming you're using Heroicons

export const mobileDropDownMenu = (title: string, pageList: pageListType[]) => (
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
                    {pageList.map((subLink) => {
                        const IconComponent = subLink.pricingTier === 'PRO' ? CheckBadgeIcon : CheckIcon;
                        const iconColor = subLink.pricingTier === 'PRO' ? 'text-blue-500' : 'text-green-500';

                        return (
                            <div className="mt-2 flex items-center" key={`${subLink.label}-dropdown-mobile`}>
                                <Popover.Button
                                    as={Link}
                                    href={subLink.href}
                                    className="block w-full flex items-center px-3 py-3 font-medium text-slate-700 transition duration-300 ease-in-out hover:bg-slate-100 hover:text-slate-900"
                                >
                                    <IconComponent className={`h-5 w-5 mr-2 ${iconColor}`} aria-hidden="true" />
                                    {subLink.label}
                                </Popover.Button>
                            </div>
                        );
                    }
                    )}
                </Disclosure.Panel>
            </>
        )}
    </Disclosure >
)