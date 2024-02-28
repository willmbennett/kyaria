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
const ProductDemo = dynamic(() => import('../components/board/landingpage/ProductDemo'));
const Process = dynamic(() => import('../components/board/landingpage/Process'));
const FeatureBlocks = dynamic(() => import('../components/board/landingpage/FeatureBlocks'));
const Faqs = dynamic(() => import('../components/board/landingpage/Faqs'));
const CallToAction = dynamic(() => import('../components/board/landingpage/CallToAction'));

export default async function BoardPage() {
  const { activeSubscription, userId } = await checkSubscription()
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
      salaryRange: job.salaryRange
    })
  })

  return (
    <div className="flex w-full mx-auto flex-col gap-4 py-10 items-center min-h-screen">
      <div className="flex gap-4 items-center">
        <h1 className="sm:text-lg text-xl font-bold text-slate-900">
          Your Job Board
        </h1>
        {activeSubscription ?
          <Button
            variant="solid"
            size="sm"
            type="button"
            href="/apps/new"
          >
            Add a New Job Post
          </Button>
          :
          <Button
            variant="solid"
            size="sm"
            type="button"
            href="/pricing"
          >
            Subscribe to Add Job Posts
          </Button>
        }
      </div>
      <Kanban
        boardItems={boardItems}
      />
    </div>
  );
}
