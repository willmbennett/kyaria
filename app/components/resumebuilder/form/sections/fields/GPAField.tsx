import React, { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldConfig } from '../../../../../resumebuilder/resumetest-helper';
import { FieldWrapper } from './FieldWrapper';

type Props = {
    fieldName: string;
    resumeId: string;
    fieldConfig: FieldConfig;
    setKey: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
};

const GPAField = ({ fieldName, resumeId, fieldConfig, setKey, setSaveStatus }: Props) => {
    const { register } = useFormContext();


    const renderGPAFields = (field: string) => {
        const GPASetKey = setKey + '.' + field
        const GPAfieldName = fieldName + '.' + field
        return (
            <FieldWrapper
                className="w-full"
                resumeId={resumeId}
                fieldName={GPAfieldName}
                setKey={GPASetKey}
                setSaveStatus={setSaveStatus}
                placeholder={field == 'score' ? "GPA" : "SCORING SYSTEM"}
            >
                <input type="text"  {...register(GPAfieldName)} />
            </FieldWrapper >
        )
    }

    return (
        <div className='flex flex-row space-x-2 w-full'>
            {renderGPAFields('score')}
            {renderGPAFields('scoringSystem')}
        </div>
    );
};

export default GPAField;
