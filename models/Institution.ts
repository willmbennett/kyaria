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
        collection: "institutions",
    }
})
@index({ targetDiffbotId: 1 }) // compound index
class InstitutionClass {

    @prop({ required: true })
    diffbotUri?: string;

    @prop({ required: true })
    targetDiffbotId?: string;

    @prop()
    targetDiffbotUri?: string;

    @prop()
    summary?: string;

    @prop()
    image?: string;

    @prop()
    type?: string;

    @prop()
    types?: string[];

    @prop()
    name?: string;

    @prop()
    surfaceForm?: string;


    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const InstitutionModel = getModelForClass(InstitutionClass);
export { InstitutionModel, InstitutionClass };