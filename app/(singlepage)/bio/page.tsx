import { getDefaultResumeId } from "../../../lib/resume-db";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { Bio } from "../../components/bio/Bio";
import { BioHero } from "../../components/bio/BioHero";
import ProductDemo from "../../components/bio/ProductDemo";
import { useGetOrCreateProfile } from "../../../lib/hooks/use-create-profile";
import LinkedInBioDescription from "../../components/profile/onboarding/descriptions/BioDescription";

export default async function ProfilePage() {
    const { userId } = await checkSubscription()

    if (!userId) {
        return (
            <>
                <BioHero />
                <ProductDemo />
            </>
        )
    }


    //console.log('userId: ', userId)
    const { defaultResumeId } = await getDefaultResumeId(userId)
    const { profile } = await useGetOrCreateProfile(userId);
    const profileId = profile?._id.toString()

    if (!profileId) {
        redirect(`/`)
    }

    return (
        <div className='max-w-3xl p-4 w-full h-full overflow-auto'>
            <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
                Let's update your LinkedIn Bio
            </h1>
            <LinkedInBioDescription
                userId={userId}
                bio={profile?.bio || ''}
                userResume={defaultResumeId}
                profileId={profileId}
                questionnaire={profile?.questionnaire} />
        </div>
    );
}
