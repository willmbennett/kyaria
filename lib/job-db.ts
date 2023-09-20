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
        const jobs = await Job.find({ userId: filter.userId }).lean().exec();

        const results = jobs.length;

        if (jobs) {
            jobs.map((job) => job["id"] = job["_id"].toString())
            jobs.map((job) => job["_id"] = job["id"])
            jobs.map((job) => job["_createdAt"] = job["createdAt"].toString())
            jobs.map((job) => job["createdAt"] = job["_createdAt"])
            jobs.map((job) => job["_updatedAt"] = job["updatedAt"].toString())
            jobs.map((job) => job["updatedAt"] = job["_updatedAt"])
            jobs.map((job) => job.userResume["userId"] = job.userResume["userId"].toString())
            jobs.map((job) => job.userResume["_id"] = job.userResume["_id"].toString())
            //console.log(jobs)
            return {
                jobs,
                //page,
                //limit,
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

        const job = await Job.create(data);

        //console.log(`Created Job: ${JSON.stringify(job)}`)

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
            job["_createdAt"] = job["createdAt"].toString()
            job["createdAt"] = job["_createdAt"]
            job["_updatedAt"] = job["updatedAt"].toString()
            job["updatedAt"] = job["_updatedAt"]
            job.userResume["userId"] = job.userResume["userId"].toString()
            job.userResume["_id"] = job.userResume["_id"].toString()
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