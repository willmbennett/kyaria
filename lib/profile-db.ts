import { ProfileModel, ProfileClass } from "../models/Profile";
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

        const profiles = await ProfileModel.find().skip(skip).limit(limit).lean().exec();

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
        // You might not want to log sensitive user information in a production environment.
        // This is more suited for a development environment.
        //console.log(`Profile to create: ${JSON.stringify(data)}`);

        const profile = await ProfileModel.create(data);
        //console.log(`Created Profile: ${JSON.stringify(profile)}`);

        //return { profile };
    } catch (error) {
        console.error("Error creating profile:", error); // Log the error for debugging purposes
        return { error: 'Failed to create profile' }; // Generic error message to user
    }
}


function filterHiddenFields(profile: ProfileClass) {
    if (profile.professional_experience) {
        // Remove any professional experience marked show=false
        profile.professional_experience = profile.professional_experience.filter(exp => exp.show !== false)

        // Remove all responsibilities marked show=false
        profile.professional_experience.forEach(exp => {
            exp.responsibilities = exp.responsibilities?.filter(resp => resp.show !== false);
        });
    }

    if (profile.education) {
        // Remove any education marked show=false
        profile.education = profile.education.filter(edu => edu.show !== false)

        // Remove all eduction details marked show=false
        profile.education.forEach(edu => {
            edu.details = edu.details?.filter(detail => detail.show !== false);
        });
    }

    return(profile)
}

export async function getProfile(userId: string, filter = false,) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "Profile not found" };
        }

        //console.log(parsedId)
        const profile = await ProfileModel.findOne({ userId: userId }).lean().exec();

        //console.log(profile)
        if (profile) {
            //console.log('about to transform props')
            transformProps(profile, castToString, '_id');
            //console.log(profile)
            if (filter) {
                const cleanedProfile = filterHiddenFields(profile)
                return {
                    profile: cleanedProfile
                };
            } else {
                return {
                    profile: undefined
                };
            }

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

        //console.log(id)

        //console.log(`data to update profile with: ${JSON.stringify(data)}`)

        const profile = await ProfileModel.findByIdAndUpdate(
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

        //console.log(id)

        const parsedId = stringToObjectId(id);

        //console.log(parsedId)

        if (!parsedId) {
            return { error: "Profile not found" };
        }

        const profile = await ProfileModel.findByIdAndDelete(parsedId).exec();

        if (profile) {
            return {};
        } else {
            return { error: "Profile not found" };
        }
    } catch (error) {
        return { error };
    }
}