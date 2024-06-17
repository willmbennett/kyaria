'use client'
import useAppNavigation from "../../../lib/hooks/use-app-section";
import ProgressBar from "./ProgressBar";
import { ActionItemType, JobStateType } from "../../board/job-helper";
import { SidebarWrapper } from "../../components/sidebar/SidebarWrapper";
import { usePathname, useRouter } from "next/navigation";
import { deleteJobAppAction } from "../_action";
import { SideBarItem } from "../../helper";
import { Button } from "../../components/Button";

export const JobAppLayoutWrapper = ({
    userId,
    appState,
    appId,
    boardId,
    children
}: {
    userId: string;
    appState: JobStateType;
    appId: string;
    boardId?: string;
    children: React.ReactNode;
}) => {
    const { activeProgressSection, filteredPages } = useAppNavigation(appId, appState);
    const router = useRouter()
    const path = usePathname()

    const createNew = async () => {
        const newUrl = `/apps/new${boardId != 'default' ? `?board=${boardId}` : ''}`
        router.push(newUrl)
    }

    const removeApp: ActionItemType = async (id: string) => {
        await deleteJobAppAction({ id, path })
        return { url: `board/${boardId}` }
    }

    const items: SideBarItem[] = filteredPages.map(p => {

        return ({
            id: p.label,
            title: p.label,
            href: `/apps/${appId}/${p.section}?progress=${activeProgressSection}`,
            editable: false,
            category: "Apps"
        })
    })


    return (
        <SidebarWrapper
            userId={userId}
            sideBarTitle={'Job Applications'}
            items={items}
            createNew={createNew}
            newTitle={'New Application'}
            deleteItemAction={removeApp}
            centerElements={<ProgressBar activeProgressSection={activeProgressSection} />}
            leftElements={<Button size='sm' variant='ghost' href={`/board${boardId ? `/${boardId}` : '/default'}`}>← Back to Board</Button>}
        >
            <div className="flex w-full h-full justify-center items-start overflow-y-scroll pt-10">
                {children}
            </div >
        </SidebarWrapper>
    );
}