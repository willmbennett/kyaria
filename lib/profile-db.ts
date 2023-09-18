import { Profile, ProfileClass } from "../models/Profile";
import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";

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

        const parsedId = stringToObjectId(userId);

        if (!parsedId) {
            return { error: "Profile not found" };
        }

        //console.log(parsedId)
        const profile = await Profile.findOne({userId: parsedId}).lean().exec();

        if (profile) {
            const stringId = profile._id.toString()
            profile["id"] = stringId;
            profile["_id"] = stringId;
            //console.log(profile)
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

export async function updateProfile(data: any) {
    try {
        await connectDB();

        const profile = await Profile.findByIdAndUpdate(
            data._id,
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