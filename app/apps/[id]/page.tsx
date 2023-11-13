import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getJobApp } from "../../../lib/app-db";
import { authOptions } from "../../../lib/auth";
import Await from "../../jobs/await";
import { JobApplication } from "../../components/apps/JobApplication";
import { AppClass } from "../../../models/App";

export default async function JobAppPage({ params }: { params: { id: string } }) {
  const promise = getJobApp(params.id);
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="lg:px-4 lg:mt-6 lg:w-1/2">
      {promise && (<>
        {/* @ts-expect-error Server Component */}
        < Await promise={promise}>
          {({ jobApp }: { jobApp: AppClass }) => <>{jobApp ?
            <JobApplication jobApp={jobApp} />
            :
            <p>Job app not found</p>
          }
          </>
          }
        </Await>
      </>)
      }
    </div>
  );
}