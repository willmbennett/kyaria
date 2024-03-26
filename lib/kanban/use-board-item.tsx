'use client'
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { DropDownItemType, boardItemType, jobStates } from "../../app/board/job-helper";
import { updateJobAppAction } from "../../app/apps/_action";
import { usePathname, useRouter } from "next/navigation";
import { BoardClass } from "../../models/Board";

interface UseBoardItemProps {
    id: string;
    isActive: boolean
    updateAppState: (appId: string, newState: { [key: string]: any }) => void
    boards: BoardClass[];
    state: string;
}

export const useBoardItem = ({
    id,
    isActive,
    updateAppState,
    boards,
    state
}: UseBoardItemProps) => {
    const router = useRouter()
    const path = usePathname()
    const [showDetails, setShowDetails] = useState(false); // State to toggle visibility
    const [hasPrefetched, setHasPrefetched] = useState(false);

    const handleClose: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const stateUpdate = { active: !isActive }
        updateAppState(id, stateUpdate)
        await updateJobAppAction(id, stateUpdate, "/")
        //console.log(jobApp)
        router.refresh()
    };

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

    const toggleDetails = () => setShowDetails(!showDetails); // Toggle function for details


    // Handle changing which board an app is on

    const boardOptions: DropDownItemType[] = boards.map(board => ({
        name: board.name,
        id: board._id.toString()
    }))

    const handleBoardOptionClick = async (boardId: string) => {
        console.log('made it to click with boardId: ', boardId)
        const stateUpdate = { boardId }
        console.log('stateUpdate: ', stateUpdate)
        updateAppState(id, stateUpdate)
        await updateJobAppAction(id, stateUpdate, path)
        router.refresh()
    };

    // Handle board item state updates

    const stateOptions: DropDownItemType[] = jobStates.map((jobState, index) => ({
        name: jobState,
        id: index.toString()
    }))

    const currentStateId = stateOptions.find(option => option.name == state)?.id

    const handleStateDropdownClick = async (optionId: string) => {
        //console.log('made it to click with optionId: ', optionId)
        const newState = stateOptions.find(option => option.id == optionId)?.name
        if (newState) {
            const stateUpdate = { state: newState }
            //console.log('stateUpdate: ', newState)
            updateAppState(id, stateUpdate)
            await updateJobAppAction(id, stateUpdate, path)
            router.refresh()
        }
    };


    return { showDetails, toggleDetails, handleClose, handleViewPacketClick, handleMouseOver, handleBoardOptionClick, boardOptions, stateOptions, currentStateId, handleStateDropdownClick }
}