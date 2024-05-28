import { Metadata } from 'next';
import { SidebarMobile } from '../components/sidebar/MobileSidebar';
import { ItemHistory } from '../components/sidebar/ItemHistory';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { SidebarDesktop } from '../components/sidebar/SidebarDesktop';
import { SidebarToggle } from '../components/sidebar/ToggleSidebar';
import { getResumes } from '../../lib/resume-db';
import { DropResumeBanner } from '../components/chatbot/DropResumeBanner';
import { getChats } from '../../lib/chat-db';
import { cache } from 'react';
import { createInitialChatAction, deleteChatAction, handleChatCreation, handleChatDeletion } from './_action';
import { redirect } from 'next/navigation';
import { ChatClass } from '../../models/Chat';
import { DesktopOpenSideBar } from '../components/sidebar/DesktopOpenSideBar';
import { ActionItemType } from '../board/job-helper';
import { SideBarItem } from '../helper';

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

export default async function EveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription()

    if (!userId) {
        return (
            <>
                {children}
            </>
        )
    }

    const { resumes } = await getResumes(userId)
    const loadChats = cache(async (userId: string) => {
        return await getChats(userId)
    })
    const { chats } = await loadChats(userId) as { chats: any }

    const items: SideBarItem[] = chats.map((chat: ChatClass, index: number) => ({
        id: chat._id.toString(),
        href: `/eve/${chat._id.toString()}`,
        title: chat.messages.length > 3 ? chat.messages.slice(3)[0].content.split(' ').slice(3).join(' ') : 'Session ' + index,
        editable: true,
        category: 'Chat'
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
                            sideBarTitle={'Session History'}
                            items={items}
                            createNew={createChat}
                            newTitle={'New Chat'}
                            deleteItemAction={handleChatDeletion}
                        />
                    </SidebarMobile>
                    <DesktopOpenSideBar />
                    <SidebarDesktop
                        sideBarTitle={'Session History'}
                        items={items}
                        createNew={createChat}
                        newTitle={'New Chat'}
                        deleteItemAction={handleChatDeletion}
                    />
                    {(resumes && resumes.length == 0) &&
                        <DropResumeBanner
                            userId={userId}
                        />
                    }
                </>
            }
            {children}
        </>
    )
}