import { SubscriptionModel, SubscriptionClass } from "../models/Subscription";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, ObjectIdtoString, dateToString } from "./utils";
var transformProps = require('transform-props');

export async function createSubscription(data: Partial<SubscriptionClass>) {
    await connectDB();
    console.log("Checking for existing subscription");

    // Check if a subscription already exists for this userId
    const existingSubscription = await SubscriptionModel.findOne({ userId: data.userId });

    if (existingSubscription) {
        console.log("Subscription already exists for userId:", data.userId);
        await updateSubscription(existingSubscription.customerId, { status: 'active' })
        await SubscriptionModel.findByIdAndUpdate(existingSubscription._id,
            {
                customerId: data.customerId,
                status: 'active'
            }
        );
        // You can decide to return the existing subscription or just a confirmation message
        return { subscription: existingSubscription._id.toString() };
    } else {
        console.log("Creating new subscription");
        const newSubscription = await SubscriptionModel.create(data);

        if (newSubscription) {
            console.log("New subscription created:", newSubscription);
            return { subscription: newSubscription._id.toString() };
        } else {
            console.error("Failed to create subscription");
            return { error: "Failed to create subscription" };
        }
    }
}

export async function getSubscription(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "User ID not included" };
        }

        // Check if a subscription already exists for this userId
        const subscription = await SubscriptionModel.findOne({ userId: userId });

        if (subscription) {
            transformProps(subscription, castToString, '_id');
            transformProps(subscription, dateToString, ["createdAt", "updatedAt"]);
            //console.log(subscription)
            return {
                subscription,
            };
        } else {
            return { error: "Subscription not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function updateSubscription(customer: string, data: Partial<SubscriptionClass>) {
    try {
        await connectDB();
        console.log("Made it to updateSubscription")
        console.log(`customer: ${customer}`)
        const existingSubscription = await SubscriptionModel.findOne({ customerId: customer });

        console.log(`data to update subscription with: ${JSON.stringify(data)}`)
        console.log(`existingSubscription: ${existingSubscription}`)
        if (existingSubscription) {

            const subscription = await SubscriptionModel.findByIdAndUpdate(
                existingSubscription._id,
                data
            )
                .lean()
                .exec();

            if (subscription) {
                transformProps(subscription, ObjectIdtoString, '_id');
                transformProps(subscription, dateToString, ["createdAt", "updatedAt"]);
                console.log(subscription)
                return {
                    subscription,
                };
            } else {
                return { error: "Subscription not found" };
            }
        } else {
            return { error: "Subscription not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}