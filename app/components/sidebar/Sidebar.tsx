'use client'

import { cn } from '../../../lib/utils'
import { useSidebar } from '../../../lib/chatbot/use-sidebar'

export interface SidebarProps extends React.ComponentProps<'div'> { }

export function Sidebar({ className, children }: SidebarProps) {
    const { isSidebarOpen, isLoading } = useSidebar()


    return (
        <div
            data-state={(!isSidebarOpen || isLoading) ? 'closed' : 'open'}
            className={cn(className, 'h-full flex-col bg-white dark:bg-zinc-950 dark:text-white')}
        >
            {children}
        </div>
    )
}