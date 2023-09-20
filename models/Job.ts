import {
    ModelOptions,
    Severity,
    getModelForClass,
    index,
    prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { ProfileClass } from "./Profile";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "jobs",
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ userId: 1 })
class JobClass {
    @prop({ required: true })
    public jobTitle!: string;

    @prop()
    public company: string;

    @prop()
    public location: string;

    @prop()
    public employmentType?: string;

    @prop()
    public salaryRange?: string;

    @prop()
    public remote?: string;

    @prop()
    public aboutCompany?: string;

    @prop()
    public jobDescription?: string;

    @prop()
    public qualifications?: string[];

    @prop()
    public responsibilities?: string[];

    @prop()
    userCoverLetter?: string;

    @prop()
    userStory?: string;

    @prop({ required: true })
    userResume: ProfileClass;

    @prop({ type: () => [Object] })
    public userQuestions?: {
        question: string;
        answer: string;
    }[]

    @prop({ required: true, unique: true })
    public userId!: string;

    _id: mongoose.Types.ObjectId | string;
    id: string;
}

const Job = getModelForClass(JobClass);
export { Job, JobClass };