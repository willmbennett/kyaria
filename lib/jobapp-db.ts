import { JobAppModel, JobAppClass } from "../models/JobApp";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, ObjectIdtoString } from "./utils";
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
        const jobApps = await JobAppModel.find({ userId: filter.userId })
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

export async function createJobApp(data: any) {
    try {
        await connectDB();
        console.log(JobAppModel)

        console.log(JobAppModel.schema)

        transformProps(data, stringToObjectId, ['profile', 'job', 'userResume']);

        console.log(JobAppModel.schema.obj)

        //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        const newApp = new JobAppModel(data);
        //console.log(`newly created app`);
        //console.log(newApp);
        const jobApp = await newApp.save();
        //const newJobApp = await JobApplication.create(data)
        //console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")

        //console.log('Created JobApp');
        //console.log(jobApp);
        if (jobApp) {
            const jobAppId = jobApp._id.toString()
            //console.log(jobAppId);
            return {
                jobApp: jobAppId
            };
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        console.error("Error in createJobApp:", error);
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
        const jobApp = await JobAppModel.findById(id)
            .populate(["job", "userResume", "profile"])
            .lean()
            .exec();

        if (jobApp) {
            transformProps(jobApp, castToString, ['_id', "createdAt", "updatedAt"]);
            console.log(jobApp)
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

        const job = await JobAppModel.findByIdAndUpdate(
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

        console.log("Made it to Deletion")
        const jobApp = await JobAppModel.findByIdAndDelete(parsedId).exec();
        console.log("Post job app deletion")

        if (jobApp) {
            return {};
        } else {
            return { error: "Job application not found" };
        }
    } catch (error) {
        return { error };
    }
}