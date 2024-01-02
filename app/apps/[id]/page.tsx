import { redirect } from "next/navigation";
import { getJobApp } from "../../../lib/app-db";
import Await from "../../jobs/await";
import { JobApplication } from "../../components/apps/JobApplication";
import { AppClass } from "../../../models/App";
import { checkSubscription } from "../../../lib/hooks/check-subscription";

export default async function JobAppPage({ params }: { params: { id: string } }) {
  const promise = getJobApp(params.id);
  const { activeSubscription, userId } = await checkSubscription()

  if (!userId) {
    redirect('/auth/signin')
  }

  return (
    <>
      {promise && (<>
        {/* @ts-expect-error Server Component */}
        < Await promise={promise}>
          {({ jobApp }: { jobApp: AppClass }) => <>
            {
              jobApp ?
                <JobApplication jobApp={jobApp} activeSubscription={activeSubscription} />
                :
                <p>Job app not found</p>
            }
          </>
          }
        </Await>
      </>)
      }
    </>
  );
}