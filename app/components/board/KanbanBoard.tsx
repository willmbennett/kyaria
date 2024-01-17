'use client'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { AppClass } from '../../../models/App';
import { updateJobAppAction } from '../../board/_action';
import AppItem from '../apps/AppItem';
import KanbanColumn from "./KanbanColumn";

const jobStates = ['WISHLIST', 'APPLIED', 'PHONE SCREEN', 'FIRST ROUND', 'SECOND ROUND', 'THIRD ROUND', 'FINAL ROUND', 'JOB OFFER', 'ACCEPTED']

export default function Kanban(
    {
        jobApps,
    }: {
        jobApps: Partial<AppClass>[]
    }) {

    const router = useRouter()

    const [activeId, setActiveId] = useState<string>();

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
            setAppStates(prev => ({ ...prev, [appId]: newState }));
            const { jobApp } = await updateJobAppAction(appId, dataUpdate, "/")
            //console.log(jobApp)
            router.refresh()
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        // Logic to handle item drop, updating the state of jobApps accordingly
        //console.log(event.active.id.toString())
        setActiveId(event.active.id.toString());
    };

    const id = useId()

    const initialStateMapping = jobApps.reduce((acc, job) => {
        // Ensure that _id and state are defined
        if (job._id && job.state) {
            const idAsString = job._id.toString(); // Convert ObjectId to string
            acc[idAsString] = job.state;
        }
        return acc;
    }, {} as { [key: string]: string });


    const [appStates, setAppStates] = useState(initialStateMapping);

    return (
        <>
            <div className="box-border w-full mt-4 overflow-scroll rounded-xl">
                <div className="box-border inline-flex min-h-screen overflow-scroll p-4">
                    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} id={id}>
                        {jobStates.map((state: string) => 
                        <KanbanColumn 
                        key={state} 
                        state={state} 
                        jobApps={jobApps.filter(job => appStates[job._id?.toString() || ''] === state)} 
                        jobStates={jobStates} 
                        />)}
                        <DragOverlay>
                            {activeId && jobApps.find(job => job._id === activeId) ? (
                                <AppItem
                                    app={jobApps.find(job => job._id === activeId) as Partial<AppClass>}
                                    jobStates={jobStates}
                                    state={appStates[activeId]}
                                />
                            ) : null}
                        </DragOverlay>

                    </DndContext>
                </div>
            </div>
        </>
    );
}