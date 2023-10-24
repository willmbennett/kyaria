import { AppClass, AppModel } from "../models/App";
import { JobModel, JobClass } from "../models/Job";
import connectDB from "./connect-db";
import { getTopSimilarJobs } from "./recsystem-helper";
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

interface JobRecsFilter {
    userId: string,
    page?: number,
    limit?: number
}

export async function getJobRecs(filter: JobRecsFilter) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 100;
        const skip = (page - 1) * limit;

        // Fetch all job applications for the user
        const jobApps = await AppModel.find({ userId: filter.userId })
            .sort('-createdAt')
            .populate("job")
            .lean()
            .exec();

        // Extract the jobIds from the applications
        const userJobs = jobApps.map((jobApp: AppClass) => (jobApp.job as JobClass)._id.toString())

        // Fetch all jobs and sort them by their update time
        const jobs = await JobModel.find({}).sort('-updatedAt').lean().exec();

        // Get the top jobs based on cosine similarity
        const topJobIds = getTopSimilarJobs(userJobs, jobs);

        // Convert the jobs array to a map for faster lookups
        const jobMap = new Map<string, JobClass>();
        for (const job of jobs) {
            jobMap.set(job._id.toString(), job);
        }

        // Sort the topJobIds by recency
        topJobIds.sort((a, b) => {
            const dateA = new Date(jobMap.get(a)?.updatedAt || 0);
            const dateB = new Date(jobMap.get(b)?.updatedAt || 0);
            return dateB.getTime() - dateA.getTime();
        });

        // Fetch the top jobs from the map using their IDs
        const topJobs = topJobIds.map(jobId => jobMap.get(jobId)).filter(Boolean) as JobClass[];

        transformProps(topJobs, castToString, '_id');
        transformProps(topJobs, dateToString, ["createdAt", "updatedAt"]);

        return {
            jobs: topJobs.slice(skip, skip + limit),  // Pagination slice
            page,
            limit,
            results: topJobs.length,
        };
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