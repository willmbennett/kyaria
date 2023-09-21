import { Profile, ProfileClass } from "../models/Profile";
import connectDB from "./connect-db";
import { stringToObjectId, castToString } from "./utils";
var transformProps = require('transform-props');

interface ProfileFilter {
    page?: number;
    limit?: number;
}

export async function getProfiles(filter: ProfileFilter = {}) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const profiles = await Profile.find().skip(skip).limit(limit).lean().exec();

        const results = profiles.length;

        return {
            profiles: profiles,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function createProfile(data: ProfileClass) {
    try {
        await connectDB();

        console.log(`Profile to create: ${JSON.stringify(data)}`)

        const profile = await Profile.create(data);

        console.log(`Created Profile: ${JSON.stringify(profile)}`)

        return {
            profile,
        };
    } catch (error) {
        return { error };
    }
}

export async function getProfile(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "Profile not found" };
        }

        //console.log(parsedId)
        const profile = await Profile.findOne({userId: userId}).lean().exec();

        //console.log(profile)
        if (profile) {
            //console.log('about to transform props')
            transformProps(profile, castToString, '_id');
            //console.log(profile)
            return {
                profile
            };
        } else {
            return { error: "Profile not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateProfile(id: string, data: any) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        console.log(id)

        console.log(`data to update profile with: ${JSON.stringify(data)}`)

        const profile = await Profile.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (profile) {
            return {
                profile,
            };
        } else {
            return { error: "Profile not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteProfile(id: string) {
    try {
        await connectDB();

        console.log(id)

        const parsedId = stringToObjectId(id);

        console.log(parsedId)

        if (!parsedId) {
            return { error: "Profile not found" };
        }

        const profile = await Profile.findByIdAndDelete(parsedId).exec();

        if (profile) {
            return {};
        } else {
            return { error: "Profile not found" };
        }
    } catch (error) {
        return { error };
    }
}