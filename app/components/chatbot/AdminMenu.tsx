import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "../Button"

interface AdminMenuProps {
    useChatBot: boolean;
    togglechatBot: () => void;
    startChat: boolean;
    toggleStartChat: () => void;
    funMode: boolean;
    toggleFunMode: () => void;
}
export const AdminMenu = ({ useChatBot, togglechatBot, startChat, toggleStartChat, funMode, toggleFunMode }: AdminMenuProps) => {

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
            <Button
                onClick={toggleFunMode}
                size="sm"
                className={`relative inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${funMode ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
            >
                {funMode ? (
                    <>
                        <MoonIcon className="h-5 w-5 mr-2 -ml-1 text-white" aria-hidden="true" />
                        Turn off Fun Mode
                    </>
                ) : (
                    <>
                        <SunIcon className="h-5 w-5 mr-2 -ml-1 text-white" aria-hidden="true" />
                        Turn on Fun Mode
                    </>
                )}
                <span className={`absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 w-3 h-3 ${funMode ? 'bg-red-300' : 'bg-green-300'} rounded-full transition-all duration-300 ease-in-out`}></span>
            </Button>
        </div>
    )
}