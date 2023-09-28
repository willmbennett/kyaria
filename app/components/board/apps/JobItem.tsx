"use client"
import Link from "next/link";
import { deleteJobAppAction } from "../../../board/apps/[id]/_action";

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
    //console.log("deleting Job")
    //console.log(id)
    //console.log(resumeId)
    if (id && resumeId) {
      await deleteJobAppAction({
        id: id,
        resumeId: resumeId,
        path: "/",
      });
    }
  }

  return (
    <div className="flex items-center justify-between w-full max-w-2xl bg-white rounded-xl shadow-md hover:shadow-lg mb-2 transition-shadow duration-300">
      {/* Job title and company name */}
      <div className="flex items-center flex-grow p-4 hover:bg-gray-100 rounded-tl-xl rounded-bl-xl cursor-pointer">
        <Link href={`board/apps/${id}`}>
          <span className="text-xl text-gray-700 font-semibold hover:text-gray-800">
            {jobTitle} - {company}
          </span>
        </Link>
      </div>

      <div className="border-l p-2 bg-gray-50 rounded-tr-xl rounded-br-xl">
        <button
          className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={deleteJob}>
          Delete
        </button>
      </div>
    </div>


  );
};