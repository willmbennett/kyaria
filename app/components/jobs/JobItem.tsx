"use client"
import Link from "next/link";
import { parseISO, format } from 'date-fns';

export default function JobItem(
  { job
  }: {
    job: any
  }) {
  let { _id, jobTitle, company, location, employmentType, salaryRange, updatedAt } = job;
  const date = parseISO(updatedAt);
  return (
    <div className="text-left border-2 dark:border-neutral-500 rounded-xl block bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="flex p-2 justify-between w-full border-b-2 border-neutral-100 dark:border-neutral-600 dark:text-neutral-50">
        <div className="w-3/4 px-6 py-3 ">
        <h5 className="text-xl font-medium leading-tight ">
          {jobTitle}
        </h5>
        </div>
        <div className="w-1/4 py-3 ">
        {updatedAt && (<time dateTime={updatedAt}>{format(date, 'LLLL d, yyyy')}</time>)}
        </div>
      </div>
      <div className="p-6">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {company} - {location}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {employmentType ? employmentType : ""} {employmentType && salaryRange && ' | '} {salaryRange ? `${salaryRange}` : " "}
        </p>
        <div className="flex items-center justify-center">
          <Link href={`/jobs/${_id}`} target="_blank">
            <button
              type="button"
              className="inline-block rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              style={{ backgroundColor: '#00703C' }}
              data-te-ripple-init
              data-te-ripple-color="light">
              View Job
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};