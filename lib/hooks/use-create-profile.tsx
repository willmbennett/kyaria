'use server'

import { redirect } from "next/navigation";
import { createProfile, getProfile } from "../profile-db";

export const useGetOrCreateProfile = async (userId: string) => {
    let profileId
    let profile
    const { profile: FetchedProfile } = await getProfile(userId);
    profileId = FetchedProfile?._id.toString()
    profile = FetchedProfile
    if (!profileId) {
        const { newProfileId } = await createProfile({ userId })

        if (newProfileId) {
            const { profile: NewProfile } = await getProfile(userId)
            profileId = newProfileId
            profile = NewProfile
        }
    }

    if (!profileId) {
        redirect(`/`)
    }
    return { profile }
}