'use client'
import JobItem from "./JobItem";
import { JobClass } from "../../../models/Job";

export default function JobList(
    {
        jobs
    }: {
        jobs: any
    }
) {

    return (
        <ul>
            {jobs && jobs.map((job: JobClass) => (
                <li key={job._id.toString()} className="w-full">
                    <JobItem
                        job={job}
                    />
                </li>
            ))}
        </ul>
    );
}
