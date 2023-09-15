'use client'
import Link from "next/link";
import { useState } from "react";

export default function Page() {

  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Demo Job",
      slug: "demo"
    },
  ]);

  const [newJobName, setNewJobName] = useState('');

  const createNewJob = () => {
    if (newJobName) {
      const newJob = {
        id: jobs.length + 1,
        name: newJobName,
        slug: `${newJobName.toLowerCase().replace(/ /g, "-")}`
      };
      setJobs([...jobs, newJob]);
      setNewJobName('');
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen bg-gray-100">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
          Your Jobs
        </h1>
        <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-md">
          <ul className="space-y-4 mb-8">
            {jobs.map((job) => (
              <li key={job.id} className="text-lg text-slate-700">
                <Link href={`/jobs/${job.slug}`}>
                  <span className="cursor-pointer hover:text-slate-900 hover:underline">
                    {job.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-4 flex">
            <input 
              type="text" 
              className="border p-2 flex-grow rounded-md"
              placeholder="New job name" 
              value={newJobName}
              onChange={(e) => setNewJobName(e.target.value)}
            />
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 ml-4"
              onClick={createNewJob}
            >
              Add
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
