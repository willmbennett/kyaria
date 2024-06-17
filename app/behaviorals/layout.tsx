import { Metadata } from 'next';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { cache } from 'react';
import { SideBarItem } from '../helper';
import { getUserQuestions } from '../../lib/question-db';
import { QuestionClass } from '../../models/Question';
import { createQuestionAction, deleteQuestionAction } from './_action';
import { ActionItemType } from '../board/job-helper';
import { redirect } from 'next/navigation';
import { SidebarWrapper } from '../components/sidebar/SidebarWrapper';

const title = "Ace your Interviews with STAR stories";
const description = "Answer top behavioral questions with ease using AI! We take your resume and help you figure out how to answer tough questions. Perfectly formatted!";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.kyaria.ai'),
    title,
    description,
    referrer: 'strict-origin-when-cross-origin',
    openGraph: {
        title,
        description,
        locale: 'en_US',
        type: 'website',
        url: 'https://www.kyaria.ai/eve'
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
    },
};

export default async function QuestionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription()

    if (!userId) {
        redirect('/')
    }

    const loadQuestions = cache(async (userId: string) => {
        return await getUserQuestions(userId)
    })
    const { questions } = await loadQuestions(userId) as { questions: any }

    const items: SideBarItem[] = questions.map((question: QuestionClass, index: number) => ({
        id: question._id.toString(),
        href: `/behaviorals/${question._id.toString()}`,
        title: question.question || 'New Question',
        editable: true,
        category: 'Question'
    }))

    const createQuestion = async () => {
        "use server"
        return createQuestionAction({ userId })
    }

    const handleQuestionDeletion: ActionItemType = async (questionId: string, path: string) => {
        "use server"
        await deleteQuestionAction({ id: questionId, path })
        const url = "/behaviorals"
        return { url }
    }

    return (
        <SidebarWrapper
            userId={userId}
            sideBarTitle={'Questions'}
            items={items}
            createNew={createQuestion}
            newTitle={'New Question'}
            deleteItemAction={handleQuestionDeletion}
        >
            {children}
        </SidebarWrapper>
    );
}