import { Job, JobClass } from "../models/Job";
import { JobApplication, JobApplicationClass } from "../models/JobApplication";
import { Resume } from "../models/Resume";
import connectDB from "./connect-db";
import { stringToObjectId, castToString } from "./utils";
var transformProps = require('transform-props');

interface JobAppFilter {
    userId: string
}

export async function getUserJobApps(filter: JobAppFilter) {
    try {
        await connectDB();

        //const page = filter.page ?? 1;
        //const limit = filter.limit ?? 10;
        //const skip = (page - 1) * limit;

        //console.log(filter)

        //console.log("getting job apps")

        //const jobs = await Job.find(filter).skip(skip).limit(limit).lean().exec();
        const jobApps = await JobApplication.find({ userId: filter.userId })
            .populate("job")
            .lean()
            .exec();

        const results = jobApps.length;

        //console.log(jobApps, results)

        if (jobApps) {
            transformProps(jobApps, castToString, ['_id', "createdAt", "updatedAt", "profile", "userResume"]);
            //console.log(jobApps)
            return {
                jobApps,
                //page,
                //limit,
                results,
            };
        } else {
            return { error: "Job applications not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function createJobApp(data: JobApplicationClass) {
    try {
        await connectDB();

        transformProps(data, stringToObjectId, ['_id', 'profile', 'job', 'userResume']);

        console.log(`Job app to create: ${JSON.stringify(data)}`)

        const jobApp = await JobApplication.create(data);

        console.log(`Created app: ${JSON.stringify(jobApp)}`)
    } catch (error) {
        return { error };
    }
}

export async function getJobApp(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Job Application not found" };
        }

        //console.log(id)
        const jobApp = await JobApplication.findById(id)
            .populate("job")
            .populate("userResume")
            .populate("profile")
            .lean()
            .exec();

        if (jobApp) {
            transformProps(jobApp, castToString, ['_id', "createdAt", "updatedAt"]);
            //console.log(jobApp)
            return {
                jobApp,
            };
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateJobApp(id: string, data: any) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        //console.log(id)

        //console.log(`data to update job with: ${JSON.stringify(data)}`)

        const job = await JobApplication.findByIdAndUpdate(
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
            return { error: "Job application not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteJobApp(id: string, resumeId: string) {
    try {
        await connectDB();

        console.log(id)

        const parsedId = stringToObjectId(id);
        const parsedResumeId = stringToObjectId(resumeId);

        console.log(parsedId)

        if (!parsedId) {
            return { error: "Job application not found" };
        }

        const jobApp = await JobApplication.findByIdAndDelete(parsedId).exec();
        const resume = await Resume.findByIdAndDelete(parsedResumeId).exec();

        if (jobApp) {
            return {};
        } else {
            return { error: "Job application not found" };
        }
    } catch (error) {
        return { error };
    }
}