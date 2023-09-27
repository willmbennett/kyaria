'use client';

import { useState } from "react";
import JobMenuButton from "./components/MenuButton";

export default function JobMenu({ section, setSection }: { section: string, setSection: any }) {
  const [active, setActive] = useState(false);

  const links = [
    { label: "Job Description", section: `jobDescription` },
    { label: "Resume", section: `userResume` },
    { label: "Cover Letter", section: `userCoverLetter` },
    { label: "Emails", section: `emails` },
    { label: "Story", section: `userStory` },
    { label: "Experience", section: `userExperience` }
  ];

  /*
    { label: "Company", path: `/jobs/${id}/company` },
    
    { label: "Experience", path: `/jobs/${id}/experience` },
    */

  const handleClick = () => {
    setActive(!active);
  };

  const handleLinkClick = (e: any) => {
    active ? setActive(!active) : null
    setSection(e)
  };

  return (
    <div className="bg-white shadow-inner lg:shadow-md sticky bottom-0 w-full lg:top-60 z-50 bg-gray-200 lg:bg-white p-4 rounded-lg h-auto">
      <div
        className={`${active ? ' ' : 'hidden'}  w-full lg:inline`}
      >
        <div className=" w-full items-center items-start  flex flex-col lg:h-auto py-2">
          {links.map((l, i) => {
            return (
              <div key={i}>
                <JobMenuButton
                  label={l.label}
                  section={l.section}
                  currentSection={section}
                  setSection={setSection}
                  active={active}
                  setActive={setActive}
                />
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
            <span>
              {links[links.findIndex(p => p.section == section)].label}
            </span>
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
