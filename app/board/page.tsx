import { redirect } from "next/navigation";
import { getBoards } from "../../lib/board-db";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { BoardClass } from "../../models/Board";

export default async function BoardPage() {
  const { userId } = await checkSubscription(true)

  const { boards } = await getBoards(userId) as { boards: BoardClass[] }

  //console.log(boards)

  if (boards && boards.length > 0) {
    const newUrl = "/board/" + boards[0]._id.toString()
    //console.log('newUrl: ', newUrl)
    redirect(newUrl)
  } else {
    redirect('/board/default')
  }

  return (
    <div className="flex w-full h-full mx-auto flex-col gap-4 py-10 items-center">
      <div className="flex gap-4 items-center">
        <h1 className="sm:text-lg text-xl font-bold text-slate-900">
          Your Job Board
        </h1>
      </div>
    </div>
  );
}
