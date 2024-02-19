import {
    ModelOptions,
    getModelForClass,
    prop,
    mongoose,
    index
} from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "employers",
    }
})
@index({ targetDiffbotId: 1 }) // compound index
class EmployerClass {

    @prop({ required: true })
    diffbotUri?: string;

    @prop({ required: true })
    targetDiffbotId?: string;

    @prop()
    summary?: string;

    @prop()
    image?: string;

    @prop()
    types?: string[];

    @prop()
    name?: string;

    @prop()
    type?: string;


    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const EmployerModel = getModelForClass(EmployerClass);
export { EmployerModel, EmployerClass };