import { ActionItemType } from "../../board/job-helper";
import { SideBarItem } from "../../helper";
import { ItemHistory } from "./ItemHistory";
import { SidebarMobile } from "./MobileSidebar";
import { TopMenuDesktop } from "./SidebarDesktop";

interface SidebarWrapperProps {
    userId: string;
    items?: SideBarItem[];
    newTitle: string;
    createNew: () => Promise<any>;
    sideBarTitle: string;
    deleteItemAction: ActionItemType;
    children: React.ReactNode;
    centerElements?: JSX.Element;
    leftElements?: JSX.Element;
    rightElements?: JSX.Element;
}

export const SidebarWrapper = ({
    userId,
    createNew,
    items,
    newTitle,
    sideBarTitle,
    deleteItemAction,
    children,
    centerElements,
    leftElements,
    rightElements
}: SidebarWrapperProps) => {
    return (
        <div className="relative w-full h-full overflow-hidden">
            {userId &&
                <>
                    <SidebarMobile>
                        <ItemHistory
                            sideBarTitle={sideBarTitle}
                            items={items}
                            createNew={createNew}
                            newTitle={newTitle}
                            deleteItemAction={deleteItemAction}
                        />
                    </SidebarMobile>
                    <TopMenuDesktop
                        sideBarTitle={sideBarTitle}
                        items={items}
                        createNew={createNew}
                        newTitle={newTitle}
                        deleteItemAction={deleteItemAction}
                        centerElements={centerElements}
                        leftElements={leftElements}
                        rightElements={rightElements}
                    />
                </>
            }
            <div className="relative w-full h-full pt-14 overflow-hidden">
                {children}
            </div>
        </div>
    );
}