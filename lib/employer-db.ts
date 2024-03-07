
import { EmployerModel, EmployerClass } from "../models/Employer";
import { JobModel } from "../models/Job";
import connectDB from "./connect-db";
import { stringToObjectId, castToString } from "./utils";
var transformProps = require('transform-props');

interface EmployerFilter {
    page?: number;
    limit?: number;
}

export async function getEmployers(filter: EmployerFilter = {}) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const profiles = await EmployerModel.find().skip(skip).limit(limit).lean().exec();

        const results = profiles.length;

        return {
            profiles: profiles,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function getEmployer(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Job not found" };
        }

        //console.log(parsedId)
        const employer = await JobModel.findById(id).lean().exec();

        if (employer) {
            transformProps(employer, castToString, ['_id', "_createdAt", "updatedAt"]);
            //console.log(job)
            return {
                employer,
            };
        } else {
            return { error: "Employer not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function createEmployer(data: EmployerClass) {
    try {
      //console.log(`Employer to create: ${JSON.stringify(data)}`);

        const employer = await EmployerModel.create(data);
        //console.log(`Created Profile: ${JSON.stringify(profile)}`);
        if (employer) {
            //console.log('about to transform props')
            const employerId = castToString(employer._id)
            //console.log(jobId)
            return {
                employerId
            };
        } else {
            return { error: "Employer not created" };
        }
    } catch (error) {
        console.error("Error creating profile:", error); // Log the error for debugging purposes
        return { error: 'Failed to create profile' }; // Generic error message to user
    }
}


export async function checkEmployerDiffbotId(targetDiffbotId: string) {
    try {
        await connectDB();

        if (!targetDiffbotId) {
            return { error: "diffbotId not included" };
        }

        //console.log(diffbotId)

        // Check if a subscription already exists for this userId
        const employer = await EmployerModel.find({ targetDiffbotId: targetDiffbotId }).lean().exec()

        //console.log(person)

        if (employer.length > 0) {
          //console.log('person exists with diffbotId:', targetDiffbotId)
            return {
                existingEmployer: true,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function employerFuzzyMatching(query: string) {
    try {
        await connectDB();

      //console.log('made it here')

        // define pipeline
        const agg = [
            {
                $search: {
                    index: "employers_search",
                    text: {
                        query,
                        path: ["name"],
                        fuzzy: {
                            maxEdits: 1,
                            prefixLength: 1,
                            maxExpansions: 256
                        },
                    },
                }
            },
            { $limit: 5 }, // Adjust based on how many suggestions you want
            {
                $project: {
                    _id: 0,
                    targetDiffbotId: '$targetDiffbotId',
                    name: "$name",
                },
            },
        ];

      //console.log('agg: ', agg)

        // Check if a subscription already exists for this userId
        const employers = await EmployerModel.aggregate(agg)
        // print results
        console.log(employers)

        if (employers) {
            transformProps(employers, castToString, '_id');
            //console.log(subscription)
            return {
                results: employers,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}