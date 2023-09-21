'use client'
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import TextToJSON from "../../TextToJSON";
import { defaultFormInput, expectedJson, defaultTextInput, demoJSON, FormFields } from '../../../jobs/job-helper';
import NewJobAppForm from "./JobAppForm";
//import { ObjectId } from "mongodb";
import { useSession } from 'next-auth/react';
import { ProfileClass } from "../../../../models/Profile";
import { JobClass } from "../../../../models/Job";
import JobItem from "../JobItem";

export default function JobApps(
  {
    jobApps,
    profile
  }: {
    jobApps: any,
    profile: any
  }
) {
  const [creatingJobApp, setCreatingJobApp] = useState(false);
  const [values, setValues] = useState<FormFields>();
  const [formView, setFormView] = useState(false);
  const [inputTextView, setInputTextView] = useState(false);

  const handleCreateJobClick = () => {
    setCreatingJobApp(true)
    setInputTextView(true)
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center min-h-screen">
      {!creatingJobApp && (<>
        {jobApps && jobApps.map((jobApp: any) => (
          <div key={jobApp._id} className="w-full">
            <JobItem
              id={jobApp._id}
              resumeId={jobApp.userResume}
              jobTitle={jobApp.job.jobTitle}
              company={jobApp.job.company}
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
      {creatingJobApp && (
        <>
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
            Create a New Job
          </h1>

          <div className="mb-4 flex flex-col items-center">
            {inputTextView && (
              <TextToJSON
                setValues={setValues}
                expectedJson={expectedJson}
                //defaultTextInput=''
                defaultTextInput={defaultTextInput}
                demoJSON={demoJSON}
                inputTextType='resume'
                setFormView={setFormView}
                setInputTextView={setInputTextView}
              />
            )}
            {formView && (
              <NewJobAppForm
                defaultValue={defaultFormInput}
                values={values}
                setCreatingJob={setCreatingJobApp}
                userId={profile.userId}
                profile={profile}
                setFormView={setFormView}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
