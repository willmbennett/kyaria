'use client'
import { ActionItemType } from "../../board/job-helper";
import { SideBarItem } from "../../helper";
import { NewItemButton } from "./NewItemButton";
import { DesktopTopMenuSelection } from "./DesktopTopMenuSelection";
import { DesktopTopMenuItemDeletion } from "./DesktopTopMenuItemDeletion";

interface SidebarDesktopProps {
    items?: SideBarItem[];
    createNew: () => Promise<any>;
    newTitle: string;
    sideBarTitle: string;
    deleteItemAction: ActionItemType;
    centerElements?: JSX.Element
    leftElements?: JSX.Element
}

export const TopMenuDesktop = ({ items, createNew, newTitle, sideBarTitle, deleteItemAction, centerElements, leftElements }: SidebarDesktopProps) => {

    return (
        <div className="hidden md:block absolute top-0 right-0 w-full py-2 border-b bg-white z-30">
            <div className="flex justify-between items-center px-2">
                <div className="flex justify-between items-center gap-2 ">{leftElements && leftElements}
                    {items && <DesktopTopMenuSelection items={items} sideBarTitle={sideBarTitle} />}
                </div>
                {centerElements &&
                    centerElements
                }
                <div className="flex gap-2 items-center">
                    <NewItemButton createNew={createNew} newTitle={newTitle} />
                    <DesktopTopMenuItemDeletion items={items} deleteItemAction={deleteItemAction} />
                </div>
            </div>
        </div>
    );
};
