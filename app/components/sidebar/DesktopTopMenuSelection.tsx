"use client"
import { useEffect, useState } from "react"
import { SideBarItem } from "../../helper";
import { DropdownMenu } from "../ui/DropdownMenu";
import { usePathname, useRouter } from "next/navigation";
import { DropdownItemType } from "../../types";

export const DesktopTopMenuSelection = ({ items, sideBarTitle }: { items: SideBarItem[], sideBarTitle: string }) => {
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
    }, [pathname])

    const handleSelectApp = async (id: string) => {
        const newSelectedApp = DropDownOptions.find(j => j.id == id)
        const newSelecteditem = items.find(j => j.id == id)
        if (newSelectedApp && newSelecteditem) {
            setSelectedOption(newSelectedApp)
            router.push(newSelecteditem.href)
        }
    }

    return (
        <div>
            <DropdownMenu
                selectedItem={selectedOption}
                items={DropDownOptions}
                onclickAction={handleSelectApp}
                altTitle={sideBarTitle}
            />
        </div>
    )
}