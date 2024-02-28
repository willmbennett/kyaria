'use client'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { AppClass } from '../../../models/App';
import { updateJobAppAction } from '../../board/_action';
import AppItem from '../apps/AppItem';
import KanbanColumn from "./KanbanColumn";
import { boardItemType, jobStates } from '../../board/job-helper';

export default function Kanban(
    {
        boardItems,
    }: {
        boardItems: boardItemType[]
    }) {

    const router = useRouter()

    const [activeId, setActiveId] = useState<string>();
    const [apps, setApps] = useState<boardItemType[]>(boardItems);

    const handleDragEnd = async (event: DragEndEvent) => {
        // Logic to handle item drop, updating the state of jobApps accordingly
        //console.log(event)

        const newState = event.over?.id as string
        const appId = event.active.id.toString()

        //console.log('newState: ', newState)
        //console.log('appId: ', appId)

        if (newState && jobStates.includes(newState) && appId) {
            const dataUpdate = { state: newState }
            //console.log('dataUpdate: ', dataUpdate)
            const { jobApp } = await updateJobAppAction(appId, dataUpdate, "/")
            //console.log(jobApp)
            router.refresh()
        }
    };

    const handleDragOver = async (event: DragOverEvent) => {
        // Logic to handle item drop, updating the state of jobApps accordingly
        //console.log(event)

        const newState = event.over?.id as string
        const appId = event.active.id.toString()

        //console.log('newState: ', newState)
        //console.log('appId: ', appId)

        if (newState && jobStates.includes(newState) && appId) {

            updateAppState(appId, newState)
            //console.log(jobApp)
            router.refresh()
        }
    };

    const updateAppState = (appId: string, newState: string) => {
        const updatedApps = apps.map(app =>
            app.id === appId ? { ...app, state: newState } : app
        );

        setApps(updatedApps)
    }

    const handleDragStart = (event: DragStartEvent) => {
        // Logic to handle item drop, updating the state of jobApps accordingly
        //console.log(event.active.id.toString())
        setActiveId(event.active.id.toString());
    };

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    );

    const id = useId()

    return (
        <>
            <div className="w-full p-4">
                <div className="flex min-h-screen w-full gap-4 border border-slate-100 p-4 rounded-xl">
                    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver} id={id}>
                        <div id='kanban-container' className='relative overflow-x-scroll w-screen h-full'>
                            <div className='flex'>
                                {jobStates.map((state, index) =>
                                    <div key={index} className='flex flex-col gap-4 text-center'>
                                        <h5 className="text-xl font-medium leading-tight">{state}</h5>
                                        <div className='flex gap-2 h-full'>
                                            <KanbanColumn
                                                state={state}
                                                apps={apps}
                                                updateAppState={updateAppState}
                                                setApps={setApps}
                                                jobStates={jobStates}
                                            />
                                            {index < jobStates.length - 1 && <div className="h-full w-1 bg-slate-300 mx-2 shadow-xl"></div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <DragOverlay>
                            {activeId && apps.find(job => job.id === activeId) ? (
                                <AppItem
                                    app={apps.find(job => job.id === activeId) as boardItemType}
                                    apps={apps}
                                    updateAppState={updateAppState}
                                    jobStates={jobStates}
                                    setApps={setApps}
                                    state={apps.find(job => job.id === activeId)?.state || 'WISHLIST'}
                                />
                            ) : null}
                        </DragOverlay>

                    </DndContext>
                </div>
            </div>
        </>
    );
}