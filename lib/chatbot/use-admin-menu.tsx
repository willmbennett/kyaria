import { useState } from "react"

export const useAdminMenu = () => {
    const [useChatBot, setUseChatBot] = useState(process.env.NODE_ENV != 'development')
    const [startChat, setStartChat] = useState(false)
    const [funMode, setFunMode] = useState(false)


    const togglechatBot = () => {
        setUseChatBot(!useChatBot)
    }

    const toggleStartChat = () => {
        setStartChat(!startChat)
    }

    const toggleFunMode = () => {
        setFunMode(!funMode)
    }

    return { useChatBot, togglechatBot, startChat, toggleStartChat, funMode, toggleFunMode }

}