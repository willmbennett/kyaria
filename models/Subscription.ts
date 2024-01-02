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
        collection: "subscriptions",
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
@index({ userId: 1, customerId: 1 }, { unique: true }) // compound index
class SubscriptionClass {

    @prop({ required: true, unique: true })
    public userId: string;

    @prop({ required: true, unique: true })
    public customerId: string;

    @prop({ required: true, enum: ['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid'] })
    public status: string;

    @prop()
    public planType?: string;

    @prop()
    public expirationDate?: Date;

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const SubscriptionModel = getModelForClass(SubscriptionClass);
export { SubscriptionModel, SubscriptionClass };