import { getResumes } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { createProfile, getProfile } from "../../../lib/profile-db";
import { Pitch } from "../../components/pitch/Pitch";
import { PitchHero } from "../../components/pitch/PitchHero";
import ProductDemo from "../../components/pitch/ProductDemo";

type getResumesType = {
    resumes: ResumeClass[]
}

export default async function ProfilePage() {
    const { userId, activeSubscription } = await checkSubscription()

    if (!userId) {
        return (
            <>
                <PitchHero />
                <ProductDemo />
            </>
        )
    }

    //console.log('userId: ', userId)
    const { resumes } = await getResumes(userId) as getResumesType

    let profileId
    const { profile } = await getProfile(userId);
    profileId = profile?._id.toString()
    if (!profileId) {
        await createProfile({ userId })
        const { profile } = await getProfile(userId);
        profileId = profile?._id.toString()
    }

    if (!profileId) {
        redirect(`/profile/${userId}`)
    }

    return (
        <div className='flex flex-col space-y-10'>
            <div className='flex flex-col space-y-2'>
                <h1 className="text-center sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                    Let's write you an elevator pitch
                </h1>
                <Pitch
                    userId={userId}
                    resumes={resumes}
                    profileId={profileId}
                    currentPitch={profile?.story || ''}
                    desiredRole={profile?.questionnaire?.desiredRole}
                />
            </div>
        </div>
    );
}
