import { JobModel, JobClass } from "../models/Job";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, dateToString } from "./utils";
var transformProps = require('transform-props');

interface JobFilter {
    page: number,
    limit: number
}

export async function getJobs(filter: JobFilter) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        //console.log(page, limit)

        const jobs = await JobModel.find({}).sort('-updatedAt').skip(skip).limit(limit).lean().exec();

        const results = jobs.length;

        if (jobs) {
            transformProps(jobs, castToString, '_id');
            transformProps(jobs, dateToString, ["createdAt", "updatedAt"]);
            //console.log(jobs)
            return {
                jobs,
                page,
                limit,
                results,
            };
        } else {
            return { error: "Jobs not found" };
        }
    } catch (error) {
        return { error };
    }
}
export async function createJob(data: JobClass) {
    try {
        await connectDB();

        //console.log(`Job To create: ${JSON.stringify(data)}`)

        const job = await JobModel.create(data);

        //console.log(job)

        if (job) {
            //console.log('about to transform props')
            const jobId = castToString(job._id)
            //console.log(jobId)
            return {
                jobId
            };
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function getJob(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Job not found" };
        }

        //console.log(parsedId)
        const job = await JobModel.findById(id).lean().exec();

        if (job) {
            transformProps(job, castToString, ['_id', "_createdAt", "updatedAt"]);
            //console.log(job)
            return {
                job,
            };
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateJob(id: string, data: any) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        //console.log(id)

        //console.log(`data to update job with: ${JSON.stringify(data)}`)

        const job = await JobModel.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (job) {
            return {
                job,
            };
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteJob(id: string) {
    try {
        await connectDB();

        //console.log(id)

        const parsedId = stringToObjectId(id);

        //console.log(parsedId)

        if (!parsedId) {
            return { error: "Job not found" };
        }

        const job = await JobModel.findByIdAndDelete(parsedId).exec();

        if (job) {
            return {};
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}