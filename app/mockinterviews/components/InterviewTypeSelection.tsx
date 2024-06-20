"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DropdownMenu } from "../../components/ui/DropdownMenu"
import { useState } from "react"
import { interviewTypeOptions } from "../helper"

export const InterviewTypeSelection = ({ createNewChat }: { createNewChat?: () => Promise<any> }) => {
    const path = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultType = searchParams.get('type')
    const [interviewType, setInterviewType] = useState(interviewTypeOptions.find(t => t.id == defaultType))


    const handleSelectInterviewType = async (id: string) => {
        const newInterviewType = interviewTypeOptions.find(j => j.id == id)
        if (newInterviewType) {
            setInterviewType(newInterviewType)
            router.push(path + `?type=${newInterviewType.id.toLowerCase()}`)
            if (createNewChat) await createNewChat()
        }
    }

    return (
        <DropdownMenu
            selectedItem={interviewType}
            items={interviewTypeOptions}
            onclickAction={handleSelectInterviewType}
            altTitle={"Interview Type"}
        />
    )
}