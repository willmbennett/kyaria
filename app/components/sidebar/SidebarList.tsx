
import { SidebarItems } from './SidebarItems'
import { SideBarItem } from '../../helper'
import { ActionItemType } from '../../board/job-helper';

interface SidebarListProps {
    items?: SideBarItem[]
    children?: React.ReactNode;
    deleteItemAction: ActionItemType
}

export const SidebarList = ({ items, deleteItemAction }: SidebarListProps) => {

    if (!items) {
        return (
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 overflow-auto overscroll-none">
                    <div className="p-8 text-center">
                        <p className="text-sm text-muted-foreground">No chat history</p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4">
                    {/*<ClearHistory clearChats={clearChats} isEnabled={chats} />*/}
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto overscroll-none">
                <div className="space-y-2 px-2">
                    <SidebarItems items={items} deleteItemAction={deleteItemAction} />
                </div>
            </div>
            <div className="flex items-center justify-between p-4">
                {/*<ClearHistory clearChats={clearChats} isEnabled={chats} />*/}
            </div>
        </div>
    )
}