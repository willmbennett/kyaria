import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose,
} from "@typegoose/typegoose";

class Responsibilities {
    @prop()
    public content?: string;

    @prop()
    public detail?: string;

    @prop()
    public starStory?: string;
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

    @prop({ type: () => [Responsibilities] })
    public responsibilities?: Responsibilities[];
}

class Details {
    @prop()
    public content?: string;

    @prop()
    public detail?: string;

    @prop()
    public starStory?: string;
}

class Education {
    @prop()
    public degree?: string;

    @prop()
    public institution?: string;

    @prop()
    public location?: string;

    @prop({ type: () => [Details] })
    public details?: Details[];
}

@ModelOptions({
    schemaOptions: {
        versionKey: false,
        collection: "resumes",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class ResumeClass {
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
    public summary?: string;

    @prop({ type: () => [String] })
    public areas_of_expertise?: string[];

    @prop({ type: () => [String] })
    public skills?: string[];

    @prop({ type: () => [ProfessionalExperience] })
    public professional_experience?: ProfessionalExperience[];

    @prop({ type: () => [Education] })
    public education?: Education[];

    @prop({ required: true})
    public userId!: string;

    _id: mongoose.Types.ObjectId | string;
}

const ResumeModel = getModelForClass(ResumeClass);
export { ResumeModel, ResumeClass };