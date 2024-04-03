import { ResumeModel, ResumeClass } from "../models/Resume";
import connectDB from "./connect-db";
import { castToString, dateToString, ObjectIdtoString, stringToObjectId } from "./utils";
import { AppModel } from "../models/App";
var transformProps = require('transform-props');
import _ from 'lodash'; // or import * as _ from 'lodash';
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const logging = true

export async function countTotalResumes() {
    try {
        await connectDB();

        const totalResumes = await ResumeModel.countDocuments();
        //console.log('Total resumes:', totalResumes);

        return { totalResumes };
    } catch (error) {
        console.error('Error counting resumes:', error);
        return { error: 'Error counting resumes' };
    }
}

export async function getResumes(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "resumes not found" };
        }
        const apps = await AppModel.find({ userId }).lean().exec()
        const resumeToExclude = apps.map(app => (app.userResume))
        //console.log('resumeToExclude', resumeToExclude)
        const resumes = await ResumeModel.find({
            userId: userId,
            _id: { $nin: resumeToExclude }
        })
            .sort({ createdAt: -1, _id: -1 }) // Sorting by createdAt in descending order, then by _id in descending order
            .lean()
            .exec();

        if (resumes) {
            transformProps(resumes, castToString, '_id');
            transformProps(resumes, dateToString, ["createdAt", "updatedAt"]);
            transformProps(resumes, ObjectIdtoString, "resumeScan");
            //console.log('resumes: ', resumes)
            //console.log('resumeScans: ', resumeScans)
            return {
                resumes
            };

        } else {
            //console.log({ error: "Error pulling resumes" })
            return { error: "Error pulling resumes" };
        }
    } catch (error) {
        console.log(error)
        return { error: error as string };
    }
}

export async function getFirstResume(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "resumes not found" };
        }
        const resume = await ResumeModel.findOne({
            userId: userId,
        })
            .sort({ createdAt: -1, _id: -1 }) // Sorting by createdAt in descending order, then by _id in descending order
            .lean()
            .exec();

        //console.log('prior to transforming resume: ')
        if (resume) {
            transformProps(resume, castToString, '_id');
            transformProps(resume, dateToString, ["createdAt", "updatedAt"]);
            transformProps(resume, ObjectIdtoString, "resumeScan");
            //console.log('post transforming resume')
            return {
                resume
            };

        } else {
            //console.log({ error: "Error pulling resumes" })
            return { error: "Error pulling resumes" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function getResume(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Resume not found" };
        }

        const resumeObjectId = stringToObjectId(id)
        //console.log(resumeObjectId)
        const resume = await ResumeModel.findById(resumeObjectId)
            .lean()
            .exec();
        //console.log('Resume: ', resume)

        //console.log(profile)
        if (resume) {
            //console.log('about to transform props')
            transformProps(resume, castToString, '_id');
            transformProps(resume, dateToString, ["createdAt", "updatedAt"]);
            transformProps(resume, ObjectIdtoString, "resumeScan");
            //console.log(profile)
            return {
                resume
            };

        } else {
            return { error: "Resume not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function createResume(data: ResumeClass) {
    try {
        await connectDB();

        //console.log(`Resume to create: ${JSON.stringify(data)}`)

        const resume = await ResumeModel.create(data);

        //console.log(`Created resume: ${JSON.stringify(resume)}`)

        if (resume) {
            //console.log('about to transform props')
            const resumeId = castToString(resume._id)
            //console.log(resumeId)
            return {
                resumeId
            };
        } else {
            const error = { error: "Resume Not created" }
            console.log(error)
            return error;
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}


export async function updateResume(id: string, data: any) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);
        const resume = await ResumeModel.findById(parsedId);

        if (!resume) {
            return { error: "Resume not found" }
        }

        if (logging) console.log(`Data to update resume with: ${JSON.stringify(data)}`);

        // Iterate through each key in data to determine if we're adding or removing
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (logging) console.log('Processing [key]: ', key, ' [value]: ', value);

            if (value.remove && typeof value.remove === 'string') {
                // $pull to remove by _id
                let pullCriteria = { _id: value.remove };
                if (value.remove == 'n/a') {
                    if (logging) console.log('_id does not exist, creating new _id')
                    const newId = new mongoose.Types.ObjectId();
                    if (logging) console.log('created new id', newId)
                    _.set(resume, value.itemSetKey, newId);
                    pullCriteria._id = newId
                }
                if (logging) console.log(`pullCriteria: ${JSON.stringify(pullCriteria)}`);
                _.get(resume, key).pull(pullCriteria);
            } else if (value.add) {
                // Push new item to array
                if (logging) console.log(`value.add: ${JSON.stringify(value.add)}`);
                _.get(resume, key).push({ _id: new ObjectId(), ...value.add });
            } else {
                // $set to update other fields
                _.set(resume, key, value);
            }
        });

        const updatedResume = await resume.save();

        //if (logging) console.log(`Updated resume: ${JSON.stringify(updatedResume)}`);

        return {};
    } catch (error: any) {
        console.error("Failed to update resume:", error);
        return { error: error.message };
    }
}


export async function deleteResume(id: string) {
    try {
        await connectDB();

        if (logging) console.log(id)

        const parsedId = stringToObjectId(id);

        if (logging) console.log(parsedId)

        if (!parsedId) {
            return { error: "Chat not found" };
        }
        await ResumeModel.findByIdAndDelete(parsedId).exec();

        return {}
    } catch (error: any) {
        return { error };
    }
}