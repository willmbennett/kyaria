'use client'
import Link from "next/link";
import { useState, useContext } from "react";
import TextToJSON from "../components/TextToJSON";
import { expectedJson, defaultTextInput, demoJSON, FormFields } from './job-helper';
import NewJobForm from "../components/jobs/NewJobForm";
//import { ObjectId } from "mongodb";
import { JobsContext } from "../components/jobs/JobsContext";

export default function JobPage() {
  let {userProfile, userJobs } = useContext(JobsContext)
  const [creatingJob, setCreatingJob] = useState(false);
  const [defaultValue, setDefaultValue] = useState<FormFields>(expectedJson);

  const [newJob, setNewJob] = useState('');

  const handleCreateJobClick = () => {
    setCreatingJob(true)
  };


  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen bg-gray-100">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-md">
          {!creatingJob && (
            <>
              <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
                Your Jobs
              </h1>
              <ul className="space-y-4 mb-8">
                {userJobs.map((job) => (
                  <li key={job._id} className="text-lg text-slate-700">
                    <Link href={`/jobs/${job._id}`}>
                      <span className="cursor-pointer hover:text-slate-900 hover:underline">
                        {job.jobTitle}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleCreateJobClick}> New Job</button>
            </>
          )}
          {creatingJob && (
            <>
            <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
          Create a New Job
        </h1>
        
            <div className="mb-4 flex">
              {defaultValue.jobTitle.length == 0 && (
                <TextToJSON
                  setDefaultValue={setDefaultValue}
                  expectedJson={expectedJson}
                  defaultTextInput={defaultTextInput}
                  demoJSON={demoJSON}
                  inputTextType='resume'
                />
              )}
              {defaultValue.jobTitle.length > 0 && (
                <NewJobForm
                  defaultValue={defaultValue}
                  setCreatingJob={setCreatingJob}
                  userId={userProfile.userId}
                />
              )}
            </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
