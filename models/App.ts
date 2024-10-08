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
import { BoardClass } from "./Board";
import { ChatClass } from "./Exports";

class Emails {
    @prop()
    public type?: string;

    @prop()
    public content?: string;
}

@ModelOptions({
    options: {
        allowMixed: Severity.ALLOW
    }
})
class File {
    @prop()
    public _id!: string;

    @prop()
    public fileUrl!: string;

    @prop()
    public fileName!: string;

    @prop()
    public tags?: string[];

    @prop()
    public DateCreated?: Date;
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "apps"
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class AppClass {
    @prop({ default: 'Wishlist', required: true })
    public state!: string;

    @prop({ default: true, required: true })
    public active!: boolean;

    @prop()
    public userCoverLetter?: string;

    @prop()
    public userStory?: string;

    @prop({ type: () => [Emails], required: true })
    public emails: Emails[];

    @prop({ required: true })
    public userId!: string;

    @prop({ ref: () => ProfileClass })
    public profile?: Ref<ProfileClass>;

    @prop({ ref: () => JobClass, required: true })
    public job!: Ref<JobClass>;

    @prop({ ref: () => ResumeClass, required: true })
    public userResume!: Ref<ResumeClass>;

    @prop({ ref: () => BoardClass })
    public boardId?: Ref<BoardClass>;

    @prop({ ref: () => ChatClass })
    public chatId?: Ref<ChatClass>;

    @prop()
    public notes?: string;

    @prop({ type: () => [File] })
    public files?: File[];

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const AppModel = getModelForClass(AppClass);
export { AppModel, AppClass, Emails, File };