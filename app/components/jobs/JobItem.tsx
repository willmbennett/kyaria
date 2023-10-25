"use client"
import Link from "next/link";
import { parseISO, format } from 'date-fns';
import { Button } from "../Button";

export default function JobItem(
  { job
  }: {
    job: any
  }) {
  let { _id, jobTitle, company, location, employmentType, salaryRange, createdAt, jobDescription } = job;
  const date = parseISO(createdAt);
  return (
    <div className="text-left my-3 border-2 rounded-xl block bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="flex p-2 justify-between w-full border-b-2 border-neutral-100 ">
        <div className="w-3/4 px-6 py-3 ">
        <h5 className="text-xl font-medium leading-tight ">
          {jobTitle}
        </h5>
        </div>
        <div className="w-1/4 py-3 ">
        {createdAt && (<time dateTime={createdAt}>{format(date, 'LLLL d, yyyy')}</time>)}
        </div>
      </div>
      <div className="p-6">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
          {company} {location ? `- ${location}` : ''}
        </h5>
        <p className="mb-4 text-base text-neutral-600">
          {employmentType ? employmentType : ""} {employmentType && salaryRange && ' | '} {salaryRange ? `${salaryRange}` : " "}
        </p>
        {jobDescription && (
        <p className="mb-4 text-base text-neutral-600">
          {jobDescription.slice(0,200)}...
        </p>
        )}
        <div className="flex items-center justify-center">
          <Link href={`/jobs/${_id}`} target="_blank">
            <Button
              type="button"
              size="md"
              >
              View Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};