import { checkSubscription } from '../../../lib/hooks/check-subscription';
import { cache } from 'react';
import { SideBarItem } from '../../helper';
import { getMockInterviews } from '../../../lib/mockinterview-db';
import { MockInterviewClass } from '../../../models/MockInterview';
import { handleMockInterviewDeletion } from './[id]/_action';
import { redirect } from 'next/navigation';
import { SidebarWrapper } from '../../components/sidebar/SidebarWrapper';

export default async function MockInterviews({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription(true)

    const loadMockInterviews = cache(async (userId: string) => {
        return await getMockInterviews(userId)
    })
    const { MockInterviews } = await loadMockInterviews(userId) as { MockInterviews: any }

    const items: SideBarItem[] = MockInterviews.map((mockInterview: MockInterviewClass, index: number) => ({
        id: mockInterview._id.toString(),
        href: `/mockinterviews/recordings/${mockInterview._id.toString()}`,
        title: mockInterview.name,
        editable: true,
        category: 'Mock Interview'
    }))

    const createMockInterview = async () => {
        "use server"
        redirect('/mockinterviews')
    }

    return (
        <SidebarWrapper
            userId={userId}
            sideBarTitle={'Recorded Interviews'}
            items={items}
            createNew={createMockInterview}
            newTitle={'New Mock Interview'}
            deleteItemAction={handleMockInterviewDeletion}
        >
            {children}
        </SidebarWrapper>
    )
}