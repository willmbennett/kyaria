import { Button } from "../Button"

interface AdminMenuProps {
    useChatBot: boolean;
    setUseChatBot: (useChatBot: boolean) => void
    startChat: boolean;
    setStartChat: (startChat: boolean) => void
}
export const AdminMenu = ({ useChatBot, setUseChatBot, startChat, setStartChat }: AdminMenuProps) => {

    const togglechatBot = () => {
        setUseChatBot(!useChatBot)
    }

    const toggleStartChat = () => {
        setStartChat(!startChat)
    }

    return (
        <div className='flex gap-2 items-center'>
            <Button
                onClick={togglechatBot}
                size='sm'
            >
                {useChatBot ? 'Turn off ChatBot' : 'Turn on ChatBot'}
            </Button>
            <Button
                onClick={toggleStartChat}
                size='sm'
            >
                {startChat ? 'Stop chatting' : 'Start Chatting'}
            </Button>
        </div>
    )
}