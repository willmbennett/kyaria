import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { getQuestion } from "../../../lib/question-db";
import { getDefaultResumeId } from "../../../lib/resume-db";
import { QuestionClass } from "../../../models/Question";
import { BehavioralsPage } from "../components/BehavioralsPage";

export default async function ChatbotPage({ params }: { params: { id: string } }) {
    const { userId } = await checkSubscription()

    const questionId = params.id

    if (!questionId) {
        return <p>Question not found</p>
    }

    const { question } = await getQuestion(questionId) as { question: QuestionClass }
    const { defaultResumeId } = await getDefaultResumeId(userId)

    if (!question) {
        return <p>We're sorry we had an issue finding that question</p>
    }
    //console.log('At Eve, chat ', chat)

    //console.log('At Eve, messages ', messages)

    return (
        <div className="flex justify-center w-full h-full overflow-y-scroll">
            <BehavioralsPage
                userId={userId}
                questionId={questionId}
                question={question.question}
                situation={question.situation}
                userResume={defaultResumeId}
                details={question.details}
                answer={question.answer}
            />
        </div>
    );
}
