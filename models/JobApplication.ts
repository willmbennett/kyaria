import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";

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
        collection: "applications",
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
class JobApplicationClass {
    @prop()
    userCoverLetter?: string;

    @prop()
    userStory?: string;

    @prop({ ref: () => JobClass, required: true })
    job: Ref<JobClass>;

    @prop({ ref: () => ProfileClass, required: true })
    profile: Ref<ProfileClass>;

    @prop({ ref: () => ResumeClass, required: true })
    userResume: Ref<ResumeClass>;

    @prop({ type: () => [UserQuestion] , options: { disableLowerIndexes: true }})
    public userQuestions?: UserQuestion[];

    @prop({ required: true })
    public userId!: string;

    _id: string;
    createdAt: string;
    updatedAt: string;
}

const JobApplication = getModelForClass(JobApplicationClass);
export { JobApplication, JobApplicationClass };