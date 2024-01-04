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
        collection: "posts",
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
@index({ userId: 1 }) // compound index
class PostClass {

    @prop({ required: true })
    userId: string;

    @prop({ required: true })
    title: string;

    @prop()
    featuredImage?: string;

    @prop()
    images?: string[];

    @prop()
    content?: string;

    @prop()
    author?: string;

    @prop()
    tags?: string[];

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const PostModel = getModelForClass(PostClass);
export { PostModel, PostClass };