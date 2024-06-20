"use client"
import { useEffect, useState } from "react"
import { SideBarItem } from "../../helper";
import { DropdownMenu } from "../ui/DropdownMenu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DropdownItemType } from "../../types";

export const DesktopTopMenuSelection = ({ items, sideBarTitle }: { items: SideBarItem[], sideBarTitle: string }) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const DropDownOptions = items.map(i => ({ id: i.id, label: i.title }))
    const [selectedOption, setSelectedOption] = useState<DropdownItemType | undefined>()

    useEffect(() => {
        const activeItem = items.find(i => pathname.includes(i.href.split("?")[0]))

        if (activeItem) {
            const newSelectedOption = { id: activeItem.id, label: activeItem.title }
            setSelectedOption(newSelectedOption)
        }
    }, [pathname, items])

    const handleSelectApp = async (id: string) => {
        const newSelectedApp = DropDownOptions.find(j => j.id == id)
        const newSelectedItem = items.find(j => j.id == id)

        if (newSelectedApp && newSelectedItem) {
            setSelectedOption(newSelectedApp)

            // Get current search params as a string
            const currentSearchParams = searchParams.toString()

            // Construct the new URL with the search params
            const newUrl = currentSearchParams
                ? `${newSelectedItem.href}&${currentSearchParams}`
                : newSelectedItem.href

            router.push(newUrl)
        }
    }

    return (
        <DropdownMenu
            selectedItem={selectedOption}
            items={DropDownOptions}
            onclickAction={handleSelectApp}
            altTitle={sideBarTitle}
        />
    )
}
