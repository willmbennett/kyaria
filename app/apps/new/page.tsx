import { redirect } from "next/navigation";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { Container } from "../../components/landingpage/Container";
import { Button } from "../../components/Button";
import CreateJobApp from "../../components/apps/new/CreateJobApp";
import { createProfile, getProfile } from "../../../lib/profile-db";
import { ResumeClass } from "../../../models/Resume";
import { getResumes } from "../../../lib/resume-db";

type getResumesType = {
    resumes: ResumeClass[]
}

export default async function NewAppPage() {
    const { userId } = await checkSubscription()

    if (!userId) {
        redirect('/')
    }

    //console.log('userId: ', userId)
    const { resumes } = await getResumes(userId) as getResumesType
    let profileId
    let profile
    const { profile: newProfile } = await getProfile(userId);
    profile = newProfile
    profileId = profile?._id.toString()
    if (!profileId) {
        await createProfile({ userId })
        const { profile: newProfile } = await getProfile(userId);
        profile = newProfile
        profileId = profile?._id.toString()
    }

    if (!profileId || !profile) {
        redirect(`/profile/${userId}`)
    }

    return (
        <section className="flex flex-col lg:flex-row overflow-hidden pt-5 w-full pb-14 lg: px-4">
            <Container>
                <div className="mx-auto max-w-lg pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-5xl xl:pb-14">
                    <CreateJobApp
                        userId={userId}
                        profileId={profileId}
                        story={profile.story}
                        resumes={resumes}
                    />
                </div>
            </Container>
        </section>
    );
}
