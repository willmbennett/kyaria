import {
    ModelOptions,
    Severity,
    getModelForClass,
    index,
    prop,
    mongoose,
} from "@typegoose/typegoose";

class Questionnaire {
    @prop()
    public desiredRole?: string;

    @prop({ type: Number })
    public industryExperience?: number;

    @prop()
    public jobSearchStatus?: string;

    @prop({ type: Number })
    public salaryMin?: number;

    @prop({ type: Number })
    public salaryMax?: number;
}

class ProfessionalExperience {
    @prop()
    public title?: string;

    @prop()
    public company?: string;

    @prop()
    public location?: string;

    @prop()
    public start_date?: string;

    @prop()
    public end_date?: string;

    @prop({ default: true })
    public show?: boolean;

    @prop({ type: () => [Details] })
    public responsibilities?: Details[];
}

class Details {
    @prop()
    public content?: string;

    @prop()
    public detail?: string;

    @prop({ default: true })
    public show?: boolean;
}

class Education {
    @prop()
    public degree?: string;

    @prop()
    public institution?: string;

    @prop()
    public location?: string;

    @prop()
    public start_date?: string;

    @prop()
    public end_date?: string;

    @prop({ default: true })
    public show?: boolean;

    @prop({ type: () => [Details] })
    public details?: Details[];
}

@ModelOptions({
    schemaOptions: {
        versionKey: false,
        collection: "profiles",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
@index({ userId: 1 })
class ProfileClass {
    @prop({ required: true })
    public name!: string;

    @prop()
    public title?: string;

    @prop({ required: true })
    public email!: string;

    @prop()
    public phone?: string;

    @prop()
    public social_links?: { [key: string]: string };

    @prop()
    public location?: string;

    @prop()
    public jobRecs?: string[];

    @prop()
    public summary?: string;

    @prop({ type: () => [String] })
    public areas_of_expertise?: string[];

    @prop({ type: () => [String] })
    public skills?: string[];

    @prop({ type: () => [ProfessionalExperience] })
    public professional_experience?: ProfessionalExperience[];

    @prop({ type: () => [Education] })
    public education?: Education[];

    @prop({ _id: false })
    public questionnaire?: Questionnaire;

    @prop({ required: true, unique: true })
    public userId!: string;

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const ProfileModel = getModelForClass(ProfileClass);
export { ProfileModel, ProfileClass };