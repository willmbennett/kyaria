'use client'

import { useRouter } from "next/navigation"
import { createInitialChatAction } from "../../../eve/_action"
import { cn } from "../../../../lib/utils"
import { buttonVariants } from "../../ui/button"
import { IconPlus } from "../../ui/icons"

export const NewChatButton = ({ userId }: { userId: string }) => {
    const router = useRouter()

    const handleChatCreation = async () => {
        const chatId = await createInitialChatAction(userId, '/eve')
        if (chatId) router.push(`/eve/${chatId}`)
        else throw new Error('There was a problem creating a new chat')
    }
    return (
        <button
            onClick={handleChatCreation}
            className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
            )}
        >
            <IconPlus className="-translate-x-2 stroke-2" />
            New Chat
        </button>
    )
}