'use client'

import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export const ChatBotPopup = ({ userId, userName }: { userId: string, userName: string }) => {
    const path = usePathname()
    const [show, setShow] = useState(true)
    const router = useRouter()

    if (path.startsWith('/eve')) return <></>;


    const containerVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: 'auto', opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 z-10">

            <motion.div
                className="flex flex-col gap-1 md:gap-2 items-end w-32 md:w-40 lg:w-52"
                initial="hidden"
                animate="visible"
                variants={containerVariants}>
                <button
                    onClick={() => setShow(!show)}
                    className="bg-slate-100 p-1 rounded-full text-center"
                >
                    {show ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        :
                        <span className="p-1">See Eve</span>
                    }
                </button>
                {show &&
                    <>
                        <motion.div
                            className="flex flex-col items-end"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}>
                            <div className="flex flex-col space-x-2 items-start">
                                <div className="relative flex items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </div>
                                <div className="max-w-xs md:max-w-md px-4 py-2 bg-blue-100 rounded-lg text-left text-sm md:text-base leading-tight">
                                    {`Hi${userName && ` ${userName.split(' ')[0]}`}! I'm Eve, your virtual career coach. How may I help you today?`}
                                </div>
                            </div>

                        </motion.div>
                        <div className="aspect-square w-16 md:w-24 lg:w-32 relative">
                            <video
                                src="https://ridlhxlqmhjlvpjy.public.blob.vercel-storage.com/idle-EKXH7UBRmCylHsNk0PdpKtIh8uUesV.mp4"
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                                autoPlay
                                loop
                                playsInline
                                muted // Corrected attribute placement
                            ></video>
                            <button
                                className="absolute inset-0 bg-black text-white opacity-0 hover:bg-opacity-50 hover:opacity-100 flex justify-center items-center rounded-lg transition-opacity duration-300"
                                onClick={async () => {
                                    if (!userId) {
                                        const { signIn } = (await import("next-auth/react"));
                                        const url = process.env.NODE_ENV == 'development' ? 'http://localhost:3000/eve' : 'https://www.kyaria.ai/eve'
                                        signIn('google', {
                                            callbackUrl: url
                                        })
                                    } else {
                                        router.push('/eve')
                                    }
                                }}
                            >
                                {userId ? 'Start Chatting' : 'Sign In'}
                            </button>
                        </div>
                    </>
                }
            </motion.div>
        </div>
    )
}