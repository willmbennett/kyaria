import { getResumes } from "../../../lib/resume-db";
import { ResumeClass } from "../../../models/Resume";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { getProfile } from "../../../lib/profile-db";
import { Pitch } from "../../components/pitch/Pitch";

type getResumesType = {
    resumes: ResumeClass[]
}

export default async function ProfilePage() {
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
        <div className='flex flex-col space-y-10'>
            <div className='flex flex-col space-y-2'>
                <h1 className="text-center sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                    Let's write you an elevator pitch
                </h1>
                <Pitch
                    resumes={resumes}
                    profileId={profileId}
                    currentPitch={profile?.story || ''}
                    desiredRole={profile?.questionnaire?.desiredRole}
                />
            </div>
        </div>
    );
}
