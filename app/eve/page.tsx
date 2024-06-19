import { Metadata } from "next";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { NewItemButton } from "../components/sidebar/NewItemButton";
import { EVE_IDLE_VIDEO } from "./eve-helper";
import { handleChatCreation } from "./_action";
import { Container } from "../components/landingpage/Container";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../components/Button";

export default async function ChatBotHomePage() {
    const { userId } = await checkSubscription(true)

    const createChat = async () => {
        "use server"
        return handleChatCreation({ userId })
    }

    return (
        <section className="flex overflow-hidden pt-16 md:pt-20 xl:pt-32 w-full justify-center">
            <Container>
                <div className="w-full max-w-3xl text-center p-4 flex flex-col gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Meet your virtual career coach Eve!
                        </h1>
                        <p className="text-lg text-gray-600 ">
                            <span className="font-bold text-slate-800">New! </span> Don't have a job in mind? Ask Eve to do a mock interview. We've hand-picked top interview questions for common disciplines for you to practice.
                        </p>
                        <p className="text-sm text-gray-400 italic">
                            Note: Video responses will be recorded for the purpose of providing the review.
                        </p>
                        <ul className="mt-6 flex flex-col space-y-4 md:mx-auto md:mt-8 md:max-w-3xl md:flex-row md:space-x-2 md:space-y-0 lg:space-x-4 xl:mx-0 xl:flex-col xl:space-x-0 xl:space-y-4">

                            <li className="flex items-center md:items-start xl:items-center">
                                <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
                                <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                                    <span className="font-bold text-slate-800">Disciplines: </span>Software Engineering, Cybersecurity, and Data Science.
                                </p>
                            </li>
                            <li className="flex items-center md:items-start xl:items-center">
                                <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
                                <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                                    <span className="font-bold text-slate-800">Interview Types: </span>Phone Screens, Behavioral, Case, and Technical.
                                </p>
                            </li>
                            <li className="flex items-center md:items-start xl:items-center">
                                <CheckCircleIcon className="h-5 w-5 shrink-0 text-slate-800 md:h-6 md:w-6 xl:h-5 xl:w-5" />
                                <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                                    We'll provide instant feedback upon completion based on a robust rubric.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">Just feel like chatting...</p>
                        <div>
                            <Button href="/mockinterviews" size="md" onClick={createChat} >New Chat</Button>
                        </div>
                        <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">...or want to do a mock interview for one of your job applications?</p>
                        <div>
                            <Button href="/mockinterviews" size="md" variant="secondary" >Do a mock interview</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
