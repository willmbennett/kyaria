import React, { useRef, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { DropdownItem } from './DropdownItem';
import { DropdownItemType } from '../../types';

interface DropDownProps {
    selectedItem?: DropdownItemType;
    items: DropdownItemType[];
    onclickAction: (id: string) => Promise<void>;
    altTitle: string;
}

export const DropdownMenu = ({ selectedItem, items, onclickAction, altTitle }: DropDownProps) => {

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button className={`inline-flex w-full justify-between items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-0`}>
                        {selectedItem ? selectedItem.label : altTitle}
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
                        <Menu.Items
                            className="absolute w-max left-0 mt-2 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-80 overflow-y-scroll"
                        >
                            {items.length > 1 && items.map((item) => (
                                <Menu.Item key={item.id}>
                                    {({ close }) => {
                                        const handleClick = async (id: string) => {
                                            close()
                                            onclickAction(id)
                                        }

                                        return (
                                            <DropdownItem
                                                activeOptionId={selectedItem ? selectedItem.id : undefined}
                                                item={item}
                                                onclickAction={handleClick}
                                            />
                                        )
                                    }}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
};