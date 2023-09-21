"use client"
import Link from "next/link";
import { deleteJobAppAction } from "../../jobs/apps/[id]/_action";

export default function JobItem(
  { id, 
    resumeId,
    jobTitle, 
    company 
  }: { 
    id: string, 
    resumeId: string,
    jobTitle: string, 
    company: string 
  }) {

  async function deleteJob() {
    console.log("deleting Job")
    console.log(id)
    console.log(resumeId)
    if (id && resumeId) {
      await deleteJobAppAction({
        id: id,
        resumeId: resumeId,
        path: "/",
      });
    }
  }

  return (
    <div className="flex items-center justify-center w-full max-w-2xl bg-white rounded-xl shadow-md space-x-2 mb-2">
      <Link href={`jobs/apps/${id}`}>
        <span className='flex items-center p-2 mr-4 '>
          <span className='text-xl text-gray-600 font-bold'>
            {jobTitle} - {company}
          </span>
        </span>
      </Link>
      <div className="flex items-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded m-4"
          onClick={deleteJob}>
          Delete
        </button>
      </div>
    </div>
  );
};