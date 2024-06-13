import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { getJob } from "../../../lib/job-db";
import { getProfile } from "../../../lib/profile-db";
import JobDescription from "../../apps/[id]/(pages)/jobdescription/components/JobDescription";

export default async function JobPage({ params }: { params: { id: string } }) {
    const { job } = await getJob(params.id)
    const { activeSubscription, userId } = await checkSubscription()
    const { profile } = await getProfile(userId, true); // true means hide any deleted items from profile
    const keyWords = job?.tfidf?.map((tf) => tf.term).slice(0, 10)

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center p-2 md:p-5 min-h-screen">
            <JobDescription
                jobData={job}
                addBoard={true}
                profile={profile}
                topWords={keyWords || ['']}
                activeSubscription={activeSubscription}
                currentUserId={userId}
            />
        </div>
    );
}
