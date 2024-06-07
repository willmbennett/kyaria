import { getJobRecs } from "../../lib/job-db";
import JobList from "../components/jobs/JobList";
import { Suspense } from 'react'
import Skeleton from './skeleton'
import Await from './await'
import Trigger from "./trigger";
import { checkSubscription } from "../../lib/hooks/check-subscription";

export default async function JobsPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const session = await checkSubscription()
    const page =
        typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit =
        typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

    const filter = {
        userId: session.userId,
        page,
        limit
    }
    const promise = getJobRecs(filter)

    return (
        <section>
            <div className="flex max-w-5xl mx-auto flex-col items-center min-h-screen">
                <div className="w-full max-w-2xl md:rounded-xl py-2 md:p-6">
                    <div className="w-full text-center">
                        <h5 className="text-xl font-medium leading-tight">
                            Jobs
                        </h5>
                    </div>
                    <Suspense fallback={<Skeleton />}>
                        <Await promise={promise}>
                            {({ jobs }) => (
                                <>
                                    <JobList jobs={jobs} />
                                    <Trigger limit={limit}></Trigger>
                                </>
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
