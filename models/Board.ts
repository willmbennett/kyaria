import {
    ModelOptions,
    Severity,
    getModelForClass,
    prop,
    mongoose,
} from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "boards",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class BoardClass {
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true })
    public name: string;

    @prop()
    public columnNames?: string[];

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const BoardModel = getModelForClass(BoardClass);
export { BoardModel, BoardClass };