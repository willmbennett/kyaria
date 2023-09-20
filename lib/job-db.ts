import { Job, JobClass } from "../models/Job";
import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";

interface JobFilter {
    userId: string
}

export async function getUserJobs(filter: JobFilter) {
    try {
        await connectDB();

        //const page = filter.page ?? 1;
        //const limit = filter.limit ?? 10;
        //const skip = (page - 1) * limit;

        //const jobs = await Job.find(filter).skip(skip).limit(limit).lean().exec();
        const jobs = await Job.find({userId: filter.userId}).lean().exec();

        const results = jobs.length;

        //console.log(results, jobs)

        return {
            jobs,
            //page,
            //limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function createJob(data: JobClass) {
    try {
        await connectDB();

        console.log(`Profile to create: ${JSON.stringify(data)}`)

        const job = await Job.create(data);

        console.log(`Created Profile: ${JSON.stringify(job)}`)

        return {
            job,
        };
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
        const job = await Job.findById(id).lean().exec();

        if (job) {
            const stringId = job._id.toString()
            job["id"] = stringId;
            job["_id"] = stringId;
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

        console.log(id)

        console.log(`data to update job with: ${JSON.stringify(data)}`)

        const job = await Job.findByIdAndUpdate(
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

        console.log(id)

        const parsedId = stringToObjectId(id);

        console.log(parsedId)

        if (!parsedId) {
            return { error: "Job not found" };
        }

        const job = await Job.findByIdAndDelete(parsedId).exec();

        if (job) {
            return {};
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}