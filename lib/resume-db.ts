import Error from "next/error";
import { ResumeModel, ResumeClass } from "../models/Resume";
import { ResumeScanDataModel } from "../models/ResumeScan";
import connectDB from "./connect-db";
import { castToString, dateToString, ObjectIdtoString, stringToObjectId } from "./utils";
import { AppModel } from "../models/App";
var transformProps = require('transform-props');

const logging = false

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

        //console.log(id)

        //console.log(`data to update resume with: ${JSON.stringify(data)}`)

        const resume = await ResumeModel.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (resume) {
            //console.log(`updated resume: ${JSON.stringify(resume)}`)
            return {
                resume,
            };
        } else {
            const error = { error: "Resume not found" }
            console.log(error)
            return error;
        }
    } catch (error) {
        console.log(error)
        return { error };
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