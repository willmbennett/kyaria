'use client'

import { Message } from "ai"
import { ChatList } from "../chat/ChatList"
import { useScrollAnchor } from "../../../lib/hooks/use-scroll-anchor"
import { AnimatePresence, motion } from 'framer-motion';
import { ButtonScrollToBottom } from "./ui/ButtonScrollToBottom"
import { useEffect } from "react";
import { IconSpinner } from "../ui/icons";

export interface ChatProps extends React.ComponentProps<'div'> {
    messages: Message[];
    messageId?: string;
    handleMessageClick?: (m: Message) => void;
    loading?: boolean
}

export function Chat({ messages, messageId, handleMessageClick, loading = false }: ChatProps) {

    const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom, scrollToMessage } =
        useScrollAnchor()

    useEffect(() => {
        if (messageId) scrollToMessage(messageId);
    }, [messageId])

    const FillerCard = (message: string, loading: boolean) => (
        <div className="rounded-xl flex w-full justify-center px-2">
            <div className="flex gap-2 bg-slate-100 py-3 px-2 rounded-xl">
                {loading &&
                    <div className="pt-1">
                        <IconSpinner />
                    </div>
                }
                <p>{message}</p>
            </div>
        </div>
    )

    return (
        <AnimatePresence>
            <motion.div
                className="group h-full w-96"
                ref={scrollRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                    opacity: 0
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
            >
                <motion.div
                    className='h-full relative overflow-auto overscroll-none border rounded-xl'
                    ref={messagesRef}
                >
                    <div className="w-full p-1 md:p-2 lg:p-3">
                        {messages.length ? (
                            <ChatList messages={messages} handleMessageClick={handleMessageClick} />
                        ) :
                            FillerCard("Eve is waking up, this may take a moment, especially if you're doing a mock interview.", true)
                        }
                    </div>
                    {loading && FillerCard("Creating interview questions", true)
                    }
                    <div className="w-full h-px" ref={visibilityRef} />
                    <div className="sticky bottom-0 w-full h-10">
                        <ButtonScrollToBottom
                            isAtBottom={isAtBottom}
                            scrollToBottom={scrollToBottom}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}