import { useDroppable } from '@dnd-kit/core';
import { boardItemType, jobStates } from '../../board/job-helper';
import { BoardClass } from '../../../models/Board';
import { KanbanItemList } from './KanbanItemList';
import { useState } from 'react';


interface KanbanColumnProps {
    index: number;
    state: string;
    apps: boardItemType[];
    updateAppState: (appId: string, newState: { [key: string]: any }) => void
    boards: BoardClass[]
    removeApp: (id: string) => Promise<void>;
}

export default function KanbanColumn(
    { index,
        state,
        apps,
        updateAppState,
        boards,
        removeApp
    }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id: state });

    const jobApps = apps.filter(job => job.state === state)

    const activeApps = jobApps.filter(app => app.active);
    const inActiveApps = jobApps.filter(app => !app.active);
    const [showInactive, setShowInactive] = useState(false);

    const toggleInactive = () => {
        setShowInactive(!showInactive);
    };

    const columnStyle = isOver ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white";
    const transitionItems = isOver ? 'hidden' : 'flex flex-col'

    return (
        <div key={index} id={`kanban-column-${index}`} className='flex h-full'>
            <div
                ref={setNodeRef}
                className={`relative h-full w-80 overflow-y-scroll ${columnStyle}`}
            >
                <div className='w-full bg-white pb-2 sticky top-0 text-center pt-16 z-10 shadow-md'>
                    <h5 className="text-xl font-medium leading-tight">{state}</h5>
                </div>
                <div className={`flex w-full flex-col gap-4 p-1 items-center ${transitionItems}`}>
                    <KanbanItemList
                        apps={activeApps}
                        updateAppState={updateAppState}
                        state={state}
                        boards={boards}
                        removeApp={removeApp}
                    />
                    {inActiveApps.length > 0 &&
                        <div className='text-center w-full'>
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
                            {showInactive &&
                                <KanbanItemList
                                    apps={inActiveApps}
                                    updateAppState={updateAppState}
                                    state={state}
                                    boards={boards}
                                    removeApp={removeApp}
                                />}
                        </div>
                    }
                </div>
            </div>
            {index < jobStates.length - 1 && <div className="mt-24 h-full w-1 bg-slate-100 mx-4 shadow-xl"></div>}
        </div>
    );
}
