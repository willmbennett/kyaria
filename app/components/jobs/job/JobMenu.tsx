'use client';

import { useState } from "react";
import JobMenuButton from "./MenuButton";

export default function JobMenu({ section, setSection }: { section: string, setSection: any }) {
  const [active, setActive] = useState(false);

  const links = [
    { label: "Job Description", section: `jobDescription` },
    { label: "Resume", section: `userResume` },
    { label: "Cover Letter", section: `userCoverLetter` },
    { label: "Story", section: `userStory` },
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
    <div className="bg-white sticky bottom-0 lg:top-40 z-50 bg-white p-4 rounded-lg h-auto">
      <div
        className={`${active ? ' ' : 'hidden'}  w-full lg:inline`}
      >
        <div className=" w-full items-center items-start  flex flex-col lg:h-auto">
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
        className='inline-flex lg:hidden shadow-md rounded-xl w-full p-3 hover:bg-gray-600 rounded lg:hidden text-gray-600 ml-auto hover:text-gray-600 outline-none'
        onClick={handleClick}
      >
        <span>
          {links[links.findIndex(p => p.section == section)].label}
        </span>
      </button>
    </div>
  );
}
