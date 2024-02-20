'use client'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { AppClass } from '../../../models/App';
import { updateJobAppAction } from '../../board/_action';
import AppItem from '../apps/AppItem';
import KanbanColumn from "./KanbanColumn";
import { jobStates } from '../../board/job-helper';

export default function Kanban(
    {
        jobApps,
    }: {
        jobApps: Partial<AppClass>[]
    }) {

    const router = useRouter()

    const [activeId, setActiveId] = useState<string>();
    const [apps, setApps] = useState<Partial<AppClass>[]>(jobApps);

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
            app._id === appId ? { ...app, state: newState } : app
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
            <div className="box-border w-full mt-4 overflow-scroll rounded-xl">
                <div className="box-border inline-flex min-h-screen overflow-scroll p-4">
                    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver} id={id}>
                        {jobStates.map((state: string) =>
                            <KanbanColumn
                                key={state}
                                state={state}
                                jobApps={apps.filter(job => job.state === state)}
                                updateAppState={updateAppState}
                                jobStates={jobStates}
                            />)}
                        <DragOverlay>
                            {activeId && apps.find(job => job._id === activeId) ? (
                                <AppItem
                                    app={apps.find(job => job._id === activeId) as Partial<AppClass>}
                                    updateAppState={updateAppState}
                                    jobStates={jobStates}
                                    state={apps.find(job => job._id === activeId)?.state || 'WISHLIST'}
                                />
                            ) : null}
                        </DragOverlay>

                    </DndContext>
                </div>
            </div>
        </>
    );
}