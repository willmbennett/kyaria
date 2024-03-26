'use client'

import { useRouter } from "next/navigation"
import { cn } from "../../../lib/utils"
import { buttonVariants } from "../ui/button"
import { IconPlus } from "../ui/icons"

export const NewItemButton = ({ createNew, newTitle }: { createNew: () => Promise<any>, newTitle: string }) => {
    const router = useRouter()

    const handleNewCreation = async () => {
        const { url, error } = await createNew()
        if (url) router.push(url)
        if (error) throw new Error(error)
    }
    return (
        <button
            onClick={handleNewCreation}
            className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
            )}
        >
            <IconPlus className="-translate-x-2 stroke-2" />
            {newTitle}
        </button>
    )
}