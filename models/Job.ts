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
        versionKey: false,
        collection: "jobs",
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
//@index({ jobTitle: 1 })
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

    @prop({ required: true })
    public userId!: string;

    _id: mongoose.Types.ObjectId | string;
    id: string;

    createdAt: Date | string;
    _createdAt: string;
    updatedAt: Date | string;
    _updatedAt: string;
}

const Job = getModelForClass(JobClass);
export { Job, JobClass };