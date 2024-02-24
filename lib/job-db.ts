import { ObjectId } from "mongodb";
import { AppClass, AppModel } from "../models/App";
import { JobModel, JobClass } from "../models/Job";
import { ProfileModel } from "../models/Profile";
import connectDB from "./connect-db";
import { createRecommendations, getTopSimilarJobs } from "./recsystem-helper";
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

        // Fetch user's profile
        const userProfile = await ProfileModel.findOne({ userId: filter.userId }).lean().exec();
        const jobRecs = userProfile?.jobRecs || [];

        let topJobs: JobClass[] = [];

        // If there are recommendations in jobRecs, fetch them in the order they appear
        if (jobRecs.length > 0) {
            // Fetching jobs without maintaining order
            const recommendedJobsMap = await JobModel.find({ _id: { $in: jobRecs } })
                .lean()
                .exec()
                .then(jobs => jobs.reduce((acc, job) => {
                    acc[job._id.toString()] = job;
                    return acc;
                }, {} as Record<string, JobClass>));

            // Maintaining the order based on jobRecs
            for (const jobId of jobRecs) {
                if (recommendedJobsMap[jobId]) {
                    topJobs.push(recommendedJobsMap[jobId]);
                }
            }
        }

        // If the recommendations don't fulfill the limit, get the most recent jobs
        if (topJobs.length < limit) {
            const numJobsNeeded = limit - topJobs.length;

            // Exclude jobs already in recommendations
            const recentJobs = await JobModel.find({ _id: { $nin: topJobs.map(job => job._id) } })
                .sort('-createdAt')
                .limit(numJobsNeeded)
                .lean()
                .exec();

            topJobs = topJobs.concat(recentJobs);
        }

        transformProps(topJobs, castToString, '_id');
        transformProps(topJobs, dateToString, ["createdAt", "updatedAt"]);

        return {
            jobs: topJobs.slice(skip, skip + limit),  // Pagination slice
            page,
            limit,
            results: topJobs.length,
        };
    } catch (error) {
        console.error("Error getting job recommendations:", error);
        return { error };
    }
}

// Utility function to subtract days from a date
function subtractDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
}

export async function updateUserJobRecs() {
    try {
        await connectDB();

        // I'm assuming you want this function to work for ALL user profiles. 
        // If it's only for one specific user, then use the _id filter as you provided.
        //const userProfiles = await ProfileModel.find({ _id: "6514a6cf89f00c6960dc7490" }).lean().exec();
        const userProfiles = await ProfileModel.find().lean().exec();

        let count = 0;
        let jobRecCount = 0;
        for (let profile of userProfiles) {
            // Fetch all job applications for the user
            const jobApps = await AppModel.find({ userId: profile.userId })
                .sort('-createdAt')
                .populate("job")
                .lean()
                .exec();

            // Extract the jobIds from the applications
            const userJobs = jobApps.map((jobApp: any) => (jobApp.job as JobClass)._id.toString());

            // Calculate the date from two weeks ago.
            const twoWeeksAgo = subtractDays(new Date(), 14);

            const aggregateJobs = await JobModel.aggregate([
                {
                    $addFields: {
                        "baseLink": {
                            $substr: ["$link", 0, { $indexOfBytes: ["$link", "?"] }]
                        }
                    }
                },
                { $match: { createdAt: { $gt: twoWeeksAgo } } },
                { $sort: { createdAt: 1 } },
                {
                    $group: {
                        _id: "$baseLink",
                        job: { $first: "$$ROOT" }
                    }
                }
            ]);


            // Extracting the job details from the aggregated results:
            const jobsWithSimilarities = aggregateJobs.map(aggregated => aggregated.job);

            // Get the top jobs based on pre-calculated cosine similarity
            const topJobIds = getTopSimilarJobs(userJobs, jobsWithSimilarities, profile);

            // Update the user profile with the pre-calculated job recommendations
            await ProfileModel.findByIdAndUpdate(profile._id, { $set: { jobRecs: topJobIds } });

            count++;  // Increment the count for each updated profile
            jobRecCount = jobRecCount + topJobIds.length
        }

        return {
            jobs: { updated_count: count, numRecsAdded: jobRecCount }
        };
    } catch (error) {
        console.error("Error updating user job recommendations:", error);
        return { error };
    }
}

export async function updateJobSimilarities() {
    try {
        await connectDB();

        // Fetch all job applications for the user
        const jobs = await JobModel.find({})
            .lean()
            .exec();

        // Get the top jobs based on cosine similarity
        const jobsTFIDF = createRecommendations(jobs);

        // Update each job in the database with its recommendations
        let count = 0
        for (let jobData of jobsTFIDF) {
            await JobModel.updateOne(
                { _id: jobData.jobId },
                {
                    $set: {
                        similarJobs: jobData.jobsSimilarity,
                        tfidf: jobData.jobTFIDF
                    }
                }
            );
            // count the number of jobs updated
            count = count + 1
        }

        return {
            jobs: { updated_count: count },  // Pagination slice
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

export async function findJobByLink(link: string) {
    try {
        await connectDB();

        //console.log(parsedId)
        const job = await JobModel.findOne({ link: link }).lean().exec();

        if (job) {
            const jobId = job._id.toString()
            return { jobId }
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