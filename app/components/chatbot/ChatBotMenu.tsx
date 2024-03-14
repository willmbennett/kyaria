'use client'
import { useRouter } from "next/navigation"
import { createInitialChatAction } from "../../eve/_action"
import { Button } from "../Button"

export const ChatBotMenu = ({ userId }: { userId: string }) => {
    const router = useRouter()

    const handleChatCreation = async () => {
        const chatId = await createInitialChatAction(userId, '/eve')
        if (chatId) router.push(`/eve/${chatId}`)
        else throw new Error('There was a problem creating a new chat')
    }
    return (
        <div>
            <Button onClick={handleChatCreation}>Create New Chat</Button>
        </div>
    )
}