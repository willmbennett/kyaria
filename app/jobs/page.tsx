import { getJobs } from "../../lib/job-db";
import JobList from "../components/jobs/JobList";
import { Suspense } from 'react'
import Skeleton from './skeleton'
import Await from './await'
import Trigger from "./trigger";

export default async function JobsPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page =
        typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit =
        typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

    const promise = getJobs({ page, limit })

    return (
        <section>
            <div className="flex max-w-5xl mx-auto flex-col items-center min-h-screen bg-gray-100 dark:bg-black">
                <div className="w-full max-w-2xl bg-white md:rounded-xl py-2 md:p-6 shadow-md dark:md:bg-neutral-400 dark:bg-black">
                    <div className="w-full sticky bg-white top-10 g-white px-6 pb-6 pt-16 text-center dark:bg-black dark:md:bg-neutral-600 dark:md:rounded-xl">
                        <h5 className="text-xl font-medium leading-tight dark:border-neutral-600 dark:text-neutral-50">
                            Jobs
                        </h5>
                    </div>
                    <Suspense fallback={<Skeleton />}>
                        {/* @ts-expect-error Server Component */}
                        <Await promise={promise}>
                            {({ jobs }) => <JobList jobs={jobs} />}
                        </Await>
                    </Suspense>
                    <Trigger limit={limit}></Trigger>
                </div>
            </div>
        </section>
    );
}
