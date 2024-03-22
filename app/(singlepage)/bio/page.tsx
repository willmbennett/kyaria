import { getResumes } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { Bio } from "../../components/bio/Bio";
import { createProfile, getProfile } from "../../../lib/profile-db";
import { BioHero } from "../../components/bio/BioHero";
import ProductDemo from "../../components/bio/ProductDemo";

type getResumesType = {
    resumes: ResumeClass[]
}

export default async function ProfilePage() {
    const { userId, activeSubscription } = await checkSubscription()

    if (!userId) {
        return (
            <>
                <BioHero />
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
                    Let's update your LinkedIn Bio
                </h1>
                <Bio
                    userId={userId}
                    resumes={resumes}
                    profileId={profileId}
                    currentBio={profile?.bio}
                    desiredRole={profile?.questionnaire?.desiredRole}
                    activeSubscription={activeSubscription}
                />
            </div>
        </div>
    );
}
