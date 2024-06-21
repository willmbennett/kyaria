"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export const DarkModeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setTheme("system")
    }, [mounted])

    return null

    return (
        <>
            <select value={theme} onChange={e => setTheme(e.target.value)}>
                <option value="system">System</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
        </>
    )
}