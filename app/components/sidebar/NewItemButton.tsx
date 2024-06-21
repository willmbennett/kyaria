'use client'

import { useRouter } from "next/navigation"
import { Button } from "../Button"
import { IconPlus } from "../ui/icons"

export const NewItemButton = ({ createNew, newTitle }: { createNew: () => Promise<any>, newTitle: string }) => {
    const router = useRouter()

    const handleNewCreation = async () => {
        const { url, error } = await createNew()
        if (url) router.push(url)
        if (error) throw new Error(error)
    }
    return (
        <Button
            onClick={handleNewCreation}
            size="md"
        >
            <IconPlus className="-translate-x-2 stroke-2" />
            {newTitle}
        </Button>
    )
}