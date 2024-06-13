import { Metadata } from 'next';
import { SidebarMobile } from '../components/sidebar/MobileSidebar';
import { ItemHistory } from '../components/sidebar/ItemHistory';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { SidebarDesktop } from '../components/sidebar/SidebarDesktop';
import { cache } from 'react';
import { DesktopOpenSideBar } from '../components/sidebar/DesktopOpenSideBar';
import { SideBarItem } from '../helper';
import { getMockInterviews } from '../../lib/mockinterview-db';
import { MockInterviewClass } from '../../models/MockInterview';
import { handleChatCreation } from '../eve/_action';
import { handleMockInterviewDeletion } from './[id]/_action';

const title = "Eve: Kyaria.ai's Revolutionary AI Career Coach | Affordable & 24/7 Access";
const description = "Discover Eve, the world's first virtual career coach. Get personalized, smart career advice 24/7 at just $10/month. Save on career coaching with cutting-edge AI technology. Start your journey to career success with Eve today!";

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
        href: `/mockinterviews/${mockInterview._id.toString()}`,
        title: mockInterview.name,
        editable: true,
        category: 'Mock Interview'
    }))

    const createChat = async () => {
        "use server"
        return handleChatCreation({ userId })
    }

    return (
        <>
            {userId &&
                <>
                    <SidebarMobile>
                        <ItemHistory
                            sideBarTitle={'Mock Interviews'}
                            items={items}
                            createNew={createChat}
                            newTitle={'New Chat'}
                            deleteItemAction={handleMockInterviewDeletion}
                        />
                    </SidebarMobile>
                    <DesktopOpenSideBar />
                    <SidebarDesktop
                        sideBarTitle={'Mock Interviews'}
                        items={items}
                        createNew={createChat}
                        newTitle={'New Chat'}
                        deleteItemAction={handleMockInterviewDeletion}
                    />
                </>
            }
            {children}
        </>
    )
}