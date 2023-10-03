'use client';

import { useState } from "react";
const ACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 bg-gray-200 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";

export default function DemoJobMenu(
  { currentSection, 
    setCurrentSection
  }: { 
    currentSection: string, 
    setCurrentSection: any
  }) {
  const [active, setActive] = useState(false);

  const pageList = [
    { label: "Job Description", section: 'jobDescription' },
    { label: "Resume", section: 'resume' },
    { label: "Cover Letter", section: 'coverLetter' },
    { label: "Emails", section: 'emails' },
    { label: "Personal Story", section: 'story' },
    { label: "Behavioral Interview", section: `experience` }
  ]

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="bg-white border sticky bottom-0 w-full lg:top-60 z-50 bg-gray-200 p-4 lg:rounded-lg h-auto">
      <div className={`${active ? ' ' : 'hidden'}  w-full lg:inline `}>
        <div className=" w-full items-center items-start  flex flex-col lg:h-auto py-2">
          {pageList.map((l: any, i: number) => {
            const handleClick = () => {
              setActive(!active);
              setCurrentSection(l.section)
            };
            return (
              <div key={i}>
                <div className={l.section === currentSection ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                    <button
                      onClick={handleClick}
                      className="inline"
                    >
                      {l.label}
                    </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className='inline-flex lg:hidden shadow-md rounded-xl w-full p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-800 cursor-pointer outline-none transition-colors duration-300'
        onClick={handleClick}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {pageList[pageList.findIndex(p => p.section == currentSection)] && (
              <span>
                {pageList[pageList.findIndex(p => p.section == currentSection)].label}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </div>
        </div>
      </button>

    </div>
  );
}
