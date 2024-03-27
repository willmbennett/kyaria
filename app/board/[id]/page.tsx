import { checkSubscription } from "../../../lib/hooks/check-subscription"
import { boardItemType } from "../job-helper"
import { JobClass } from "../../../models/Job"
import { getUserJobApps } from "../../../lib/app-db";
import { AppClass } from "../../../models/App";
import { redirect } from "next/navigation";
import { Button } from "../../components/Button";
import Kanban from "../../components/board/KanbanPage";
import { SingleEdit } from "../../components/forms/SingleEdit";
import { getBoard, getBoards } from "../../../lib/board-db";
import { updateBoardAction } from "../_action";
import { BoardClass } from "../../../models/Board";

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

  const { jobApps } = await getUserJobApps(filter) as { jobApps: AppClass[] }
  //console.log('jobApps: ', jobApps)

  const { board } = await getBoard(boardId)

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

  const { boards } = await getBoards(userId) as { boards: BoardClass[] }

  const defaultItem: BoardClass = {
    _id: 'default',
    name: "Default Board",
    userId,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const itemsWithDefault: BoardClass[] = [defaultItem, ...boards]

  return (
    <Kanban
      boardItems={boardItems}
      boards={itemsWithDefault}
      boardId={boardId}
      name={board?.name || 'Default Board'}
    />
  );
}
