'use client';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { DropDownItemType } from "../../../board/job-helper";
import { DropdownItem } from "./DropdownItem";

interface DropDownProps {
    title: string;
    activeOptionId?: string;
    items: DropDownItemType[];
    onclickAction: (id: string) => Promise<void>;
}

export const DropdownMenu = ({ title, activeOptionId, items, onclickAction }: DropDownProps) => {
    return (
        <Menu as="div" className="relative w-full" >
            {({ open }) => (
                <>
                    {/* Overlay */}
                    {open && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" aria-hidden="true"></div>
                    )}

                    {/* Menu Button */}
                    <Menu.Button className={`inline-flex w-full justify-between items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-0`}>
                        {title}
                        <ChevronDownIcon className={`ml-2 h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </Menu.Button>

                    <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            {items.map((item) => (
                                <Menu.Item key={item.id}>
                                    <DropdownItem
                                        activeOptionId={activeOptionId}
                                        item={item}
                                        onclickAction={onclickAction}
                                    />
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
};
