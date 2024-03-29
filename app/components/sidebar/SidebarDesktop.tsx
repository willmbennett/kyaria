import { ActionItemType } from "../../board/job-helper";
import { SideBarItem } from "../../helper";
import { ItemHistory } from "./ItemHistory";
import { Sidebar } from "./Sidebar";

interface SidebarDesktopProps {
    items?: SideBarItem[];
    createNew: () => Promise<any>;
    newTitle: string;
    sideBarTitle: string;
    deleteItemAction: ActionItemType
}

export const SidebarDesktop = ({ items, createNew, newTitle, sideBarTitle, deleteItemAction }: SidebarDesktopProps) => {

    return (
        <Sidebar className="peer absolute inset-y-24 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
            <ItemHistory
                sideBarTitle={sideBarTitle}
                items={items}
                createNew={createNew}
                newTitle={newTitle}
                deleteItemAction={deleteItemAction}
            />
        </Sidebar>
    )
}