'use client'
import { DropDownItemType } from "../../../board/job-helper";

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

interface DropdownItemProps {
    item: DropDownItemType
    activeOptionId?: string
    onclickAction: (id: string) => Promise<void>;
}

export const DropdownItem = ({ item, activeOptionId, onclickAction }: DropdownItemProps) => {
    const { id, name } = item

    const selectOption = async () => {
        //console.log('made it to click with id: ', id)
        await onclickAction(id)
    };

    return (
        <button
            key={id}
            onClick={selectOption}
            className={`text-gray-700 w-full block px-4 py-2 text-sm ${id === activeOptionId ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
        >
            {name}
        </button>
    )
}