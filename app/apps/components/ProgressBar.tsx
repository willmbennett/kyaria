'use client';
import React from 'react';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { progressStates } from '../app-helper';

interface ProgressBarProps {
    activeProgressSection: string
}
const ProgressBar = ({ activeProgressSection }: ProgressBarProps) => {
    const router = useRouter()
    const path = usePathname()

    return (
        <div className="absolute top-0 right-0 w-full py-3 border-b bg-white z-30">
            <ul className='flex flex-row justify-center gap-4'>
                {progressStates.map((p, index) => {
                    const updateProgress = () => {
                        router.push(`${path}?progress=${p.section}`)
                    }

                    const active = activeProgressSection === p.section

                    return (
                        <button
                            key={index}
                            onClick={updateProgress}
                        >
                            <li className={`relative ${active ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                                {p.label}
                            </li>
                        </button>
                    )
                }
                )}
            </ul>
        </div>

    );
};

export default ProgressBar;
