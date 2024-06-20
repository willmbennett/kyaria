import { Metadata } from 'next';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { getChats } from '../../lib/chat-db';
import { cache } from 'react';
import { handleChatCreation, handleChatDeletion } from './_action';
import { ChatClass } from '../../models/Chat';
import { SideBarItem } from '../helper';
import { SidebarWrapper } from '../components/sidebar/SidebarWrapper';

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
        <SidebarWrapper
            userId={userId}
            sideBarTitle={'Session History'}
            items={items}
            createNew={createChat}
            newTitle={'New Chat'}
            deleteItemAction={handleChatDeletion}
        >
            {children}
        </SidebarWrapper>
    )
}