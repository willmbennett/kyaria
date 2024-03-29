import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { saveResumeToDatabase } from "../../app/resumebuilder/[id]/resumebuilder-helper";
import { usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { debounce } from "lodash";

interface UseResumeListProps {
    resumeId: string;
    fieldName: string;
    setKey: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
}

export const useResumeField = ({ resumeId, fieldName, setKey, setSaveStatus }: UseResumeListProps) => {
    const path = usePathname()
    const { watch, formState: { errors } } = useFormContext()
    const value = watch(fieldName)
    const [currentValue, setValue] = useState(value)
    const handleResumeItemSave = useCallback(async (input: string | boolean) => {
        console.log('Made it to [handleResumeItemSave] with input: ', input)
        await saveResumeToDatabase({
            resumeId,
            setKey,
            value: input,
            path,
            setSaveStatus
        })
        setValue(input)
    }, [resumeId, setKey, path, setSaveStatus])

    const debouncedSaveToDatabase = useCallback(debounce(handleResumeItemSave, 500), [handleResumeItemSave]);

    useEffect(() => {
        if (value != currentValue) {
            debouncedSaveToDatabase(value)
        }
    }, [value])

    const error = errors[fieldName]?.message?.toString()
    return { error }
}