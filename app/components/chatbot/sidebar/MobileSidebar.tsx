'use client'

import { Button } from "../../ui/button"
import { IconSidebar } from "../../ui/icons"
import { Sheet, SheetContent, SheetTrigger } from "./Sheet"
import { Sidebar } from "./Sidebar"

interface SidebarMobileProps {
    children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="-ml-2 flex size-9 p-0 lg:hidden">
                    <IconSidebar className="size-6" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
            >
                <Sidebar className="flex">{children}</Sidebar>
            </SheetContent>
        </Sheet>
    )
}