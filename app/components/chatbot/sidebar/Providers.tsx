'use client'

import * as React from 'react'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '../../../../lib/chatbot/use-sidebar'
import { TooltipProvider } from '../../ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <SidebarProvider>
            <TooltipProvider>{children}</TooltipProvider>
        </SidebarProvider>
    )
}