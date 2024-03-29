import { Dispatch, SetStateAction, useCallback } from "react";
import { saveResumeToDatabase } from "../../app/resumebuilder/[id]/resumebuilder-helper";
import { usePathname } from "next/navigation";

interface UseResumeListProps {
    resumeId: string;
    valueToAdd?: any
    setKey: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
}

export const useFormArray = ({ resumeId, setKey, valueToAdd, setSaveStatus }: UseResumeListProps) => {
    const path = usePathname()
    const removeArrayItem = useCallback(async (fieldId: string) => {
        console.log('Made it to [removeArrayItem] with setKey: ', setKey)
        await saveResumeToDatabase({
            resumeId,
            setKey,
            value: { remove: fieldId },
            path,
            setSaveStatus
        })
    }, [resumeId, setKey, path, setSaveStatus])

    const addArrayItem = useCallback(async () => {
        console.log('Made it to [addArrayItem] with setKey: ', setKey)
        if (valueToAdd) {
            await saveResumeToDatabase({
                resumeId,
                setKey,
                value: { add: valueToAdd },
                path,
                setSaveStatus
            })
        }
    }, [resumeId, setKey, valueToAdd, path, setSaveStatus])

    return { removeArrayItem, addArrayItem }
}