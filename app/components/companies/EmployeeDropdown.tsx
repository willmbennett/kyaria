'use client'
import { useState } from "react";
const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";
import { useRouter, useSearchParams } from 'next/navigation'


export default function EmployeeDropdown({ employeeCategories, limit, roleFilter }: { employeeCategories: string[], limit: number, roleFilter: string }) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const router = useRouter()
    const searchParams = useSearchParams()
    // Assuming searchParams is an instance of URLSearchParams
    const params = new URLSearchParams(searchParams);
    const optionsClick = () => {
        setShowOptions(!showOptions);
    };

    return (

        <div className='flex flex-col py-3'>
            <div className="relative inline-block text-left">
                <div>
                    <button
                        onClick={optionsClick}
                        type="button"
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        {selectedCategory == '' ? 'Select category' : selectedCategory}
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {showOptions && (
                    <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">
                            {
                                employeeCategories.map((category, i) => {
                                    const selectOption = () => {
                                        setSelectedCategory(category);
                                        // Update the 'limit' parameter, assuming limit is a number and doesn't need encoding
                                        params.set('roleFilter', category);
                                        params.set('limit', '30');
                                        const url = `?${params}`
                                        router.push(url, { scroll: false })
                                        setShowOptions(!showOptions);
                                    };

                                    return (
                                        <button
                                            key={i}
                                            onClick={selectOption}
                                            className={`text-gray-700 w-full block px-4 py-2 text-sm ${selectedCategory === category ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
                                        >
                                            {category}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}