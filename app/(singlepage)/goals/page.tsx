import { redirect } from "next/navigation";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import QuestionnaireDescription from "../../components/profile/onboarding/descriptions/QuestionnaireDescription";
import { useGetOrCreateProfile } from "../../../lib/hooks/use-create-profile";

export default async function GoalsPage() {
    const { userId } = await checkSubscription()

    const { profile } = await useGetOrCreateProfile(userId);

    const questionnaire = profile?.questionnaire
    const profileId = profile?._id.toString()

    if (!profileId) redirect('/')

    return (
        <div className='max-w-3xl p-4 w-full h-full overflow-auto'>
            <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
                Goals
            </h1>
            <QuestionnaireDescription
                questionnaire={questionnaire}
                userId={userId}
                profileId={profileId} />
        </div>
    );
}
