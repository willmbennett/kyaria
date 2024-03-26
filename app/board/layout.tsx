import { Metadata } from "next";
import { cache } from "react";
import { getBoards } from "../../lib/board-db";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { BoardClass } from "../../models/Board";
import { createBoardAction } from "./_action";
import { SidebarMobile } from "../components/sidebar/MobileSidebar";
import { ItemHistory } from "../components/sidebar/ItemHistory";
import { SidebarToggle } from "../components/sidebar/ToggleSidebar";
import { SidebarDesktop } from "../components/sidebar/SidebarDesktop";

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

  const loadBoards = cache(async (userId: string) => {
    return await getBoards(userId)
  })
  const { boards } = await loadBoards(userId) as { boards: any }

  const items = boards.map((board: BoardClass, index: number) => ({
    id: board._id.toString(),
    href: `/board/${board._id.toString()}`,
    title: board.name
  }))

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

  return (
    <div className="w-full">
      {userId &&
        <>
          <SidebarMobile>
            <ItemHistory
              sideBarTitle={'Boards'}
              items={items}
              createNew={handleBoardCreation}
              newTitle={'New Board'}
            />
          </SidebarMobile>
          <SidebarToggle />
          <SidebarDesktop
            sideBarTitle={'Boards'}
            items={items}
            createNew={handleBoardCreation}
            newTitle={'New Board'}
          />
        </>
      }
      {children}
    </ div>
  )
}