'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { SidebarItem } from './SidebarItem'
import { ChatClass } from '../../../../models/Chat'
interface SidebarItemsProps {
    chats: ChatClass[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {

    return (
        <AnimatePresence>
            {chats.map(
                (chat, index) =>
                    chat && (
                        <motion.div
                            key={chat._id.toString()}
                            exit={{
                                opacity: 0,
                                height: 0
                            }}
                        >
                            <SidebarItem index={index} chat={chat}>
                                {/*
                                <SidebarActions
                                    chat={chat}
                                    removeChat={removeChat}
                                    shareChat={shareChat}
                                />
                        */}
                                <p></p>
                            </SidebarItem>
                        </motion.div>
                    )
            )}
        </AnimatePresence>
    )
}