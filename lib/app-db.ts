import { AppModel, AppClass } from "../models/App";
import { JobModel } from "../models/Job";
import { ResumeModel } from "../models/Resume";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, ObjectIdtoString, dateToString } from "./utils";
var transformProps = require('transform-props');

export async function countTotalApps() {
    try {
        await connectDB();

        const totalApps = await AppModel.countDocuments();
        //console.log('Total resumes:', totalResumes);

        return { totalApps };
    } catch (error) {
        console.error('Error counting resumes:', error);
        return { error: 'Error counting resumes' };
    }
}

interface AppFilter {
    userId: string
}

export async function getUserJobApps(filter: AppFilter) {
    try {
        await connectDB();

        //const page = filter.page ?? 1;
        //const limit = filter.limit ?? 10;
        //const skip = (page - 1) * limit;

        //console.log(filter)

        //console.log("getting job apps")

        //const jobs = await Job.find(filter).skip(skip).limit(limit).lean().exec();
        const jobApps = await AppModel.find({ userId: filter.userId })
            .sort('-createdAt')
            .populate("job")
            .lean()
            .exec();

        const results = jobApps.length;

        //console.log(jobApps, results)

        if (jobApps) {
            transformProps(jobApps, castToString, ['_id', "profile", "userResume"]);
            //console.log(jobApps)

            transformProps(jobApps, dateToString, ["createdAt", "updatedAt"]);
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


export async function createApp(data: Partial<AppClass>) {
    // If the job is already created
    try {

        await connectDB();
        //console.log(userApp)
        const newApp = new AppModel(data);
        //console.log(newApp);
        const app = await newApp.save();

        //console.log('Created JobApp');
        //console.log(jobApp);
        if (app) {
            const appId = app._id.toString()
            //console.log(jobAppId);
            return {
                appId
            };
        } else {
            return { error: "App not found" };
        }
    } catch (error) {
        console.error("Error in createApp:", error);
        return { error };
    }
}


export async function createJobApplication(data: any) {
    const { job, resume, profileId, userId, emails, userStory } = data
    // If the job is already created
    if (job._id) {
        try {

            await connectDB();
            //console.log("Create Resume")
            const newResume = await ResumeModel.create(resume);
            //console.log(newResume)
            //console.log("Create App")
            const profileObjectId = stringToObjectId(profileId)
            const userApp = {
                job: job._id,
                profile: profileObjectId,
                userCoverLetter: "",
                userId: userId,
                emails: emails,
                userResume: newResume._id,
                userStory: userStory || ''
            }
            //console.log(userApp)
            const newApp = new AppModel(userApp);
            //console.log(newApp);
            const jobApp = await newApp.save();

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
    } else {
        // If the job is not created
        try {

            await connectDB();
            //console.log("Create Resume")
            const newResume = await ResumeModel.create(resume);
            //console.log(newResume)
            //console.log("Create Job")
            const newJob = await JobModel.create({ ...job, userId: userId });
            //console.log(newJob)
            //console.log("Create App")
            const profileObjectId = stringToObjectId(profileId)
            const userApp = {
                job: newJob._id,
                profile: profileObjectId,
                userCoverLetter: "",
                userId: userId,
                emails: emails,
                userResume: newResume._id,
                userStory: userStory || ''
            }
            //console.log(userApp)
            const newApp = new AppModel(userApp);
            //console.log(newApp);
            const jobApp = await newApp.save();

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
}

export async function getJobApp(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Job Application not found" };
        }

        console.log(id)
        const app = await AppModel.findById(id)
            .populate(["job", "userResume", "profile"])
            .lean()
            .exec() as AppClass;

        if (app) {
            transformProps(app, castToString, '_id');
            transformProps(app, dateToString, ["createdAt", "updatedAt"]);
            //console.log(app)
            return {
                app,
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

        const jobApp = await AppModel.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (jobApp) {
            transformProps(jobApp, ObjectIdtoString, ['_id', 'profile', 'job', 'userResume']);
            transformProps(jobApp, dateToString, ["createdAt", "updatedAt"]);
            //console.log(jobApp)
            return {
                jobApp,
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

        //console.log(id)

        const parsedId = stringToObjectId(id);
        const parsedResumeId = stringToObjectId(resumeId);

        //console.log(parsedId)

        if (!parsedId) {
            return { error: "Job application not found" };
        }

        //console.log("Made it to Deletion")
        const jobApp = await AppModel.findByIdAndDelete(parsedId).exec();
        //console.log("Post job app deletion")

        if (jobApp) {
            return {};
        } else {
            return { error: "Job application not found" };
        }
    } catch (error) {
        return { error };
    }
}