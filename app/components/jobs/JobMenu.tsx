'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState } from "react";

export default function JobMenu({ jobName }: { jobName: string }) {
  const pathname = usePathname()
  const [active, setActive] = useState(false);

  const links = [
    { label: "Job Description", path: `/jobs/${jobName}` },
    { label: "Company", path: `/jobs/${jobName}/company` },
    { label: "Resume", path: `/jobs/${jobName}/resume` },
    { label: "Cover Letter", path: `/jobs/${jobName}/coverletter` },
    { label: "Story", path: `/jobs/${jobName}/story` },
    { label: "Experience", path: `/jobs/${jobName}/experience` },
  ];

  const handleClick = () => {
    setActive(!active);
  };

  const handleLinkClick = () => {
    active ? setActive(!active) : null
  };

  return (
    <div className="bg-white sticky bottom-0 lg:top-40 z-50 bg-white p-4 rounded-lg h-auto">
      <div
        className={`${active ? ' ' : 'hidden'}  w-full lg:inline`}
      >
        <div className=" w-full items-center items-start  flex flex-col lg:h-auto">
          {links.map((l, i) => {
            return (
              <button
                onClick={handleLinkClick}
                className="inline"
              >
                <Link key={i} href={l.path}>
                  <div
                    className={`px-4 py-2 text-sm text-gray-600 ${pathname === l.path
                      ? "bg-gray-100"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    {l.label}
                  </div>
                </Link>
              </button>
            );
          })}
        </div>
      </div>
      <button
        className='inline-flex lg:hidden shadow-md rounded-xl w-full p-3 hover:bg-gray-600 rounded lg:hidden text-gray-600 ml-auto hover:text-gray-600 outline-none'
        onClick={handleClick}
      >
        <span>
          {links[links.findIndex(p => p.path == pathname)].label}
        </span>
      </button>
    </div>
  );
}
