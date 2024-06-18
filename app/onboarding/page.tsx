import { checkSubscription } from "../../lib/hooks/check-subscription";
import { useGetOrCreateProfile } from "../../lib/hooks/use-create-profile";
import { getDefaultResumeId } from "../../lib/resume-db";
import Onboarding from "../components/landingpage/Onboarding";

export default async function ChatBotHomePage() {
    const { userId } = await checkSubscription(true)

    const { profile } = await useGetOrCreateProfile(userId);
    const profileId = profile?._id.toString()

    const { defaultResumeId } = await getDefaultResumeId(userId)

    if (!profileId) throw new Error("Profile creation failed")

    return (
        <div className="flex w-full h-full justify-center">
            <Onboarding userId={userId} profileId={profileId} resumeId={defaultResumeId} />
        </div>
    );
}
