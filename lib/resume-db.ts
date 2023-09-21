import { Resume, ResumeClass } from "../models/Resume";
import connectDB from "./connect-db";
import { castToString } from "./utils";

export async function createResume(data: ResumeClass) {
    try {
        await connectDB();

        console.log(`Resume to create: ${JSON.stringify(data)}`)

        const resume = await Resume.create(data);

        console.log(`Created resume: ${JSON.stringify(resume)}`)

        if (resume) {
            console.log('about to transform props')
            const resumeId = castToString(resume._id)
            console.log(resumeId)
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