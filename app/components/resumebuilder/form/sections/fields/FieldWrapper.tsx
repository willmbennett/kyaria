import { Dispatch, SetStateAction } from "react";
import { useResumeField } from "../../../../../../lib/resumebuilder/use-resume-form-field";
import { FieldConfig } from "../../../../../resumebuilder/resumetest-helper";

interface FieldWrapperProps {
    resumeId: string
    fieldName: string;
    placeholder: string
    setKey: string;
    children: JSX.Element
    className?: string
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
}

const dataAssist = false

export const FieldWrapper = ({ resumeId, fieldName, setKey, placeholder, children, className, setSaveStatus }: FieldWrapperProps) => {
    const { error } = useResumeField({
        resumeId,
        fieldName,
        setKey,
        setSaveStatus
    })
    return (
        <div key={setKey} className={`mb-4 flex flex-col ${className}`}>
            {dataAssist &&
                <div className="flex flex-col">
                    <p>{fieldName}</p>
                    <p>{setKey}</p>
                </div>
            }
            <label className="text-gray-600 text-sm mb-1">{placeholder}</label>
            {children}
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
}