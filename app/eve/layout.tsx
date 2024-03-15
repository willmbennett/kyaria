import { Metadata } from 'next';
import { SidebarMobile } from '../components/chatbot/sidebar/MobileSidebar';
import { ChatHistory } from '../components/chatbot/sidebar/ChatHistory';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { SidebarDesktop } from '../components/chatbot/sidebar/SidebarDesktop';
import { SidebarToggle } from '../components/chatbot/sidebar/ToggleSidebar';

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

    return (
        <div className='md:h-screen my-10'>
            <SidebarMobile>
                {/* @ts-ignore */}
                <ChatHistory userId={userId} />
            </SidebarMobile>
            <SidebarToggle />
            <SidebarDesktop userId={userId} />
            {children}
        </div>
    )
}