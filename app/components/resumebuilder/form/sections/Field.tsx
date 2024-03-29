import { FieldConfig } from "../../../../resumebuilder/resumetest-helper";
import TextareaAutosize from 'react-textarea-autosize';
import GPAField from "./fields/GPAField";
import BulletPointsField from "./fields/BulletPointsField";
import { Dispatch, SetStateAction } from "react";
import { FieldWrapper } from "./fields/FieldWrapper";
import { useFormContext } from "react-hook-form";
import { ResumeSectionType } from "../../../../resumebuilder/[id]/resumebuilder-helper";

interface FieldProps {
    resumeId: string;
    fieldData?: Partial<ResumeSectionType>
    fieldConfig: FieldConfig;
    isCurrent: boolean;
    setKey: string;
    index: number;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
}


export const Field = ({ resumeId, fieldData, fieldConfig, isCurrent, setKey, index, setSaveStatus }: FieldProps) => {
    const fieldName = `section.${index}.${fieldConfig.name}`;
    const usePresent = fieldConfig.name === 'end_date' && isCurrent;
    const fieldSetKey = setKey + '.' + fieldConfig.name
    const { register, control } = useFormContext();

    let fieldElement: React.ReactNode;

    switch (fieldConfig.type) {
        case 'text':
            fieldElement = (
                <input {...register(fieldName)} placeholder={fieldConfig.placeholder} />
            );
            break;
        case 'textarea':
            fieldElement = (
                <TextareaAutosize {...register(fieldName)} placeholder={fieldConfig.placeholder} className="border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            );
            break;
        case 'date':
            fieldElement = (
                <input type="date" {...register(fieldName)} className={`${usePresent ? 'invisible' : ''} border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} />
            );
            break;
        case 'check':
            fieldElement = (
                <input type="checkbox" {...register(fieldName)} />
            );
            break;
        case 'gpa':
            return <GPAField
                fieldName={fieldName}
                resumeId={resumeId}
                fieldConfig={fieldConfig}
                setKey={fieldSetKey}
                setSaveStatus={setSaveStatus}
            />;
        case 'bulletPoints':
            return <BulletPointsField
                key={fieldConfig.name}
                fieldData={fieldData}
                name={fieldName}
                resumeId={resumeId}
                setKey={fieldSetKey}
                setSaveStatus={setSaveStatus}
            />;
        default:
            return null;
    }

    return ['gpa', 'bulletPoints'].includes(fieldConfig.type) ? (
        fieldElement
    ) : (
        <FieldWrapper
            className="w-full"
            resumeId={resumeId}
            placeholder={fieldConfig.placeholder.toUpperCase()}
            fieldName={fieldName}
            setKey={fieldSetKey}
            setSaveStatus={setSaveStatus}
        >
            {fieldElement}
        </FieldWrapper>
    );
};