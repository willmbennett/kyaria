import { useDroppable } from '@dnd-kit/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { AppClass } from '../../../models/App';
import AppItem from "../apps/AppItem";
import { boardItemType } from '../../board/job-helper';

interface KanbanColumnProps {
    state: string;
    apps: boardItemType[];
    jobStates: string[];
    updateAppState: (appId: string, newState: string) => void;
    setApps: Dispatch<SetStateAction<boardItemType[]>>
}

export default function KanbanColumn({ state, apps, updateAppState, jobStates, setApps }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id: state });

    const jobApps = apps.filter(job => job.state === state)

    const activeApps = jobApps.filter(app => app.active);
    const inActiveApps = jobApps.filter(app => !app.active);
    const [showInactive, setShowInactive] = useState(false);

    const toggleInactive = () => {
        setShowInactive(!showInactive);
    };

    const columnStyle = isOver ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white";

    return (
        <div ref={setNodeRef} className={`w-80 p-2 text-center items-center ${columnStyle}`}>
            <div className={`transition-opacity ${isOver ? 'opacity-0' : ''}`}>
                <div className='flex flex-col gap-2'>
                    {activeApps && activeApps.map(app => (
                        <AppItem
                            key={app.id}
                            app={app}
                            apps={apps}
                            updateAppState={updateAppState}
                            jobStates={jobStates}
                            setApps={setApps}
                            state={state}
                        />
                    )
                    )}
                </div>
                {inActiveApps.length > 0 && (<>
                    <h5 className="text-xl font-medium leading-tight py-2">
                        Inactive Apps
                    </h5>
                    <button
                        className='inline-flex mb-2 w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        onClick={toggleInactive}
                    > Show Inactive
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className='flex flex-col gap-2'>
                        {showInactive && inActiveApps.map(app => (
                            <AppItem
                                key={app.id}
                                app={app}
                                apps={apps}
                                updateAppState={updateAppState}
                                jobStates={jobStates}
                                setApps={setApps}
                                state={state}
                            />
                        ))}
                    </div>
                </>)}
            </div>
        </div>
    );
}
