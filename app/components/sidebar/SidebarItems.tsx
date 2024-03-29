'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { SidebarItem } from './SidebarItem'
import { SideBarItem } from '../../helper'
import { SidebarActions } from './sidebar-actions'
import { ActionItemType } from '../../board/job-helper'
interface SidebarItemsProps {
    items: SideBarItem[]
    deleteItemAction: ActionItemType
}

export function SidebarItems({ items, deleteItemAction }: SidebarItemsProps) {

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
                                <SidebarActions
                                    item={item}
                                    removeItem={deleteItemAction}
                                />
                            </SidebarItem>
                        </motion.div>
                    )
            )}
        </AnimatePresence>
    )
}