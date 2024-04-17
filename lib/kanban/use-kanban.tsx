import { useCallback, useId, useState } from "react";
import { boardItemType, jobStates } from "../../app/board/job-helper";
import { DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { deleteJobAppAction, updateJobAppAction } from "../../app/apps/_action";
import { usePathname } from "next/navigation";
import { updateBoardAction } from "../../app/board/_action";

interface UseKanbanProps {
    boardItems: boardItemType[];
    boardId?: string;
}

const logging = false

export const useKanban = ({ boardItems, boardId }: UseKanbanProps) => {
    const path = usePathname()
    const [activeId, setActiveId] = useState<string>();
    const [apps, setApps] = useState<boardItemType[]>(boardItems);
    const [searchValue, setSearchValue] = useState('');
    const id = useId()
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
            const { jobApp } = await updateJobAppAction(appId, dataUpdate)
            //console.log(jobApp)
            //router.refresh()
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
            const stateUpdate = { state: newState }
            updateAppState(appId, stateUpdate)
            //console.log(jobApp)
            //router.refresh()
        }
    };

    const updateAppState = (appId: string, newState: { [key: string]: any }) => {
        const updatedApps = apps.map(app =>
            app.id === appId ? { ...app, ...newState } : app
        );
        setApps(updatedApps);
    };


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

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setSearchValue(value);

            const filteredApps = apps.filter((item) =>
                Object.values(item).some(
                    (prop) =>
                        typeof prop === 'string' &&
                        prop.toLowerCase().includes(value.toLowerCase())
                )
            );

            setApps(filteredApps);
        },
        []
    );

    // Only include apps on the board

    const boardApps = boardId ? apps.filter(app => app.boardId == boardId) : apps

    const updateBoardTitle = async (title: string) => {
        if (boardId) {
            const path = `/board/${boardId}`
            const updateData = { name: title }
            await updateBoardAction(boardId, updateData, path)
        }
    }

    const removeApp = async (id: string) => {
        if (logging) console.log('Made it to [removeApp] with id: ', id)
        const filteredApps = apps.filter((item) =>
            item.id != id
        );

        setApps(filteredApps);

        await deleteJobAppAction({ id, path })
    }

    return { activeId, boardApps, searchValue, id, handleDragEnd, handleDragOver, updateAppState, handleDragStart, sensors, handleChange, updateBoardTitle, removeApp }
}