
import { cache } from 'react'
import { getChats } from '../../../../lib/chat-db'
import { SidebarItems } from './SidebarItems'
import { ChatClass } from '../../../../models/Chat'

interface SidebarListProps {
    userId: string
    children?: React.ReactNode
}

const loadChats = cache(async (userId: string) => {
    return await getChats(userId)
})

export async function SidebarList({ userId }: SidebarListProps) {
    const { chats } = await loadChats(userId) as { chats: any }

    if (!chats) {
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto overscroll-none">
                <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">No chat history</p>
                </div>
            </div>
            <div className="flex items-center justify-between p-4">
                {/*<ClearHistory clearChats={clearChats} isEnabled={chats} />*/}
            </div>
        </div>
    }


    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto overscroll-none">
                <div className="space-y-2 px-2">
                    <SidebarItems chats={chats as ChatClass[]} />
                </div>
            </div>
            <div className="flex items-center justify-between p-4">
                {/*<ClearHistory clearChats={clearChats} isEnabled={chats} />*/}
            </div>
        </div>
    )
}