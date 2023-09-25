import { ResumeModel, ResumeClass } from "../models/Resume";
import connectDB from "./connect-db";
import { castToString, stringToObjectId } from "./utils";

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
            return { error: "Job not found" };
        }
    } catch (error) {
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