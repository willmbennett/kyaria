import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import React, { useState } from 'react';

interface DropDownProps<T> {
    items: T[];
    options: string[];
    renderItem: (item: T, index: number) => JSX.Element;
}

const dropDownMenu = (options: string[], currentIndex: number, setCurrentIndex: (index: number) => void) => (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
            <Menu.Button
              className={`group flex items-center px-4  py-2  font-medium outline-none duration-150 ease-in-out focus:outline-none ${open
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-700 hover:bg-slate-100  hover:text-slate-900'
                }`}
            >
              <span>{options[currentIndex]}</span>
              <ChevronDownIcon
                className={`ml-2 h-5 w-5 duration-300 ${open
                  ? 'rotate-180 text-slate-900'
                  : 'text-slate-600/90 group-hover:text-slate-900'
                  }`}
                aria-hidden="true"
              />
            </Menu.Button>


          <Menu.Items className="absolute right-0 z-20 mt-3 w-auto space-y-1 bg-gray-secondary-50 p-2.5 outline-none drop-shadow filter focus:outline-none">
            {options.map((option: string, i) => (
              <Menu.Item key={`${option}-dropdown-desktop`}>
                <button
                  onClick={() => (setCurrentIndex(i))}
                  className={`block px-5 py-3.5 font-medium ${currentIndex == i
                    ? 'bg-gray-secondary-100/60 text-slate-900'
                    : 'text-slate-700 transition duration-300 ease-in-out hover:bg-gray-secondary-100/60 hover:text-slate-900'
                    }`}
                >
                  {option}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  )

function DropDownSelect<T>({ items, options, renderItem }: DropDownProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div>
            <div className="flex justify-between mb-2">
                {dropDownMenu(options, currentIndex, setCurrentIndex)}
            </div>
            {items.length > 0 && items[currentIndex] && renderItem(items[currentIndex], currentIndex)}
        </div>
    );
}

export default DropDownSelect;
