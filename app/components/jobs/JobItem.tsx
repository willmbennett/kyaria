"use client"
import { deleteJobAction } from "../../jobs/[id]/_action";

export default function JobItem({ id, jobTitle, company }: {id: string, jobTitle:string, company: string}) {

    async function deleteJob() {
        if (id) {
            await deleteJobAction({
                id: id,
                path: "/",
            });
        }
    }

  return (
    <div className="flex items-center space-x-2 mb-2">
      <p>
        {jobTitle} - {company}
      </p>
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