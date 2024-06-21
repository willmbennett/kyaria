import { checkSubscription } from "../../../../lib/hooks/check-subscription";
import { Message } from "ai";
import { getMockInterview } from "../../../../lib/mockinterview-db";
import { InterviewScore, Recording } from "../../../../models/MockInterview";
import { redirect } from "next/navigation";
import { MockInterviews } from "../../../components/mockinterviews/MockInterviews";

export default async function MockInterviewPage({ params }: { params: { id: string } }) {
    const { userId, admin } = await checkSubscription()
    //console.log({ userId, activeSubscription, admin })

    if (!userId) {
        redirect('/eve')
    }

    const MockInterviewId = params.id

    if (!MockInterviewId) {
        return <p>Mock Interview not found</p>
    }

    const { MockInterview } = await getMockInterview(MockInterviewId)

    if (!MockInterview) {
        return <p>Mock Interview not found</p>
    }

    // Make recorded interviews private
    if (MockInterview.userId != userId && !admin) redirect('/eve')

    const messages: Message[] = MockInterview.messages || []

    const recordings: Recording[] = MockInterview.recordings || []

    const questions: string[] = MockInterview.questions || []

    const interviewScores: InterviewScore[] = MockInterview.interviewScores || []

    const feedback = MockInterview.feedback

    const mockInterviewDate = MockInterview.createdAt.toString()


    //console.log('At Eve, messages ', messages)

    return (
        <MockInterviews
            id={MockInterview._id.toString()}
            name={MockInterview.name}
            questions={questions}
            messages={messages}
            recordings={recordings.map(r => ({ link: r.vercelLink, createdTimeStamp: r.createdAt }))}
            mockInterviewDate={mockInterviewDate}
            interviewScores={interviewScores.map(v =>
            ({
                question: v.question,
                score: v.score,
                explanation: v.explanation
            })
            )}
            feedback={feedback}
        />
    );
}
