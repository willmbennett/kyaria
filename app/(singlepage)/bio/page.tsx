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
        <div className='max-w-3xl p-4 w-full h-full overflow-auto'>
            <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
                Let's update your LinkedIn Bio
            </h1>
            <Bio
                userId={userId}
                resumes={resumes}
                profileId={profileId}
                currentBio={profile?.bio}
                desiredRole={profile?.questionnaire?.desiredRole}
            />
        </div>
    );
}
