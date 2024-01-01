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
        console.log("Attempting to connect to the database...");
        await connectDB();
        console.log("Database connection successful.");

        console.log(`Searching for existing subscription for customer: ${customer}...`);
        const existingSubscription = await SubscriptionModel.findOne({ customerId: customer });

        if (existingSubscription) {
            console.log(`Existing subscription found for customer: ${customer}, proceeding to update.`);
            console.log(`Data to update subscription with: ${JSON.stringify(data)}`);

            const subscription = await SubscriptionModel.findByIdAndUpdate(
                existingSubscription._id,
                data
            )
                .lean()
                .exec();

            if (subscription) {
                transformProps(subscription, ObjectIdtoString, '_id');
                transformProps(subscription, dateToString, ["createdAt", "updatedAt"]);
                console.log(`Subscription updated successfully:`, subscription);
                return { subscription };
            } else {
                console.log(`No subscription found for the given ID: ${existingSubscription._id}`);
                return { error: "Subscription not found" };
            }
        } else {
            console.log(`No existing subscription found for customer: ${customer}`);
            return { error: "Subscription not found" };
        }
    } catch (error) {
        console.error(`Error in updateSubscription for customer: ${customer}:`, error);
        return { error: error };
    }
}