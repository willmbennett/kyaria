import {
    ModelOptions,
    Severity,
    getModelForClass,
    prop,
    mongoose,
} from "@typegoose/typegoose";
import { Message } from "ai";

class Recording {
    @prop()
    public _id?: string;

    @prop()
    public vercelLink?: string;

    @prop()
    createdAt?: string;
}

class InterviewScore {
    @prop()
    public _id?: string;

    @prop()
    public question: string;

    @prop()
    public explanation: string;

    @prop()
    public score: 0 | 1 | 2 | 3 | 4 | 5;
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "mockinterview",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class MockInterviewClass {
    @prop({ required: true })
    public userId: string;

    @prop({ required: true })
    public chatId: string;

    @prop({ required: true })
    public name: string;

    @prop()
    public questions: string[];

    @prop({ type: () => [Recording] })
    public recordings?: Recording[];

    @prop({ type: () => [InterviewScore] })
    public interviewScores?: InterviewScore[];

    @prop()
    public messages?: Message[];

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const MockInterviewModel = getModelForClass(MockInterviewClass);
export { MockInterviewClass, MockInterviewModel, Recording, InterviewScore };