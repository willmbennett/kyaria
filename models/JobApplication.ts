import * as typegoose from "@typegoose/typegoose";

import { ProfileClass } from "./Profile";
import { JobClass } from "./Job";
import { ResumeClass } from "./Resume";

class UserQuestion {
    @typegoose.prop()
    public question?: string;

    @typegoose.prop()
    public answer?: string;
}

typegoose.ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "applications",
    },
    options: {
        allowMixed: typegoose.Severity.ALLOW
    }
})
class JobApplicationClass {
    @typegoose.prop()
    userCoverLetter?: string;

    @typegoose.prop()
    userStory?: string;

    @typegoose.prop({ ref: () => JobClass, required: true })
    job: typegoose.Ref<JobClass>;

    @typegoose.prop({ ref: () => ProfileClass, required: true })
    profile: typegoose.Ref<ProfileClass>;

    @typegoose.prop({ ref: () => ResumeClass, required: true })
    userResume: typegoose.Ref<ResumeClass>;

    @typegoose.prop({ type: () => [UserQuestion] , options: { disableLowerIndexes: true }})
    public userQuestions?: UserQuestion[];

    @typegoose.prop({ required: true })
    public userId!: string;

    _id: string;
    createdAt: string;
    updatedAt: string;
}

const JobApplication = typegoose.getModelForClass(JobApplicationClass);
export { JobApplication, JobApplicationClass };