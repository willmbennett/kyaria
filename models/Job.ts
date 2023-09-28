import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose,
    index
} from "@typegoose/typegoose";

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
    public company: string;

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

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const JobModel = getModelForClass(JobClass);
export { JobModel, JobClass };