'use client';

import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import useAppNavigation from "../../../lib/hooks/use-app-section";
import { Button } from "../Button";
const ACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 bg-gray-200 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";


export default function JobMenu(
  { boardId,
    currentSection,
    filteredPages,
    activeProgressSection
  }: {
    boardId?: string
    currentSection: string,
    filteredPages: {
      label: string;
      section: string;
    }[],
    activeProgressSection: string
  }) {
  const router = useRouter()
  const path = usePathname()

  return (
    <div className="bg-white border w-full md:sticky md:top-60 p-4 lg:rounded-lg h-auto my-2 flex flex-col">
      <Button size='sm' variant='ghost' href={`/board${boardId ? `/${boardId}` : '/default'}`} className="mb-3">← Back to Board</Button>
      {filteredPages.map((l, i) => {
        const handleClick = () => {
          router.push(`${path}?section=${l.section}${activeProgressSection ? `&progress=${activeProgressSection}` : ''}`, { scroll: false })
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
      {/*
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
            */}
    </div>
  );
}
