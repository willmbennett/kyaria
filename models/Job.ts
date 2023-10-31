import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose,
    index
} from "@typegoose/typegoose";

class Skill {
    @prop()
    public salience?: number;

    @prop({ required: true })
    public skill!: string;

    @prop()
    public confidence?: number;

    @prop()
    public diffbotUri?: string;
}

class TFIDFEntry {
    @prop({ required: true })
    term: string;

    @prop({ required: true })
    value: number;  // The tf-idf value
}

class SimilarJob {
    @prop({ required: true })
    jobId: string; // ID of a similar job
    
    @prop({ required: true })
    similarity: number; // cosine similarity value
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "jobs",
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
@index({ link: 1 }, { unique: true }) // compound index
class JobClass {
    @prop({ required: true })
    public jobTitle!: string;

    @prop({ required: true })
    public link!: string;

    @prop()
    public diffbotUri?: string;

    @prop()
    public userId?: string;

    @prop()
    public company: string;

    @prop()
    public companyDiffbotUri?: string;

    @prop()
    public location: string;

    @prop()
    public employmentType?: string;

    @prop()
    public salaryRange?: string;

    @prop()
    public remote?: string;

    @prop()
    public aboutCompany?: string;

    @prop()
    public jobDescription?: string;

    @prop()
    public qualifications?: string[];

    @prop()
    public responsibilities?: string[];

    @prop({ type: () => [Skill] }) // Define skills as an array of Skill objects
    public skills?: Skill[]; // Add the skills field to your schema

    @prop({ type: () => [TFIDFEntry] })
    public tfidf?: TFIDFEntry[];

    @prop({ type: () => [SimilarJob] })
    public similarJobs?: SimilarJob[];

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const JobModel = getModelForClass(JobClass);
export { JobModel, JobClass };