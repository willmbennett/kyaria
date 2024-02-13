import { getResumes } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { getProfile } from "../../../lib/profile-db";
import { Pitch } from "../../components/pitch/Pitch";
import UserQuestionnaire from "../../components/questionaire/Questionnaire";

type getResumesType = {
    resumes: ResumeClass[]
}

export default async function QuestionnairePage() {
    const { userId } = await checkSubscription()
    console.log('userId: ', userId)
    const { resumes } = await getResumes(userId) as getResumesType
    const { profile } = await getProfile(userId);
    const profileId = profile?._id.toString()

    console.log('profile: ', profile)

    // If no profile redirect to profile
    if (!profileId) {
        redirect(`/profile/${userId}`)
    }

    // If no resumes redirect to resume builder
    if (resumes.length == 0) {
        redirect("/resumebuilder")
    }

    return (
        <UserQuestionnaire
            userId={userId}
            profileId={profileId}
            currentState={profile?.questionnaire}
        />
    );
}
