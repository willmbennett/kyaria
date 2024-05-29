import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { PitchHero } from "../../components/pitch/PitchHero";
import ProductDemo from "../../components/pitch/ProductDemo";
import { getDefaultResumeId } from "../../../lib/resume-db";
import { useGetOrCreateProfile } from "../../../lib/hooks/use-create-profile";
import ElevatorPitchDescription from "../../components/profile/onboarding/descriptions/PitchDescription";

export default async function ProfilePage() {
    const { userId } = await checkSubscription()

    if (!userId) {
        return (
            <>
                <PitchHero />
                <ProductDemo />
            </>
        )
    }

    //console.log('userId: ', userId)
    const { defaultResumeId } = await getDefaultResumeId(userId)


    const { profile } = await useGetOrCreateProfile(userId);
    const profileId = profile?._id.toString()

    if (!profileId) {
        redirect('/')
    }

    return (
        <div className='max-w-3xl p-4 w-full h-full overflow-auto'>
            <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
                Let's write you an elevator pitch
            </h1>
            <ElevatorPitchDescription
                userId={userId}
                story={profile?.story}
                userResume={defaultResumeId}
                profileId={profileId}
                questionnaire={profile?.questionnaire} />
        </div>
    );
}
