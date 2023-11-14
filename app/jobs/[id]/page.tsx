import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { getJob } from "../../../lib/job-db";
import { getProfile } from "../../../lib/profile-db";
import JobDescription from "../../components/apps/components/pages/JobDescription";

export default async function JobPage({ params }: { params: { id: string } }) {
    const { job } = await getJob(params.id)
    const session = await getServerSession(authOptions);
    const { profile } = await getProfile(session?.user?.id || '', true); // true means hide any deleted items from profile
    const keyWords = job?.tfidf?.map((tf) => tf.term).slice(0,10)

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center p-2 md:p-5 min-h-screen">
            <JobDescription
                jobData={job}
                addBoard={true}
                profile={profile}
                topWords={keyWords || ['']}
            />
        </div>
    );
}
