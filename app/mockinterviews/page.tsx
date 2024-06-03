import { checkSubscription } from "../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { getMockInterviews } from "../../lib/mockinterview-db";

export default async function MockInterviewPage() {
    const { userId, activeSubscription, admin } = await checkSubscription()
    //console.log({ userId, activeSubscription, admin })

    if (!admin) {
        redirect('/')
    }

    const { MockInterviews } = await getMockInterviews(userId)


    if (!MockInterviews || MockInterviews.length == 0) {
        return <p>No mock interviews, go ask Eve to do a mock interview!</p>
    }

    return (
        <>{`Made it here with MockInterviews: ${JSON.stringify(MockInterviews.map(m => m._id))}`}</>
    );
}
