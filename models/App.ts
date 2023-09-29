import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { JobClass } from "./Job";
import { ProfileClass } from "./Profile";
import { ResumeClass } from "./Resume";

class Emails {
    @prop()
    public type?: string;

    @prop()
    public content?: string;
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "apps",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class AppClass {
    @prop({ default: 'WISHLIST', required: true})
    public state!: string;

    @prop()
    public userCoverLetter?: string;

    @prop()
    public userStory?: string;

    @prop({ type: () => [Emails], required: true })
    public emails: Emails[];

    @prop({ required: true})
    public userId!: string;

    @prop({ ref: () => ProfileClass, required: true })
    public profile!: Ref<ProfileClass>;

    @prop({ ref: () => JobClass, required: true })
    public job!: Ref<JobClass>;

    @prop({ ref: () => ResumeClass, required: true })
    public userResume!: Ref<ResumeClass>;

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const AppModel = getModelForClass(AppClass);
export { AppModel, AppClass };