import { checkSubscription } from "../../lib/hooks/check-subscription";
import { Button } from "../components/Button";
import { VideoChatComponent } from "../components/chatbot/VideoChatComponent";

export default async function ChatbotPage() {
    const { userId, userName, activeSubscription } = await checkSubscription()

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="text-center p-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Meet Your Video Career Coach, Eve
                </h1>
                <p className="text-lg text-gray-600">
                    Get personalized career advice and grow your professional skills with our AI-powered coach.
                </p>
            </div>
            <div className="w-full p-8 bg-white shadow-lg rounded-lg">
                {activeSubscription ?
                    <VideoChatComponent />
                    :
                    <Button href="/pricing">Subscribe to chat</Button>
                }
            </div>
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Start by asking any career-related question and let's explore your potential together!
                </p>
            </div>
        </div>
    );
}
