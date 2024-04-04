import dynamic from "next/dynamic";
import { Metadata } from "next";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { ChatBotHero } from "../components/chatbot/landingpage/ChatBotHero";
import { NewItemButton } from "../components/sidebar/NewItemButton";
import { Suspense } from "react";
import { EVE_IDLE_VIDEO } from "./eve-helper";
import { createInitialChatAction } from "./_action";
import { redirect } from "next/navigation";
import { getChatCounts } from "../../lib/chat-db";
const Process = dynamic(() => import('../components/chatbot/landingpage/Process'));

const EveDemo = dynamic(() => import('../components/chatbot/landingpage/ProductDemo'))

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

export default async function ChatBotHomePage() {
    const { userId } = await checkSubscription()


    const handleChatCreation = async () => {
        "use server"
        const user = userId ? userId : 'n/a'
        const chatId = await createInitialChatAction(user, '/eve')
        const url = `/eve/${chatId}`
        if (chatId) return { url }
        const error = 'There was a problem creating a new chat'
        return { error }
    }


    if (!userId) {
        const {
            numChats,
            numChatUsers
        } = await getChatCounts()
        return (
            <>
                <ChatBotHero numChats={numChats} numChatUsers={numChatUsers} />
                <Suspense fallback={<p>Loading demo...</p>}>
                    <EveDemo createNew={handleChatCreation} />
                </Suspense>
                <Process />
            </>
        );
    }

    return (
        <div className="w-full text-center p-4 flex flex-col gap-4">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Meet Your Virtual Career Coach, Eve
                </h1>
                <p className="text-lg text-gray-600">
                    Get personalized career advice and grow your professional skills with our AI-powered coach.
                </p>
            </div>
            <div className="w-full flex justify-center items-center">
                <div>
                    <NewItemButton createNew={handleChatCreation} newTitle="New Chat" />
                </div>
            </div>
            <div className="flex justify-center items-center w-full max-w-6xl mx-auto">
                <div className="aspect-square w-full md:w-1/2 flex justify-center items-center relative rounded-lg shadow-lg">
                    <video src={EVE_IDLE_VIDEO} className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" autoPlay loop playsInline></video>
                </div>
            </div>
        </div>
    );
}
