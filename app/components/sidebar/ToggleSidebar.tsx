'use client'

import { useSidebar } from "../../../lib/chatbot/use-sidebar"
import { Button } from "../ui/button"
import { IconSidebar } from "../ui/icons"
import { Cross2Icon } from "@radix-ui/react-icons"

export function SidebarToggle() {
    const { toggleSidebar, isSidebarOpen } = useSidebar()

    return (
        <Button
            variant="ghost"
            className="-ml-2 hidden size-9 p-0 lg:flex"
            onClick={() => {
                toggleSidebar()
            }}
        >
            {isSidebarOpen ?
                <IconSidebar className="size-6" />
                :
                <Cross2Icon className="size-4" />
            }

            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}