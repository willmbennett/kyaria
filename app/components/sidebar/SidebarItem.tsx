'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'
import { buttonVariants } from '../ui/button'
import { useState } from 'react'
import { SideBarItem } from '../../helper'
import { useSidebar } from '../../../lib/chatbot/use-sidebar'

interface SidebarItemProps {
    index: number
    item: SideBarItem
    children: React.ReactNode
}

export function SidebarItem({ index, item, children }: SidebarItemProps) {
    const { toggleSidebar } = useSidebar()
    const pathname = usePathname()
    const [animated, setAnimated] = useState(false)

    const { id, href, title } = item

    const isActive = pathname === href
    const shouldAnimate = index === 0 && isActive && !animated

    return (
        <motion.div
            className="relative h-8"
            variants={{
                initial: {
                    height: 0,
                    opacity: 0
                },
                animate: {
                    height: 'auto',
                    opacity: 1
                }
            }}
            initial={shouldAnimate ? 'initial' : undefined}
            animate={shouldAnimate ? 'animate' : undefined}
            transition={{
                duration: 0.25,
                ease: 'easeIn'
            }}
        >
            <Link
                href={href}
                onClick={toggleSidebar}
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10',
                    isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
                )}
            >
                <div
                    className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
                    title={title}
                >
                    <span className="whitespace-nowrap">
                        {shouldAnimate ? (
                            title.split('').map((character, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        initial: {
                                            opacity: 0,
                                            x: -100
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        }
                                    }}
                                    initial={shouldAnimate ? 'initial' : undefined}
                                    animate={shouldAnimate ? 'animate' : undefined}
                                    transition={{
                                        duration: 0.25,
                                        ease: 'easeIn',
                                        delay: index * 0.05,
                                        staggerChildren: 0.05
                                    }}
                                    onAnimationComplete={() => {
                                        if (index === title.length - 1) {
                                            setAnimated(true)
                                        }
                                    }}
                                >
                                    {character}
                                </motion.span>
                            ))
                        ) : (
                            <span>{title}</span>
                        )}
                    </span>
                </div>
            </Link>
            {(isActive && item.editable) && <div className="absolute right-2 top-0">{children}</div>}
        </motion.div>
    )
}