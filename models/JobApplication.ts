import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose
} from "@typegoose/typegoose";

import { ProfileClass } from "./Profile";
import { JobClass } from "./Job";
import { ResumeClass } from "./Resume";

class UserQuestion {
    @prop()
    public question?: string;

    @prop()
    public answer?: string;
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "apps",
        validateBeforeSave: false
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
class JobApplicationClass {
    @prop({ ref: () => JobClass, required: true })
    job: mongoose.Types.ObjectId | string

    @prop({ ref: () => ProfileClass, required: true })
    profile: mongoose.Types.ObjectId | string

    @prop()
    userCoverLetter?: string;

    @prop({ required: true })
    public userId!: string;

    @prop({ type: () => [UserQuestion] , options: { disableLowerIndexes: true }})
    public userQuestions?: UserQuestion[];

    @prop({ ref: () => ResumeClass, required: true })
    userResume: mongoose.Types.ObjectId | string

    @prop()
    userStory?: string;

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const JobApplication = getModelForClass(JobApplicationClass);
export { JobApplication, JobApplicationClass };