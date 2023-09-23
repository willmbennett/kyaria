import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose,
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
class JobClass {
    @prop({ required: true })
    public jobTitle!: string;

    @prop()
    public link: string;

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

const Job = getModelForClass(JobClass);
export { Job, JobClass };