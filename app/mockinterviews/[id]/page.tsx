import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { Message } from "ai";
import { getMockInterview } from "../../../lib/mockinterview-db";
import { Recording } from "../../../models/MockInterview";
import { redirect } from "next/navigation";
import { MockInterviews } from "../../components/mockinterviews/MockInterviews";

export default async function MockInterviewPage({ params }: { params: { id: string } }) {
    const { userId, activeSubscription, admin } = await checkSubscription()
    //console.log({ userId, activeSubscription, admin })

    if (!admin) {
        redirect('/')
    }

    const MockInterviewId = params.id

    if (!MockInterviewId) {
        return <p>Mock Interview not found</p>
    }

    const { MockInterview } = await getMockInterview(MockInterviewId)

    if (!MockInterview) {
        return <p>Mock Interview not found</p>
    }
    //console.log('At Eve, chat ', chat)

    const messages: Message[] = MockInterview.messages || []

    const recordings: Recording[] = MockInterview.recordings || []

    const questions: string[] = MockInterview.questions || []


    //console.log('At Eve, messages ', messages)

    return (
        <div className="w-full h-full sm:p-1 md:p-2 lg:p-3 xl:p-4 overflow-hidden">
            <MockInterviews
                id={MockInterview._id.toString()}
                name={MockInterview.name}
                questions={questions}
                messages={messages}
                recordings={recordings.map(r => ({ link: r.vercelLink, createdTimeStamp: r.createdAt }))}
            />
        </div>

    );
}
