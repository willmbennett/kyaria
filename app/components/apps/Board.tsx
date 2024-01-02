'use client'
import { useState } from "react";
import CreateJobApp from "../board/CreateJobApp";
//import { ObjectId } from "mongodb";
import Kanban from "./KanbanBoard";
import { Button } from "../Button";
import { AppClass } from "../../../models/App";
import { ProfileClass } from "../../../models/Profile";

interface resumeTestProps {
  jobApps: Partial<AppClass>[],
  profile: Partial<ProfileClass>,
  activeSubscription: boolean
}

export default function Board(
  {
    jobApps,
    profile,
    activeSubscription
  }: resumeTestProps
) {
  const [creatingJobApp, setCreatingJobApp] = useState(false);

  const handleCreateJobClick = () => {
    setCreatingJobApp(true)
  };

  const jobStates = ['WISHLIST', 'PHONE SCREEN', 'FIRST ROUND', 'SECOND ROUND', 'THIRD ROUND', 'FINAL ROUND', 'JOB OFFER', 'ACCEPTED']

  return (
    <div className="flex w-full mx-auto flex-col items-center min-h-screen">
      {!creatingJobApp && (<>
        <div className="w-full bg-white pt-10 g-white p-2 text-center items-center justify-center">
          <h1 className="sm:text-lg text-xl font-bold text-slate-900">
            Your Job Board
          </h1>
          {activeSubscription ?
            <Button
              variant="solid"
              size="md"
              type="button"
              onClick={handleCreateJobClick}
              className="mt-3"
            >
              Add a New Job Post
            </Button>
            :
            <Button
              variant="solid"
              size="md"
              type="button"
              href="/pricing"
              className="mt-3"
            >
              Subscribe to Add Job Posts
            </Button>
          }
        </div>
        <Kanban
          jobApps={jobApps}
          jobStates={jobStates}
        />
      </>)}
      {creatingJobApp && profile.userId && (
        <div className="w-full items-center text-center justify-center flex flex-col">
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 my-10">
            Create a New Job
          </h1>
          <div className="mb-4 flex flex-col items-center">
            <p>Add in a job post link, it works best with the original job post (not linkedin, indeed, etc.)</p>
            <br />
            <CreateJobApp
              userId={profile.userId}
              profile={profile}
              setCreatingJobApp={setCreatingJobApp}
            />
          </div>
        </div>
      )}
    </div>
  );
}
