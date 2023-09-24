import {
    ModelOptions,
    getModelForClass,
    index,
    prop,
    Severity,
    mongoose,
} from "@typegoose/typegoose";
import { JobClass } from "./Job";
import { ProfileClass } from "./Profile";
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
        collection: "jobapplication",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class JobAppClass {
    @prop()
    public userCoverLetter?: string;

    @prop()
    public userStory?: string;

    @prop({ type: () => [UserQuestion] })
    public userQuestions?: UserQuestion[];

    @prop({ required: true})
    public userId!: string;

    @prop({ ref: () => ProfileClass, required: true })
    public profile!: mongoose.Types.ObjectId | string;

    @prop({ ref: () => JobClass, required: true })
    public job!: mongoose.Types.ObjectId | string;

    @prop({ ref: () => ResumeClass, required: true })
    public userResume!: mongoose.Types.ObjectId | string;

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const JobApp = getModelForClass(JobAppClass);
export { JobApp, JobAppClass };