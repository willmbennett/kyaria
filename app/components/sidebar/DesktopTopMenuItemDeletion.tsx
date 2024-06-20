"use client"
import { usePathname } from "next/navigation";
import { ActionItemType } from "../../board/job-helper";
import { SideBarItem } from "../../helper";
import { SidebarActions } from "./sidebar-actions";

export const DesktopTopMenuItemDeletion = ({
    items,
    deleteItemAction
}: {
    items?: SideBarItem[],
    deleteItemAction: ActionItemType,
}) => {
    const pathname = usePathname()
    const activeItem = items?.find(i => i.href == pathname)

    if (!activeItem || !activeItem.editable) return <></>

    return (
        <SidebarActions
            item={activeItem}
            removeItem={deleteItemAction}
        />
    )
}