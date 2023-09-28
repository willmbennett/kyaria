'use client'
import { useState } from 'react';

export default function Detail({
    detail,
    parentIndex,
    childIndex,
}: {
    detail: string
    parentIndex: number,
    childIndex: number,
}) {
    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    };

    return (
        <div className="p-2 mb-2 bg-white rounded-xl" key={`${parentIndex} - ${childIndex}`}>
            <button
                className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={toggleActive}
            > See details you added
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
            </button>
            {active && (
                <div className='p-3'>
                    {detail}
                </div>
            )}
        </div>
    );
}
