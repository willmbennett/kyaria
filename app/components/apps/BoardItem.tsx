'use client'

import { usePathname, useRouter } from "next/navigation";
import { updateJobAppAction } from "../../apps/_action";

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

interface BoardItemProps {
    id: string;
    appId: string;
    boardId: string;
    boardName: string
    updateAppBoard: (appId: string, newBoard: string) => void;
}

export const BoardItem = ({ id, appId, boardId, boardName, updateAppBoard }: BoardItemProps) => {
    const router = useRouter()
    const path = usePathname()

    const selectOption = async () => {
        //console.log('made it to click with id: ', id)
        const stateUpdate = { boardId: id }
        //console.log('stateUpdate: ', stateUpdate)
        updateAppBoard(appId, id)
        await updateJobAppAction(appId, stateUpdate, path)
        router.refresh()
    };

    return (
        <button
            key={id}
            onClick={selectOption}
            className={`text-gray-700 w-full block px-4 py-2 text-sm ${id === boardId ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
        >
            {boardName}
        </button>
    )
}