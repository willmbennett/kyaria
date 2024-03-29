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
    userId: string;
    boardId?: string;
}

export async function getUserJobApps(filter: AppFilter) {
    try {
        await connectDB();

        const { userId, boardId } = filter
        //console.log('filter: ', filter)

        let queryConditions = [];

        if (!boardId) {
            queryConditions.push({ userId: userId });
        } else if (boardId === 'default') {
            // If boardId is 'default', look for job applications that either don't have a boardId
            // or have a boardId set to 'default'.
            queryConditions.push(
                { userId: userId, boardId: { $exists: false } }
            );
        } else {
            queryConditions.push({ userId: userId, boardId: boardId });
        }
        //console.log('queryConditions: ', queryConditions)

        // Use MongoDB's $or to combine conditions
        const jobApps = await AppModel.find({ $or: queryConditions })
            .sort('-createdAt')
            .populate("job")
            .lean()
            .exec();
        //console.log(jobApps)

        if (jobApps) {
            transformProps(jobApps, castToString, ['_id', "profile", "userResume", 'boardId']);
            transformProps(jobApps, dateToString, ["createdAt", "updatedAt"]);
            //console.log(jobApps)
            return {
                jobApps,
            };
        } else {
            return { error: "Job applications not found" };
        }
    } catch (error) {
        console.log('error', error)
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

        //console.log(id)
        const app = await AppModel.findById(id)
            .populate(["job", "userResume", "profile"])
            .lean()
            .exec()

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

interface UpdateQuery {
    $set?: { [key: string]: any };
    $unset?: { [key: string]: any };
}

export async function updateJobApp(id: string, data: any) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        //console.log('Made it to updating the job app with id: ', id)
        //console.log('Data to update a job app with: ', data)


        //console.log('Made it to updating the job app with id: ', id);
        //console.log('Data to update a job app with: ', data);

        const update: UpdateQuery = {};

        // Dynamically construct $set and $unset based on data
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (value === 'default' && key === 'boardId') {
                // Special case for boardId with 'default' value
                update.$unset = { ...update.$unset, [key]: "" };
            } else if (value !== undefined) {
                // General case for setting values
                update.$set = { ...update.$set, [key]: value };
            }
            // Extend this logic as needed for other special cases
        });

        //console.log('Updated data update: ', update);

        const jobApp = await AppModel.findByIdAndUpdate(
            parsedId,
            update
        )
            .lean()
            .exec();

        //console.log('UpdatedJobApp board : ', jobApp?.boardId)
        if (jobApp) {
            transformProps(jobApp, ObjectIdtoString, ['_id', 'profile', 'job', 'userResume', 'boardId']);
            transformProps(jobApp, dateToString, ["createdAt", "updatedAt"]);

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