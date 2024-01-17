import Link from "next/link";
import { parseISO, format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { updateJobAppAction } from "../../board/_action";
import { Button } from "../Button";
import { useDraggable } from '@dnd-kit/core';
import { AppClass } from "../../../models/App";
import { JobClass } from "../../../models/Job";

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

export default function AppItem(
  { app,
    updateAppState,
    jobStates,
    state
  }: {
    app: Partial<AppClass>,
    updateAppState: (appId: string, newState: string) => void;
    jobStates: string[],
    state: string
  }) {
  const router = useRouter()
  let { _id, job, createdAt } = app as AppClass
  let { jobTitle, company, location, employmentType, salaryRange } = job as JobClass;
  const date = parseISO(createdAt?.toString() || '');
  const [showOptions, setShowOptions] = useState(false);
  const [hasPrefetched, setHasPrefetched] = useState(false);


  const optionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleClose = async () => {
    const { jobApp } = await updateJobAppAction(_id.toString(), { active: !app.active }, "/")
    //console.log(jobApp)
    router.push(`/board`, { scroll: false })
  };

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: app._id?.toString() || ''
  });

  const handleViewPacketClick = () => {
    // Programmatically navigate to the desired URL
    router.push(`/apps/${_id}`);
  };

  const handleMouseOver = () => {
    if (!hasPrefetched) {
      //console.log('prefetching')
      router.prefetch(`/apps/${_id}`);
      setHasPrefetched(true);
    }
  };


  return (
    <div onMouseOver={handleMouseOver} className={`mt-2 text-left border rounded-xl block ${app.active ? "bg-white" : "bg-slate-200"} shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-200`}>
      <Link href={`/apps/${_id}`} passHref>
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="flex p-2 justify-between w-full">

            <div className="w-full py-1 ">
              <h5 className="text-lg font-medium leading-tight ">
                {jobTitle}
              </h5>
            </div>
            <div className="remove text-right">
              <button onClick={handleClose} className="p-1">
                <svg fill="#ffcccb" height="20px" width="20px"
                  viewBox="0 0 20 20" xmlSpace="preserve">
                  <path d="M6.414 5A1 1 0 1 0 5 6.414L10.586 12 5 17.586A1 1 0 1 0 6.414 19L12 13.414 17.586 19A1 1 0 1 0 19 17.586L13.414 12 19 6.414A1 1 0 1 0 17.586 5L12 10.586 6.414 5Z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full px-2 pb-2 text-xs text-left border-b-2 border-neutral-100">
            {createdAt && (<time dateTime={createdAt.toString()}>{format(date, 'MM/dd')}</time>)}
          </div>
          <div className="p-3">
            <h5
              className="mb-2 text-md font-medium leading-tight">
              {company} - {location}
            </h5>
            <p className="mb-2 text-sm text-base text-neutral-600">
              {employmentType ? employmentType : ""} {employmentType && salaryRange && ' | '} {salaryRange ? `${salaryRange}` : " "}
            </p>
            <div className="flex items-center justify-center" data-no-dnd="true">
              <Button
                variant="solid"
                size="md"
                type="button"
                onClick={handleViewPacketClick}
              >
                View packet
              </Button>
            </div>
          </div>
        </div>
      </Link>
      <div className="relative inline-block text-left w-full">
        <div>
          <button
            onClick={optionsClick}
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            {state}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {showOptions && (
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
                    updateAppState(_id.toString(), jobStates[i])
                    const { jobApp } = await updateJobAppAction(_id.toString(), stateUpdate, "/")
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
        )}
      </div>
    </div >
  );
};