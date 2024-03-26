import { countTotalApps, getUserJobApps } from "../../lib/app-db";
import { getProfile } from "../../lib/profile-db";
import { redirect } from "next/navigation";
import { Button } from "../components/Button";
import { AppClass } from "../../models/App";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { ProfileClass } from "../../models/Profile";
import Kanban from "../components/board/KanbanBoard";
import { JobClass } from "../../models/Job";
import { boardItemType } from "./job-helper";
import { BoardHero } from "../components/board/landingpage/BoardHero";
import dynamic from "next/dynamic";
import { getBoards } from "../../lib/board-db";
import { BoardClass } from "../../models/Board";
const ProductDemo = dynamic(() => import('../components/board/landingpage/ProductDemo'), {
  ssr: false,
});
const Process = dynamic(() => import('../components/board/landingpage/Process'), {
  ssr: false,
});
const FeatureBlocks = dynamic(() => import('../components/board/landingpage/FeatureBlocks'), {
  ssr: false,
});
const Faqs = dynamic(() => import('../components/board/landingpage/Faqs'), {
  ssr: false,
});
const CallToAction = dynamic(() => import('../components/board/landingpage/CallToAction'), {
  ssr: false,
});

export default async function BoardPage() {
  const { userId } = await checkSubscription()
  const { totalApps } = await countTotalApps()

  if (!userId) {
    return (
      <>
        <BoardHero />
        <ProductDemo />
        {totalApps && <FeatureBlocks totalApps={totalApps} />}
        <Process />
        {/*<TestimonialsSlide />*/}
        <Faqs />
        <CallToAction />
      </>
    );
  }

  const { jobApps } = await getUserJobApps({ userId: userId }) as { jobApps: AppClass[] }
  const { boards } = await getBoards(userId) as { boards: BoardClass[] }

  if (jobApps.length == 0) {
    redirect('/apps/new')
  }

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
      userId: app.userId
    })
  })

  return (
    <div className="flex w-full mx-auto flex-col gap-4 py-10 items-center min-h-screen">
      <div className="flex gap-4 items-center">
        <h1 className="sm:text-lg text-xl font-bold text-slate-900">
          Your Job Board
        </h1>
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
      />
    </div>
  );
}
