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
import { createInitialChatAction, deleteChatAction } from './_action';
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
    const { userId, activeSubscription } = await checkSubscription()

    if (!userId) {
        return (
            <>
                {children}
            </>
        )
    }

    if (!activeSubscription) {
        redirect('/pricing')
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

    //console.log('foundChats', chats)

    const handleChatCreation = async () => {
        "use server"
        const chatId = await createInitialChatAction(userId, '/eve')
        if (chatId) {
            const url = `/eve/${chatId}`
            return { url }
        } else {
            const error = 'There was a problem creating a new chat'
            return { error }
        }
    }

    const handleChatDeletion: ActionItemType = async (chatId: string, path: string) => {
        "use server"
        const { error } = await deleteChatAction({ id: chatId, path })
        if (error) {
            return { error }
        } else {
            const url = "/eve"
            return { url }
        }
    }

    return (
        <div className="min-h-screen">
            {userId &&
                <>
                    <SidebarMobile>
                        <ItemHistory
                            sideBarTitle={'Session History'}
                            items={items}
                            createNew={handleChatCreation}
                            newTitle={'New Chat'}
                            deleteItemAction={handleChatDeletion}
                        />
                    </SidebarMobile>
                    <DesktopOpenSideBar />
                    <SidebarDesktop
                        sideBarTitle={'Session History'}
                        items={items}
                        createNew={handleChatCreation}
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
        </div>
    )
}