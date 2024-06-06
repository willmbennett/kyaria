import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { AppClass } from "./App";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "questions",
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
class QuestionClass {
    @prop({ required: true })
    public userId!: string;

    @prop({ ref: () => AppClass })
    public appId?: Ref<AppClass>;

    @prop()
    question: string;

    @prop()
    situation?: string;

    @prop()
    details?: string;

    @prop()
    answer?: string;

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const QuestionModel = getModelForClass(QuestionClass);
export { QuestionModel, QuestionClass };