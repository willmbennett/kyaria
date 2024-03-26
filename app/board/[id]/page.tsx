import { checkSubscription } from "../../../lib/hooks/check-subscription"
import { boardItemType } from "../job-helper"
import { JobClass } from "../../../models/Job"
import { getUserJobApps } from "../../../lib/app-db";
import { AppClass } from "../../../models/App";
import { redirect } from "next/navigation";
import { Button } from "../../components/Button";
import Kanban from "../../components/board/KanbanBoard";
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
    boardId: boardId
  }

  const { jobApps } = await getUserJobApps(filter) as { jobApps: AppClass[] }

  const { board } = await getBoard(boardId)

  const boardItems: boardItemType[] = jobApps.map(app => {
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

  const updateBoardTitle = async (title: string) => {
    'use server'
    const path = `/board/${boardId}`
    const updateData = { name: title }
    await updateBoardAction(boardId, updateData, path)
  }

  return (
    <div className="flex w-full mx-auto flex-col gap-4 py-10 items-center min-h-screen">
      <div className="flex gap-4 items-center">
        <SingleEdit
          value={board?.name || 'New Board'}
          onUpdate={updateBoardTitle}
          titleStyle="sm:text-lg text-xl font-bold text-slate-900"
        />
        <Button
          variant="solid"
          size="sm"
          type="button"
          href="/apps/new"
        >
          Add a New Job Post
        </Button>
      </div>
      <Kanban
        boardItems={boardItems}
        boards={boards}
        boardId={boardId}
      />
    </div >
  );
}
