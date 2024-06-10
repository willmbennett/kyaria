'use client'
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 bg-gray-200 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";

interface AppMenuItemProps {
    section: string;
    label: string
    activeProgressSection: string;
    appId: string
}

export const AppMenuItem = ({
    section,
    label,
    activeProgressSection,
    appId
}: AppMenuItemProps) => {
    const [hasPrefetched, setHasPrefetched] = useState(false);
    const router = useRouter()
    const path = usePathname()
    const active = path.includes(section)
    const handleClick = () => {
        router.push(`${baseRoute}/${section}${activeProgressSection ? `?progress=${activeProgressSection}` : ''}`, { scroll: false })
    };

    const baseRoute = `/apps/${appId}`


    const handleMouseOver = () => {
        if (!hasPrefetched) {
            router.prefetch(`/apps/${appId}/${section}`);
            setHasPrefetched(true);
        }
    };

    return (
        <div onMouseOver={handleMouseOver}>
            <div className={active ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                <button
                    onClick={handleClick}
                    className="inline"
                >
                    {label}
                </button>
            </div>
        </div>
    )
}