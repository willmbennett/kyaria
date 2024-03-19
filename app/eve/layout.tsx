import { Metadata } from 'next';
import { SidebarMobile } from '../components/chatbot/sidebar/MobileSidebar';
import { ChatHistory } from '../components/chatbot/sidebar/ChatHistory';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { SidebarDesktop } from '../components/chatbot/sidebar/SidebarDesktop';
import { SidebarToggle } from '../components/chatbot/sidebar/ToggleSidebar';
import { getResumes } from '../../lib/resume-db';
import { DropResumeBanner } from '../components/chatbot/DropResumeBanner';

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
    const { resumes } = await getResumes(userId)

    //console.log('userId, ', userId)
    //console.log('resumes, ', resumes)

    return (
        <div className="my-10 min-h-screen">
            {userId &&
                <>
                    <SidebarMobile>
                        {/* @ts-ignore */}
                        <ChatHistory userId={userId} />
                    </SidebarMobile>
                    <SidebarToggle />
                    <SidebarDesktop userId={userId} />
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