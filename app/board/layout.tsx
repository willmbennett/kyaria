import { Metadata } from "next";
import { cache } from "react";
import { getBoards } from "../../lib/board-db";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { BoardClass } from "../../models/Board";
import { createBoardAction, deleteBoardAction } from "./_action";
import { SidebarMobile } from "../components/sidebar/MobileSidebar";
import { ItemHistory } from "../components/sidebar/ItemHistory";
import { SidebarToggle } from "../components/sidebar/ToggleSidebar";
import { SidebarDesktop } from "../components/sidebar/SidebarDesktop";
import { SideBarItem } from "../helper";
import { DesktopOpenSideBar } from "../components/sidebar/DesktopOpenSideBar";
import { ActionItemType } from "./job-helper";
import { updateJobAppAction } from "../apps/_action";
import { getUserJobApps } from "../../lib/app-db";
import { cn } from "../../lib/utils";

const title = "Streamline Your Job Search with Kyaria PRO Kanban Tracker";
const description = "Elevate your job search with Kyaria PRO's Kanban Tracker. Simplify application management with a drag-and-drop interface, keep all your resumes and cover letters in one place, and optimize your search with our intuitive funnel approach. Start your strategic job search campaign for only $10/mo.";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kyaria.ai/'),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'en_US',
    type: 'website',
    url: 'https://www.kyaria.ai/board'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};


export default async function BoardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {
  const { userId } = await checkSubscription()

  if (!userId) {
    return (
      <>
        {children}
      </>
    )
  }

  const loadBoards = cache(async (userId: string) => {
    return await getBoards(userId)
  })
  const { boards } = await loadBoards(userId) as { boards: any }

  const items = boards.map((board: BoardClass, index: number) => ({
    id: board._id.toString(),
    href: `/board/${board._id.toString()}`,
    title: board.name,
    editable: true,
    category: 'Board'
  }))

  const defaultItem: SideBarItem = {
    id: 'default',
    href: "/board/default",
    title: "Default Board",
    editable: false,
    category: 'Board'
  }

  const itemsWithDefault: SideBarItem[] = [defaultItem, ...items]

  //console.log('foundBoards', boards)

  const handleBoardCreation = async () => {
    "use server"
    const boardData = {
      userId,
      name: 'New Board'
    }
    const boardId = await createBoardAction(boardData, '/board')
    if (boardId) {
      const url = `/board/${boardId}`
      return { url }
    } else {
      const error = 'There was a problem creating a new chat'
      return { error }
    }
  }

  const handleBoardDeletion: ActionItemType = async (boardId: string, path: string) => {
    "use server"
    //console.log('Made it to deletion with boardId: ', boardId)
    const filter = { userId, boardId }

    const { jobApps, error } = await getUserJobApps(filter)
    if (error) {
      return { error: error as string }
    }

    if (jobApps) {
      try {
        //console.log('About to remove apps from board')
        // Map each jobApp to a promise returned by handleAppRemovalFromBoard
        const removalPromises = jobApps.map(app => {
          const appIdToDelete = app._id.toString();
          //console.log('App to delete', appIdToDelete)
          const path = '/apps/' + appIdToDelete; // If you need to use path in your function, ensure it's used inside
          const stateUpdate = { boardId: 'default' }
          const appId = app._id.toString()
          return updateJobAppAction(appId, stateUpdate, path)
        });

        // Wait for all promises to resolve
        await Promise.all(removalPromises);
      } catch (removalError) {
        // Handle any errors that occur during the removal process
        // This could be logging the error, returning it, or handling it in some other way
        console.error("An error occurred while removing job apps:", removalError);
        return { error: removalError as string };
      }
    }
    //console.log('Apps removed from board successfully, about to delete board')
    const { error: boardError } = await deleteBoardAction({ id: boardId, path })
    if (boardError) {
      return { error: boardError as string }
    } else {
      return { url: '/board' }
    }
  }

  return (
    <div className={cn("w-full", userId && 'flex')}>
      {userId &&
        <>
          <SidebarMobile>
            <ItemHistory
              sideBarTitle={'Boards'}
              items={itemsWithDefault}
              createNew={handleBoardCreation}
              newTitle={'New Board'}
              deleteItemAction={handleBoardDeletion}
            />
          </SidebarMobile>
          <DesktopOpenSideBar />
          <SidebarDesktop
            sideBarTitle={'Boards'}
            items={itemsWithDefault}
            createNew={handleBoardCreation}
            newTitle={'New Board'}
            deleteItemAction={handleBoardDeletion}
          />
        </>
      }
      {children}
    </ div>
  )
}