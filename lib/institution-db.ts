
import { InstitutionClass, InstitutionModel } from "../models/Institution";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, dateToString } from "./utils";
var transformProps = require('transform-props');

interface InstitutionsFilter {
    page?: number;
    limit?: number;
}

export async function getInstitutions(filter: InstitutionsFilter = {}) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const institutions = await InstitutionModel.find().skip(skip).limit(limit).lean().exec();

        const results = institutions.length;

        return {
            institutions,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function getInstitution(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Institutions not found" };
        }

        //console.log(parsedId)
        const institution = await InstitutionModel.findById(id).lean().exec();

        if (institution) {
            transformProps(institution, castToString, ['_id', "_createdAt", "updatedAt"]);
            //console.log(job)
            return {
                institution,
            };
        } else {
            return { error: "Institution not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function createInstitution(data: Partial<InstitutionClass>) {
    try {
      //console.log(`Institution to create: ${JSON.stringify(data)}`);

        const institution = await InstitutionModel.create(data);
        //console.log(`Created Profile: ${JSON.stringify(profile)}`);
        if (institution) {
            //console.log('about to transform props')
            const institutionId = castToString(institution._id)
            //console.log(jobId)
            return {
                institutionId
            };
        } else {
            return { error: "Institution not created" };
        }
    } catch (error) {
        console.error("Error creating Institution:", error); // Log the error for debugging purposes
        return { error: 'Failed to create Institution' }; // Generic error message to user
    }
}


export async function checkInstitutionDiffbotId(targetDiffbotId: string) {
    try {
        await connectDB();

        if (!targetDiffbotId) {
            return { error: "diffbotId not included" };
        }

        //console.log(diffbotId)

        // Check if a subscription already exists for this userId
        const institution = await InstitutionModel.find({ targetDiffbotId: targetDiffbotId }).lean().exec()

        //console.log(person)

        if (institution.length > 0) {
          //console.log('Institution exists with diffbotId:', targetDiffbotId)
            return {
                existingInstitution: true,
            };
        } else {
            return { error: "Institution not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function institutionFuzzyMatching(query: string) {
    try {
        await connectDB();

      //console.log('made it here')

        // define pipeline
        const agg = [
            {
                $search: {
                    index: "institutions_search",
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
        const institutions = await InstitutionModel.aggregate(agg)
        // print results
      //console.log(institutions)

        if (institutions) {
            transformProps(institutions, castToString, '_id');
            //console.log(subscription)
            return {
                results: institutions,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}