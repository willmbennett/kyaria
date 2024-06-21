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
                        <li className={`relative ${active ? 'font-bold' : 'text-purple-dark dark:text-white'}`}>
                            {p.label}
                        </li>
                    </button>
                )
            }
            )}
        </ul>
    );
};

export default ProgressBar;
