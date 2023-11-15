'use client';
import React from 'react';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface ProgressBarProps {
    progressStates: string[],
    currentProgress: string
    setCurrentCurrentProgress: any
}

const ProgressBar: React.FC<ProgressBarProps> = (
    {
        progressStates,
        currentProgress,
        setCurrentCurrentProgress
    }) => {
    const router = useRouter()
    const path = usePathname()

    return (
        <div className="text-center p-2">
            <ul className='flex flex-row justify-center gap-4'>
                {progressStates.map((p: string, index, array) => {
                    const updateProgress = () => {
                        setCurrentCurrentProgress(p)
                        router.push(path, { scroll: false })
                    }

                    return (
                        <button
                            key={p}
                            onClick={updateProgress}
                        >
                            <li className={`relative ${currentProgress === p ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                                {p}
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
