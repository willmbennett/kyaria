import { cache } from "react";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { getUserQuestions } from "../../lib/question-db";
import { questionOptions } from "./helper";
import { QuestionClass } from "../../models/Question";
import { BehavioralsHomePage } from "../components/behaviorals/BehavioralsHomePage";

export default async function ChatBotHomePage() {
    const { userId } = await checkSubscription();

    if (!userId) {
        redirect('/');
    }

    const loadQuestions = cache(async (userId: string) => {
        return await getUserQuestions(userId);
    });
    const { questions } = await loadQuestions(userId) as { questions: QuestionClass[] };

    const userQuestions = questions.map(q => q.question);
    const newQuestions = questionOptions.filter(q => !userQuestions.includes(q));

    return (
        <div className="w-full h-full overflow-y-scroll text-center p-4 flex flex-col gap-4 items-center">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Let's Ace the Behavioral Interview
                </h1>
                <p className="text-lg text-gray-600">
                    Start by selecting which question you want to answer. We've provided a list of top interview questions or you can add your own.
                </p>
            </div>
            <div className="max-w-3xl w-full">
                <BehavioralsHomePage userId={userId} questionOptions={newQuestions} currentQuestions={userQuestions} />
            </div>
        </div>
    );
}
