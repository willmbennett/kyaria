'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { SidebarItem } from './SidebarItem'
import { SideBarItem } from '../../helper'
interface SidebarItemsProps {
    items: SideBarItem[]
}

export function SidebarItems({ items }: SidebarItemsProps) {

    return (
        <AnimatePresence>
            {items.map(
                (item, index) =>
                    item && (
                        <motion.div
                            key={item.id}
                            exit={{
                                opacity: 0,
                                height: 0
                            }}
                        >
                            <SidebarItem index={index} item={item}>
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