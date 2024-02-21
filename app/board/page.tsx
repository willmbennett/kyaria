import { getUserJobApps } from "../../lib/app-db";
import { getProfile } from "../../lib/profile-db";
import { redirect } from "next/navigation";
import { Button } from "../components/Button";
import { AppClass } from "../../models/App";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { ProfileClass } from "../../models/Profile";
import Kanban from "../components/board/KanbanBoard";
import { JobClass } from "../../models/Job";
import { boardItemType } from "./job-helper";

export default async function BoarPage() {
  const { activeSubscription, userId } = await checkSubscription()

  if (!userId) {
    redirect('/auth/signin')
  }

  const { profile } = await getProfile(userId) as { profile: ProfileClass }
  if (!profile) {
    redirect(`/profile/${userId}`)
  }

  const { jobApps } = await getUserJobApps({ userId: userId }) as { jobApps: AppClass[] }

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
    <div className="flex w-full mx-auto flex-col items-center min-h-screen">
      <div className="w-full bg-white pt-10 g-white p-2 text-center items-center justify-center">
        <h1 className="sm:text-lg text-xl font-bold text-slate-900">
          Your Job Board
        </h1>
        {activeSubscription ?
          <Button
            variant="solid"
            size="md"
            type="button"
            href="/apps/new"
            className="mt-3"
          >
            Add a New Job Post
          </Button>
          :
          <Button
            variant="solid"
            size="md"
            type="button"
            href="/pricing"
            className="mt-3"
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
