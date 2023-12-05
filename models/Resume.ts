import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { ResumeScanDataClass } from "./ResumeScan";

class Responsibilities {
    @prop()
    public _id?: string;

    @prop()
    public content?: string;

    @prop()
    public detail?: string;

    @prop({ default: true })
    public show?: boolean;

    @prop()
    public starStory?: string;
}

class ProfessionalExperience {
    @prop()
    public _id?: string;

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

    @prop()
    public current?: boolean;

    @prop({ default: true })
    public show?: boolean;

    @prop()
    public summary?: string;

    @prop({ type: () => [Responsibilities] })
    public responsibilities?: Responsibilities[];
}

class Details {
    @prop()
    public _id?: string;

    @prop()
    public content?: string;

    @prop()
    public detail?: string;

    @prop()
    public starStory?: string;

    @prop({ default: true })
    public show?: boolean;
}

class GPA {
    @prop()
    public _id?: string;

    @prop()
    public score?: string;

    @prop({ default: 4.0 })
    public scoringSystem?: string;
}

class Education {
    @prop()
    public _id?: string;
    
    @prop()
    public degree?: string;

    @prop()
    public institution?: string;

    @prop()
    public location?: string;

    @prop()
    public start_date?: string;

    @prop({ type: () => [GPA] })
    public gpa?: GPA;

    @prop()
    public end_date?: string;

    @prop({ default: true })
    public show?: boolean;

    @prop()
    public summary?: string;

    @prop({ type: () => [Details] })
    public details?: Details[];
}

class Certification {
    @prop()
    public _id?: string;
    
    @prop()
    public certification?: string;

    @prop()
    public provider?: string;

    @prop()
    public start_date?: string;

    @prop()
    public end_date?: string;

    @prop({ default: true })
    public show?: boolean;
}

class Award {
    @prop()
    public _id?: string;
    
    @prop()
    public award?: string;

    @prop()
    public organization?: string;

    @prop()
    public date?: string;

    @prop({ default: true })
    public show?: boolean;
}

class Publication {
    @prop()
    public _id?: string;
    
    @prop()
    public publication?: string;

    @prop()
    public publisher?: string;

    @prop()
    public date?: string;

    @prop({ default: true })
    public show?: boolean;
}

class Project {
    @prop()
    public _id?: string;
    
    @prop()
    public name: string;

    @prop()
    public organization: string;

    @prop()
    public Link?: string;

    @prop()
    public LinkTitle?: string;

    @prop()
    public location?: string;

    @prop()
    public start_date?: string;

    @prop()
    public end_date?: string;

    @prop()
    public current?: boolean;

    @prop({ default: true })
    public show?: boolean;

    @prop()
    public summary?: string;

    @prop({ type: () => [Details] })
    public details?: Details[];
}

class Volunteering {
    @prop()
    public _id?: string;
    
    @prop()
    public involvement: string;

    @prop()
    public organization: string;

    @prop()
    public location?: string;

    @prop()
    public start_date?: string;

    @prop()
    public end_date?: string;

    @prop()
    public current?: boolean;

    @prop({ default: true })
    public show?: boolean;

    @prop()
    public summary?: string;

    @prop({ type: () => [Details] })
    public details?: Details[];
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "resumes",
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
class ResumeClass {
    @prop()
    public name?: string;
    createdAt: Date | string;
    updatedAt: Date | string;

    @prop({ ref: () => ResumeScanDataClass})
    public resumeScan?: Ref<ResumeScanDataClass>;

    @prop()
    public title?: string;

    @prop()
    public email?: string;

    @prop()
    public phone?: string;

    @prop({ default: {} })
    public social_links?: { [key: string]: string } = {};

    @prop()
    public location?: string;

    @prop()
    public summary?: string;

    @prop({ type: () => [String] })
    public areas_of_expertise?: string[];

    @prop({ type: () => [String] })
    public skills?: string[];

    @prop({ type: () => [String] })
    public interests?: string[];

    @prop({ type: () => [ProfessionalExperience] })
    public professional_experience?: ProfessionalExperience[];

    @prop({ type: () => [Education] })
    public education?: Education[];

    @prop({ type: () => [Project] })
    public projects?: Project[];

    @prop({ type: () => [Publication] })
    public publications?: Publication[];

    @prop({ type: () => [Certification] })
    public certifications?: Certification[];

    @prop({ type: () => [Volunteering] })
    public volunteering?: Volunteering[];

    @prop({ type: () => [Award] })
    public awards?: Award[];

    @prop({ required: true})
    public userId!: string;

    _id: mongoose.Types.ObjectId | string;
}

const ResumeModel = getModelForClass(ResumeClass);
export { ResumeModel, ResumeClass, ProfessionalExperience, Responsibilities, Education, Project, Publication, Award, Certification, Volunteering, Details, GPA };