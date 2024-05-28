'use client'

import { useSidebar } from "../../../lib/chatbot/use-sidebar"
import { ChevronRightIcon } from "@radix-ui/react-icons"

export function DesktopOpenSideBar() {
    const { toggleSidebar, isSidebarOpen, isLoading } = useSidebar()

    if (isSidebarOpen || isLoading) {
        return <></>
    }

    return (
        <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="bg-white hidden md:flex items-center justify-center transform -translate-x-full lg:translate-x-0 h-full w-10 border-r border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-300 ease-in-out focus:outline-none active:outline-none"
        >
            <ChevronRightIcon
                className="h-8 w-8 text-slate-600 dark:text-slate-300 duration-300 transform group-hover:scale-125"
                aria-hidden="true"
            />
        </button>

    )
}