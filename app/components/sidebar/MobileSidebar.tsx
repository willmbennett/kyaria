'use client'

import { Button } from "../ui/button"
import { IconSidebar } from "../ui/icons"
import { Sheet, SheetContent, SheetTrigger } from "./Sheet"
import { Sidebar } from "./Sidebar"

interface SidebarMobileProps {
    children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="mr-2 absolute right-2 top-2 p-0 md:hidden z-50" size='icon'>
                    <IconSidebar className="w-12 h-12" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
            >
                <Sidebar className="flex">{children}</Sidebar>
            </SheetContent>
        </Sheet>
    )
}