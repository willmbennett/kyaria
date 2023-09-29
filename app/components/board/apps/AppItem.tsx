"use client"
import Link from "next/link";
import { parseISO, format } from 'date-fns';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateJobAppAction } from "../../../board/apps/[id]/_action";

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

export default function AppItem(
  { app,
    jobStates
  }: {
    app: any,
    jobStates: string[]
  }) {
  const router = useRouter()
  let { job, createdAt } = app
  let { _id, jobTitle, company, location, employmentType, salaryRange } = job;
  const date = parseISO(createdAt);
  const [showOptions, setShowOptions] = useState(false);

  const optionsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="text-left border-2 dark:border-neutral-500 rounded-xl block bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div>
        <Link href={`/jobs/${_id}`} target="_blank">
          <div className="flex p-3 justify-between w-full border-b-2 border-neutral-100 dark:border-neutral-600 dark:text-neutral-50">
            <div className="w-4/5 py-1 ">
              <h5 className="text-lg font-medium leading-tight ">
                {jobTitle}
              </h5>
            </div>
            <div className="w-1/5 py-2 text-xs text-right">
              {createdAt && (<time dateTime={createdAt}>{format(date, 'MM/dd')}</time>)}
            </div>
          </div>
          <div className="p-3">
            <h5
              className="mb-2 text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {company} - {location}
            </h5>
            <p className="mb-2 text-sm text-base text-neutral-600 dark:text-neutral-200">
              {employmentType ? employmentType : ""} {employmentType && salaryRange && ' | '} {salaryRange ? `${salaryRange}` : " "}
            </p>
            <div className="flex items-center justify-center">

              <button
                type="button"
                className="inline-block rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                style={{ backgroundColor: '#00703C' }}
                data-te-ripple-init
                data-te-ripple-color="light">
                View Job
              </button>
            </div>
          </div>
        </Link>
      </div>
      <div className="relative inline-block text-left w-full">
        <div>
          <button
            onClick={optionsClick}
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            {app.state}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {showOptions && (
          <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-1" role="none">
              {
                jobStates.map((l, i) => {
                  const selectOption = async () => {
                    setShowOptions(!showOptions);
                    const { jobApp } = await updateJobAppAction(app._id, {state: jobStates[i]}, "/")
                    //console.log(jobApp)
                    router.push(`/board`, { scroll: false })
                  };

                  return (
                    <button
                      key={i}
                      onClick={selectOption}
                      className={`text-gray-700 w-full block px-4 py-2 text-sm ${app.state === jobStates[i] ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
                    >
                      {jobStates[i]}
                    </button>
                  );
                })
              }
            </div>
          </div>
        )}
      </div>
    </div >
  );
};