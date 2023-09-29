'use client'
import { useState } from "react";
import TextToJSON from "../../TextToJSON";
import { defaultFormInput, expectedJson, defaultTextInput, demoJSON, FormFields } from '../../../board/job-helper';
import NewJobAppForm from "./JobAppForm";
//import { ObjectId } from "mongodb";
import AppItem from "./AppItem";

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
    <div className="flex w-full mx-auto flex-col items-center min-h-screen px-4">
      {!creatingJobApp && (<>
        <div className="w-full sticky bg-white top-20 mt-5 g-white p-2 text-center dark:bg-black dark:md:bg-neutral-600 dark:md:rounded-xl z-40 items-center justify-center">
          <h1 className="sm:text-lg text-xl font-bold text-slate-900 dark:text-white">
            Your Job Board
          </h1>
          <button
            className="inline-block rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            style={{ backgroundColor: '#00703C' }}
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleCreateJobClick}>
            New Job
          </button>
        </div>
        <div className="box-border w-full mt-4 overflow-scroll rounded-xl bg-neutral-100">
          <div className="box-border inline-flex min-h-screen overflow-scroll p-4">
            {jobStates.map((state: string) => {
              const apps = jobApps.filter((app: any) => app.state == state);
              return (
                <div className="w-80 rounded-xl bg-white mx-2 text-center items-center p-2" key={state}>
                    <h5 className="text-xl font-medium leading-tight py-2">
                      {state}
                    </h5>
                  {apps && apps.map((app: any) => (
                    <div key={app._id} className="w-full">
                      <AppItem
                        app={app}
                        jobStates={jobStates}
                      />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </>
      )}
      {creatingJobApp && (
        <>
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
            Create a New Job
          </h1>

          <div className="mb-4 flex flex-col items-center">
            {inputTextView && (
              <>
                <p>Paste text from the job posting here. No need to format it.</p>
                <p>We use AI to scan your text.</p>
                <br />
                <TextToJSON
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
        </>
      )}
    </div>
  );
}
