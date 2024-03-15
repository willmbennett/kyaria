import * as React from 'react'
import { SidebarList } from './SidebarList'
import { NewChatButton } from './NewChatButton'
import { SidebarToggle } from './ToggleSidebar'

interface ChatHistoryProps {
    userId: string
}

export async function ChatHistory({ userId }: ChatHistoryProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
                <h4 className="text-sm font-medium">Session History</h4>
                <SidebarToggle />
            </div>
            <div className="mb-2 px-2">
                <NewChatButton userId={userId} />
            </div>
            <React.Suspense
                fallback={
                    <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
                            />
                        ))}
                    </div>
                }
            >
                <SidebarList userId={userId} />
            </React.Suspense>
        </div>
    )
}