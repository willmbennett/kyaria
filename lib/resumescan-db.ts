import { ResumeScanDataModel, ResumeScanDataClass } from "../models/ResumeScan";
import connectDB from "./connect-db";
import { castToString, dateToString } from "./utils";
var transformProps = require('transform-props');

export async function createResumeScan(data: ResumeScanDataClass) {
    try {
        await connectDB();

        console.log(`Resume Scan to create: ${JSON.stringify(data)}`)

        const resumeScan = await ResumeScanDataModel.create(data);

        console.log(`Created Resume Scan: ${JSON.stringify(resumeScan)}`)

        if (resumeScan) {
            console.log('about to transform props')
            const resumeScanId = castToString(resumeScan._id)
            console.log(resumeScanId)
            return {
                resumeScanId
            };
        } else {
            return { error: "Issue creating Resume Scan" };
        }
    } catch (error) {
        return { error };
    }
}

export async function getResumeScans(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "Profile not found" };
        }
        const resumeScans = await ResumeScanDataModel.find({ userId: userId }).lean().exec();
        if (resumeScans) {
            transformProps(resumeScans, castToString, '_id');
            transformProps(resumeScans, dateToString, ["createdAt", "updatedAt"]);
            return {
                resumeScans
            };

        } else {
            return { error: "Error pulling resume scans" };
        }
    } catch (error) {
        return { error };
    }
}