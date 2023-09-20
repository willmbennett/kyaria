'use client'
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import TextToJSON from "../TextToJSON";
import { defaultFormInput, expectedJson, defaultTextInput, demoJSON, FormFields } from '../../jobs/job-helper';
import NewJobForm from "./NewJobForm";
//import { ObjectId } from "mongodb";
import { useSession } from 'next-auth/react';
import { ProfileClass } from "../../../models/Profile";
import { JobClass } from "../../../models/Job";
import JobItem from "./JobItem";

export default function JobsForm(
  {
    jobs,
    profile
  }: {
    jobs: any,
    profile: any
  }
) {
  const [creatingJob, setCreatingJob] = useState(false);
  const [values, setValues] = useState<FormFields>();
  const [formView, setFormView] = useState(false);
  const [inputTextView, setInputTextView] = useState(false);

  const handleCreateJobClick = () => {
    setCreatingJob(true)
    setInputTextView(true)
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center min-h-screen">
      {!creatingJob && (<>
        {jobs?.map((job: any) => (
          <div key={job.id} className="w-full">
            <JobItem
              id={job.id}
              jobTitle={job.jobTitle}
              company={job.company}
            />
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded m-4 "
          onClick={handleCreateJobClick}>
          New Job
        </button>
      </>
      )}
      {creatingJob && (
        <>
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
            Create a New Job
          </h1>

          <div className="mb-4 flex flex-col items-center">
            {inputTextView && (
              <TextToJSON
                setValues={setValues}
                expectedJson={expectedJson}
                defaultTextInput=''
                //demoJSON={demoJSON}
                inputTextType='resume'
                setFormView={setFormView}
                setInputTextView={setInputTextView}
              />
            )}
            {formView && (
              <NewJobForm
                defaultValue={defaultFormInput}
                values={values}
                setCreatingJob={setCreatingJob}
                userId={profile.userId}
                userResume={profile}
                setFormView={setFormView}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
