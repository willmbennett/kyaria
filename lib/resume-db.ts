import { ResumeModel, ResumeClass } from "../models/Resume";
import { ResumeScanDataModel } from "../models/ResumeScan";
import connectDB from "./connect-db";
import { castToString, dateToString, ObjectIdtoString, stringToObjectId } from "./utils";
var transformProps = require('transform-props');

export async function getResumes(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "resumes not found" };
        }
        const resumes = await ResumeModel.find({
            userId: userId,
            resumeScan: { $ne: null }
        })
            .sort({ createdAt: -1, _id: -1 }) // Sorting by createdAt in descending order, then by _id in descending order
            .lean()
            .exec();


        // Extract resumeScan IDs from resumes and convert them to ObjectIds
        const resumeScanIdsToExclude = resumes.map(resume => resume.resumeScan);

        const resumeScans = await ResumeScanDataModel.find({
            userId: userId,
            _id: { $nin: resumeScanIdsToExclude }
        }).lean().exec();
        if (resumes) {
            transformProps(resumes, castToString, '_id');
            transformProps(resumes, dateToString, ["createdAt", "updatedAt"]);
            transformProps(resumes, ObjectIdtoString, "resumeScan");
            transformProps(resumeScans, castToString, '_id');
            transformProps(resumeScans, dateToString, ["createdAt", "updatedAt"]);
            return {
                resumes,
                resumeScans
            };

        } else {
            console.log({ error: "Error pulling resumes" })
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
        const resumeScan = await ResumeScanDataModel.findById(resume?.resumeScan)
            .lean()
            .exec();
        //console.log('resumeScan: ', resumeScan)

        //console.log(profile)
        if (resume) {
            //console.log('about to transform props')
            transformProps(resume, castToString, '_id');
            transformProps(resume, dateToString, ["createdAt", "updatedAt"]);
            transformProps(resume, ObjectIdtoString, "resumeScan");
            transformProps(resumeScan, castToString, '_id');
            transformProps(resumeScan, dateToString, ["createdAt", "updatedAt"]);
            //console.log(profile)
            return {
                resume,
                resumeScan
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

        console.log(`Resume to create: ${JSON.stringify(data)}`)

        const resume = await ResumeModel.create(data);

        console.log(`Created resume: ${JSON.stringify(resume)}`)

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

        //console.log(`data to update profile with: ${JSON.stringify(data)}`)

        const resume = await ResumeModel.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (resume) {
            return {
                resume,
            };
        } else {
            return { error: "Resume not found" };
        }
    } catch (error) {
        return { error };
    }
}