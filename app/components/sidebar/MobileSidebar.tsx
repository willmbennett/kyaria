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
                <Button variant="ghost" className="mr-2 absolute right-0 top-0 p-0 md:hidden" size='icon'>
                    <IconSidebar className="w-6 h-6" />
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