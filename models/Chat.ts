import {
    ModelOptions,
    Severity,
    getModelForClass,
    index,
    prop,
    mongoose,
} from "@typegoose/typegoose";
import { Message } from "ai";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "chats",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
@index({ userId: 1, sessionId: 1 }, { unique: true })
class ChatClass {
    @prop({ required: true })
    public userId: string;

    @prop({ required: true, unique: true })
    public sessionId!: string;

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;

    @prop({ required: true })
    public messages!: Message[];
}

const ChatModel = getModelForClass(ChatClass);
export { ChatModel, ChatClass };