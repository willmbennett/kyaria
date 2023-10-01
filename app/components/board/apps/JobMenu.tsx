'use client';

import { useState } from "react";
import { usePathname } from 'next/navigation'

import Link from "next/link";

const ACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 bg-gray-200 font-bold items-center justify-center hover:bg-gray-600 hover:text-white dark:bg-neutral-200 dark:text-neutral-600 dark:hover:bg-neutral-200 dark:hover:text-neutral-600";
const INACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 font-bold items-center justify-center hover:bg-gray-600 hover:text-white dark:bg-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-200 dark:hover:text-neutral-600";

export default function JobMenu({ id }: { id: string }) {
  const [active, setActive] = useState(false);
  const pathname = usePathname()

  const pageList = [
    { label: "Job Description", path: `/board/apps/${id}` },
    { label: "Resume", path: `/board/apps/${id}/resume` },
    { label: "Cover Letter", path: `/board/apps/${id}/coverletter` },
    { label: "Emails", path: `/board/apps/${id}/emails` },
    { label: "Personal Story", path: `/board/apps/${id}/story` },
    { label: "Behavioral Interview", path: `/board/apps/${id}/experience` }
  ];

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="bg-white shadow-inner lg:shadow-md sticky bottom-0 w-full lg:top-60 z-50 bg-gray-200 p-4 lg:rounded-lg h-auto dark:bg-black dark:text-neutral-200">
      <div className={`${active ? ' ' : 'hidden'}  w-full lg:inline `}>
        <div className=" w-full items-center items-start  flex flex-col lg:h-auto py-2 dark:bg-black dark:text-neutral-200">
          {pageList.map((l: any, i: number) => {
            return (
              <div key={i}>
                <div className={l.path === pathname ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                  <Link href={l.path}>
                    <button
                      onClick={handleClick}
                      className="inline"
                    >
                      {l.label}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className='inline-flex lg:hidden shadow-md rounded-xl dark:bg-neutral-600 dark:text-neutral-200 w-full p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-800 cursor-pointer outline-none transition-colors duration-300'
        onClick={handleClick}
      >
        <div className="flex items-center justify-between w-full dark:md:bg-neutral-600 dark:md:text-neutral-200">
          <div className="flex items-center">
            {pageList[pageList.findIndex(p => p.path == pathname)] && (
              <span>
                {pageList[pageList.findIndex(p => p.path == pathname)].label}
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
