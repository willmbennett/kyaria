import {
    ModelOptions,
    Severity,
    getModelForClass,
    index,
    prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "profiles",
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ email: 1 })
class ProfileClass {
    @prop({ required: true })
    public name!: string;

    @prop()
    public title?: string;

    @prop({ required: true, unique: true })
    public email!: string;

    @prop()
    public phone?: string;

    @prop()
    public social_links?: { [key: string]: string };

    @prop()
    public location?: string;

    @prop()
    public summary?: string;

    @prop({ type: () => [String] })
    public areas_of_expertise?: string[];

    @prop({ type: () => [String] })
    public skills?: string[];

    @prop({ type: () => [Object] })
    public professional_experience?: {
        title?: string;
        company?: string;
        location?: string;
        start_date?: string;
        end_date?: string;
        responsibilities?: {
            content?: string;
            starStory?: string;
        }[];
    }[];

    @prop({ type: () => [Object] })
    public education?: {
        degree?: string;
        institution?: string;
        location?: string;
        details?: {
            content?: string;
            starStory?: string;
        }[];
    }[];

    @prop({ required: true })
    public userId!: string;

    _id: mongoose.Types.ObjectId | string;
    id: string;
}

const Profile = getModelForClass(ProfileClass);
export { Profile, ProfileClass };