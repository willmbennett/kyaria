import dynamic from "next/dynamic";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { ChatBotHero } from "../components/chatbot/landingpage/ChatBotHero";
import { Metadata } from "next";
import TimedAccessComponent from "../components/chatbot/VideoSubscriptionWrapper";
import { getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import VideoChatComponent from "../components/chatbot/VideoChatComponent";
import { createSession } from "./d-id-helper";

const ProductDemo = dynamic(() => import('../components/chatbot/landingpage/ProductDemo'));
const Process = dynamic(() => import('../components/chatbot/landingpage/Process'));

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

type getResumesType = {
    resumes: ResumeClass[]
}

//import { list } from '@vercel/blob'

export default async function ChatbotPage() {
    const { userId, activeSubscription } = await checkSubscription()


    if (!userId) {
        return (
            <>
                <ChatBotHero />
                <ProductDemo />
                <Process />
            </>
        );
    }
    return (
        <div className="min-h-screen flex flex-col w-full py-10">
            <div className="w-full text-center p-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Meet Your Virtual Career Coach, Eve
                </h1>
                <p className="text-lg text-gray-600">
                    Get personalized career advice and grow your professional skills with our AI-powered coach.
                </p>
            </div>
            <div className="w-full">
                {activeSubscription ? (
                    <VideoChatComponent userId={userId} />
                ) : (
                    <TimedAccessComponent activeSubscription={activeSubscription} userId={userId} />
                )}
            </div>
        </div>
    );
}
