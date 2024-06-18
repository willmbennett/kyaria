"use client"
import { useRouter } from "next/navigation"
import { Button } from "../../components/Button"

interface RestartButtonProps {
    createNewChat: () => Promise<any>
}
export const RestartButton = ({ createNewChat }: RestartButtonProps) => {
    const router = useRouter()
    const handleRestart = async () => {
        await createNewChat();
        router.refresh()
    }

    return (
        <Button size="sm" variant="secondary" onClick={handleRestart}>Restart</Button>
    )
}