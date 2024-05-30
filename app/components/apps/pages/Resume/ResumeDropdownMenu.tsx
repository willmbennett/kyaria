'use client'
import React, { FC, useState } from 'react';

interface IResumeDropdownMenuProps {
    selectedResumeId: string;
    selectResume: (id: string) => void;
    resumes: { name: string, id: string }[];
}

const ResumeDropdownMenu: FC<IResumeDropdownMenuProps> = ({
    selectedResumeId,
    selectResume,
    resumes,
}) => {
    const [showOptions, setShowOptions] = useState(false);
    const optionsClick = () => setShowOptions(!showOptions);

    // Find the selected resume by its ID to display its name
    const selectedResume = resumes.find(resume => resume.id === selectedResumeId);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={optionsClick}
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded={showOptions ? 'true' : 'false'}
            >
                {selectedResume ? selectedResume.name : "Select a resume"}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {showOptions && (
                <div
                    className="absolute right-0 z-10 mt-2 w-full origin-top-right max-h-96 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {resumes.map((resume, index) => (
                            <button
                                key={resume.id.toString()}
                                onClick={() => {
                                    selectResume(resume.id.toString());
                                    setShowOptions(false);
                                }}
                                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${selectedResumeId === resume.id.toString() ? 'bg-gray-100' : ''
                                    }`}
                                role="menuitem"
                            >
                                {resume.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeDropdownMenu;