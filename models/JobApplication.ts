import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity
} from "@typegoose/typegoose";

class UserQuestion {
    @prop()
    public question?: string;

    @prop()
    public answer?: string;
}

ModelOptions({
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

    @prop({ required: true })
    job: string;

    @prop({ required: true })
    profile: string;

    @prop({ required: true })
    userResume: string;

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