'use client'
import { useState } from "react";
import NewAppTextInput from "../board/NewAppTextInput";
import { defaultFormInput, expectedJson, defaultTextInput, demoJSON, FormFields } from '../../board/job-helper';
import NewJobAppForm from "./JobAppForm";
//import { ObjectId } from "mongodb";
import AppItem from "./AppItem";
import Kanban from "./KanbanBoard";
import { Button } from "../Button";

export default function JobAppsList(
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

  const jobStates = ['WISHLIST', 'PHONE SCREEN', 'FIRST ROUND', 'SECOND ROUND', 'THIRD ROUND', 'FINAL ROUND', 'JOB OFFER', 'ACCEPTED']

  return (
    <div className="flex w-full mx-auto flex-col items-center min-h-screen">
      {!creatingJobApp && (<>
        <div className="w-full bg-white pt-10 g-white p-2 text-center items-center justify-center">
          <h1 className="sm:text-lg text-xl font-bold text-slate-900">
            Your Job Board
          </h1>
          <Button
            variant="solid"
            size="md"
            type="button"
            onClick={handleCreateJobClick}
            className="mt-3"
          >
            Add a New Job Post
          </Button>
        </div>
        <Kanban
          jobApps={jobApps}
          jobStates={jobStates}
        />
      </>)}
      {creatingJobApp && (
        <div className="w-full items-center text-center justify-center flex flex-col">
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 my-10">
            Create a New Job
          </h1>

          <div className="mb-4 flex flex-col items-center">
            {inputTextView && (
              <>
                <p>Paste text from the job posting here. No need to format it.</p>
                <p>We'll scan it and fill out a form for you.</p>
                <br />
                <NewAppTextInput
                  setValues={setValues}
                  expectedJson={expectedJson}
                  defaultTextInput={['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '') ? defaultTextInput : ''}
                  demoJSON={demoJSON}
                  inputTextType='resume'
                  setFormView={setFormView}
                  setInputTextView={setInputTextView}
                />
              </>
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
        </div>
      )}
    </div>
  );
}
