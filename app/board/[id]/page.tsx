import { checkSubscription } from "../../../lib/hooks/check-subscription"
import { ActionItemType, boardItemType } from "../job-helper"
import { JobClass } from "../../../models/Job"
import { getUserJobApps } from "../../../lib/app-db";
import { AppClass } from "../../../models/App";
import { redirect } from "next/navigation";
import Kanban from "../../components/board/KanbanPage";
import { getBoard, getBoards } from "../../../lib/board-db";
import { BoardClass } from "../../../models/Board";
import { cache } from "react";
import { updateJobAppAction } from "../../apps/_action";
import { createBoardAction, deleteBoardAction } from "../_action";
import { SideBarItem } from "../../helper";

const loadApps = cache(async (filter: { userId: string, boardId: string }) => {
  //console.log('made it to [getUserJobApps]')
  return await getUserJobApps(filter)
})

const loadBoard = cache(async (id: string) => {
  //console.log('made it to [getBoard]')
  return await getBoard(id)
})

const loadBoards = cache(async (userId: string) => {
  //console.log('made it to [getBoard]')
  return await getBoards(userId)
})

export default async function BoardPage({ params }: { params: { id: string } }) {
  const { userId } = await checkSubscription()

  if (!userId) {
    redirect('/board')
  }

  const boardId = params.id

  const filter = {
    userId,
    boardId
  }

  const { jobApps } = await loadApps(filter) as { jobApps: AppClass[] }
  //console.log('jobApps: ', jobApps)

  const { board } = await loadBoard(boardId)

  const boardItems: boardItemType[] = jobApps?.map(app => {
    const job = app.job as JobClass
    return ({
      id: app._id.toString(),
      createdAt: app.createdAt.toString(),
      state: app.state,
      active: app.active,
      jobTitle: job.jobTitle,
      company: job.company,
      location: job.location,
      employmentType: job.employmentType,
      salaryRange: job.salaryRange,
      userId: app.userId,
      boardId: boardId
    })
  })

  const { boards } = await loadBoards(userId) as { boards: BoardClass[] }

  const defaultItem: BoardClass = {
    _id: 'default',
    name: "Default Board",
    userId,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const boardItemsWithDefault: BoardClass[] = [defaultItem, ...boards]


  const items = boards.map((board: BoardClass, index: number) => ({
    id: board._id.toString(),
    href: `/board/${board._id.toString()}`,
    title: board.name,
    editable: true,
    category: 'Board'
  }))

  const defaultSideBarItem: SideBarItem = {
    id: 'default',
    href: "/board/default",
    title: "Default Board",
    editable: false,
    category: 'Board'
  }

  const itemsWithDefault: SideBarItem[] = [defaultSideBarItem, ...items]

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
    <Kanban
      userId={userId}
      sideBarTitle={'Boards'}
      items={itemsWithDefault}
      createNew={handleBoardCreation}
      newTitle={'New Board'}
      deleteItemAction={handleBoardDeletion}
      boardItems={boardItems}
      boards={boardItemsWithDefault}
      boardId={boardId}
      name={board?.name || 'Default Board'}
    />
  );
}
