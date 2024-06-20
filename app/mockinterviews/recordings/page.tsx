
import { redirect } from "next/navigation";
import { cache } from "react";
import { getMockInterviews } from "../../../lib/mockinterview-db";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { MockInterviewClass } from "../../../models/MockInterview";
export default async function MockInterviewPage() {
    const { userId } = await checkSubscription(true)

    const loadMockInterviews = cache(async (userId: string) => {
        return await getMockInterviews(userId)
    })
    const { MockInterviews } = await loadMockInterviews(userId) as { MockInterviews: MockInterviewClass[] }

    if (MockInterviews.length == 0) redirect('/eve');
    else redirect(`/mockinterviews/recordings/${MockInterviews[0]._id.toString()}`)
}
