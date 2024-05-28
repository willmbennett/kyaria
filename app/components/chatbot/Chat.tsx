'use client'

import { Message } from "ai"
import { ChatList } from "../chat/ChatList"
import { useScrollAnchor } from "../../../lib/hooks/use-scroll-anchor"
import { AnimatePresence, motion } from 'framer-motion';
import { ButtonScrollToBottom } from "./ui/ButtonScrollToBottom"

export interface ChatProps extends React.ComponentProps<'div'> {
    messages: Message[]
    showTranscript: boolean
}

export function Chat({ messages, showTranscript }: ChatProps) {

    const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
        useScrollAnchor()

    return (
        <AnimatePresence>
            {showTranscript && (
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
                        <div className="w-full p-1 md:p2 lg:p-3">
                            {messages.length ? (
                                <ChatList messages={messages} />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="w-full h-px" ref={visibilityRef} />
                        <div className="sticky bottom-0 w-full h-10">
                            <ButtonScrollToBottom
                                isAtBottom={isAtBottom}
                                scrollToBottom={scrollToBottom}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}