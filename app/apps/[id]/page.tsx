import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getJobApp } from "../../../lib/app-db";
import { authOptions } from "../../../lib/auth";
import Await from "../../jobs/await";
import { JobApplication } from "../../components/apps/JobApplication";

export default async function JobAppPage({ params }: { params: { id: string } }) {
  const promise = getJobApp(params.id);
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="lg:px-4 lg:mt-6">
        {promise && (<>
        {/* @ts-expect-error Server Component */}
        < Await promise={promise}>
          {({ jobApp }) => <JobApplication
            jobApp={jobApp}
          />}
        </Await>
      </>)
      }
    </div>
  );
}