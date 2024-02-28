import Link from "next/link";
import { parseISO, format } from 'date-fns';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { updateJobAppAction } from "../../board/_action";
import { Button } from "../Button";
import { useDraggable } from '@dnd-kit/core';
import { AppClass } from "../../../models/App";
import { JobClass } from "../../../models/Job";
import { boardItemType } from "../../board/job-helper";

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

interface AppItemProps {
  app: boardItemType;
  apps: boardItemType[];
  updateAppState: (appId: string, newState: string) => void;
  setApps: Dispatch<SetStateAction<boardItemType[]>>
  jobStates: string[];
  state: string;
}

export default function AppItem(
  { app,
    apps,
    updateAppState,
    jobStates,
    setApps,
    state
  }: AppItemProps) {
  const router = useRouter()
  let { id, createdAt, jobTitle, company, location, employmentType, salaryRange } = app
  const date = parseISO(createdAt?.toString() || '');
  const [showOptions, setShowOptions] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // State to toggle visibility
  const [hasPrefetched, setHasPrefetched] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails); // Toggle function for details

  const optionsClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const updateAppActive = (appId: string, newActivity: boolean) => {
    const updatedApps = apps.map(app =>
      app.id === appId ? { ...app, active: newActivity } : app
    );

    setApps(updatedApps)
  }

  const handleClose: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await updateJobAppAction(id, { active: !app.active }, "/")
    updateAppActive(id, !app.active)
    //console.log(jobApp)
    router.refresh()
  };

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: app.id || ''
  });

  const handleViewPacketClick = () => {
    // Programmatically navigate to the desired URL
    router.push(`/apps/${id}`);
  };

  const handleMouseOver = () => {
    if (!hasPrefetched) {
      //console.log('prefetching')
      router.prefetch(`/apps/${id}`);
      setHasPrefetched(true);
    }
  };

  const optionsMenu = () => {
    return (
      <div className="relative inline-block text-left w-full">
        <div>
          <button
            onClick={optionsClick}
            type="button"
            className="inline-flex items-center justify-center w-full gap-x-2 rounded-md px-4 py-2 text-sm font-medium text-slate-700 shadow-sm bg-slate-50 hover:text-slate-900 hover:bg-slate-200 hover:ring-1 hover:ring-slate-400"
            id="menu-button" aria-expanded="true" aria-haspopup="true"
          >
            {state}
            <svg className={`h-5 w-5 text-gray-400 duration-300 ${showOptions && 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {showOptions &&
          <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-1" role="none">
              {
                jobStates.map((l, i) => {
                  const selectOption = async () => {
                    //console.log('made it to click')
                    setShowOptions(!showOptions);
                    const newState = jobStates[i]
                    const stateUpdate = { state: newState }
                    //console.log('stateUpdate: ', newState)
                    updateAppState(id.toString(), jobStates[i])
                    const { jobApp } = await updateJobAppAction(id.toString(), stateUpdate, "/")
                    //console.log(jobApp)
                    router.refresh()
                  };

                  return (
                    <button
                      key={i}
                      onClick={selectOption}
                      className={`text-gray-700 w-full block px-4 py-2 text-sm ${app.state === jobStates[i] ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
                    >
                      {jobStates[i]}
                    </button>
                  );
                })
              }
            </div>
          </div>
        }
      </div>
    )
  }


  return (
    <div className={`text-left w-80 border p-4 flex flex-col gap-2 border-gray-200 rounded-lg block transition-shadow duration-300 ease-in-out ${app.active ? "bg-white" : "bg-gray-100"} shadow-sm hover:shadow-md`}>
      <div
        ref={setNodeRef}
        onMouseOver={handleMouseOver}
        {...listeners}
        {...attributes}
        className="cursor-pointer flex flex-col gap-2"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="flex justify-between text-sm text-gray-600">
          <p>
            {company}
          </p>
          <time dateTime={createdAt.toString()}>{format(date, 'PP')}</time>
        </div>

        <div>
          <h5 className="text-sm sm:text-base md:text-lg font-semibold truncate leading-none">
            {jobTitle}
          </h5>
        </div>

        <div className="flex w-full gap-2 items-center">
          {/* Toggle Details Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDetails}
            className="text-sm text-gray-700 hover:bg-gray-100 focus:outline-none rounded-md px-3 py-2"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>

          {/* View Packet Button */}
          <Button
            variant="solid"
            size="sm"
            onClick={handleViewPacketClick}
            className="text-sm px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            View Packet
          </Button>

          {/* Active/Inactive Toggle Button */}
          <button
            onClick={handleClose}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-500 hover:text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              {/* Replace with appropriate icon */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={app.active ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
            </svg>
            <span className="sr-only">{app.active ? "Mark Inactive" : "Mark Active"}</span>
          </button>
        </div>

        {showDetails &&
          <div className="flex flex-col bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="text-sm text-gray-600">
                {createdAt && (
                  <div className="mb-2">
                    <span className="font-medium">Location:</span> {location}
                  </div>
                )}
                <div>
                  <span className="font-medium">Employment Type:</span> {employmentType ? employmentType : "N/A"}
                </div>
                {salaryRange && (
                  <div className="mt-1">
                    <span className="font-medium">Salary Range:</span> {salaryRange}
                  </div>
                )}
              </div>
            </div>
          </div>

        }
      </div>
      {optionsMenu()}
    </div >


  );
};

