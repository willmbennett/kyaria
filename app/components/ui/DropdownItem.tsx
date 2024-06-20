import React, { forwardRef } from 'react';
import { DropdownItemType } from "../../types";

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";

interface DropdownItemProps {
    item: DropdownItemType;
    activeOptionId?: string;
    onclickAction: (id: string) => Promise<void>;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(({ item, activeOptionId, onclickAction }, ref) => {
    const { id, label } = item;

    const selectOption = async () => {
        await onclickAction(id);
    };

    return (
        <button
            ref={ref}
            key={id}
            onClick={selectOption}
            className={`flex-grow text-gray-700 w-full block px-4 py-2 max-w-80 text-sm ${id === activeOptionId ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
        >
            {label}
        </button>
    );
});