import * as React from 'react'
import { SidebarList } from './SidebarList'
import { NewItemButton } from './NewItemButton'
import { SidebarToggle } from './ToggleSidebar'
import { SideBarItem } from '../../helper'

interface ItemHistoryProps {
    items?: SideBarItem[];
    newTitle: string
    createNew: () => Promise<any>;
    sideBarTitle: string;
}

export const ItemHistory = ({ createNew, items, newTitle, sideBarTitle }: ItemHistoryProps) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
                <h4 className="text-sm font-medium">{sideBarTitle}</h4>
                <SidebarToggle />
            </div>
            <div className="mb-2 px-2">
                <NewItemButton createNew={createNew} newTitle={newTitle} />
            </div>
            <React.Suspense
                fallback={
                    <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
                            />
                        ))}
                    </div>
                }
            >
                <SidebarList items={items} />
            </React.Suspense>
        </div>
    )
}