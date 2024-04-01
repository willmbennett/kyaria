import { Dispatch, SetStateAction, useCallback } from "react";
import { saveResumeToDatabase } from "../../app/resumebuilder/[id]/resumebuilder-helper";
import { usePathname } from "next/navigation";
import { FieldArrayMethodProps } from "react-hook-form";

interface UseResumeListProps {
    resumeId: string;
    valueToAdd?: any
    setKey: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
    append: (value: any, options?: FieldArrayMethodProps) => void
    remove: (index?: number | number[]) => void
}

const logging = false

export const useFormArray = (
    {
        resumeId,
        setKey,
        valueToAdd,
        setSaveStatus,
        append,
        remove
    }: UseResumeListProps) => {
    const path = usePathname()
    const removeArrayItem = useCallback(async (index: number, itemSetKey: string, fieldId?: string,) => {
        remove(index)
        if (logging) console.log('Made it to [removeArrayItem] with itemSetKey: ', itemSetKey)
        let dataUpdate = {}
        if (fieldId) {
            dataUpdate = { remove: fieldId }
        } else {
            dataUpdate = { remove: 'n/a', itemSetKey }
        }
        if (logging) console.log('dataUpdate: ', dataUpdate)
        await saveResumeToDatabase({
            resumeId,
            setKey,
            value: dataUpdate,
            path,
            setSaveStatus
        })
    }, [resumeId, setKey, path, setSaveStatus])

    const addArrayItem = useCallback(async () => {
        append(valueToAdd)
        if (logging) console.log('Made it to [addArrayItem] with setKey: ', setKey)
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