import { redirect } from "next/navigation";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { Container } from "../../components/landingpage/Container";
import { Button } from "../../components/Button";
import CreateJobApp from "../../components/apps/new/CreateJobApp";
import { getProfile } from "../../../lib/profile-db";
import { ProfileClass } from "../../../models/Profile";
import { ResumeClass } from "../../../models/Resume";
import { getResumes } from "../../../lib/resume-db";

export default async function NewAppPage() {
    const { activeSubscription, userId } = await checkSubscription()
    const { profile } = await getProfile(userId) as { profile: ProfileClass }
    const { resumes } = await getResumes(userId) as { resumes: ResumeClass[] }

    if (!userId) {
        redirect('/')
    }

    if (!profile || resumes.length == 0) {
        redirect(`/profile/${userId}`)
    }

    return (
        <section className="flex flex-col lg:flex-row overflow-hidden pt-5 w-full pb-14 lg: px-4">
            <Container>
                <div className="mx-auto max-w-lg pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-5xl xl:pb-14">
                    <div className='flex pb-3'>
                        <Button size='sm' variant='ghost' href="/board">← Back to Board</Button>
                    </div>
                    <h1 className="pb-10 text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-6xl xl:leading-tighter">
                        Add a new Job Application
                    </h1>
                    {activeSubscription ?
                        <CreateJobApp
                            userId={userId}
                            profileId={profile._id.toString()}
                            story={profile.story}
                            resumes={resumes}
                        />
                        :
                        <div className="w-full flex justify-center">
                            <Button href="/pricing"> Subscribe to add more Job Posts </Button>
                        </div>
                    }
                </div>
            </Container>
        </section>
    );
}
