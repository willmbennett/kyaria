import { checkSubscription } from "../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";

export default async function ChatBotHomePage() {
    const { userId } = await checkSubscription()


    if (!userId) {
        redirect('/')
    }

    return (
        <div className="w-full text-center p-4 flex flex-col gap-4">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Let's Ace the Behavioral Interview
                </h1>
                <p className="text-lg text-gray-600">
                    Get started by selecting which questions you want to work on
                </p>
            </div>
        </div>
    );
}
