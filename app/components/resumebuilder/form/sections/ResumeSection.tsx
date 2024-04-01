import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../../../Button';
import { SectionItem } from './SectionItem';
import { ResumeSectionType, SectionItemType } from '../../../../resumebuilder/[id]/resumebuilder-helper';
import { FieldConfig } from '../../../../resumebuilder/resumetest-helper';
import { useResumeSection } from '../../../../../lib/resumebuilder/use-resume-section';
import { useFormArray } from '../../../../../lib/resumebuilder/use-form-array-remove';

interface ResumeSectionnProps {
    resumeId: string;
    items: ResumeSectionType[];
    sectionName: string;
    fieldsConfig: FieldConfig[];
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
};

type SectionItem = {
    id: string;
    [key: string]: any; // Additional fields as needed
};

const ResumeSection = ({ resumeId, items, sectionName, fieldsConfig, setSaveStatus }: ResumeSectionnProps) => {
    const { fields, methods, remove, append, visibility, toggleVisibility } = useResumeSection({ items })

    const valueToAdd = fieldsConfig.reduce<Partial<SectionItem>>((acc, field) => {
        let initialValue: any;

        switch (field.type) {
            case 'text':
            case 'textarea':
            case 'date':
                initialValue = ''; // Empty string for text, textarea, and date fields
                break;
            case 'check':
                initialValue = false; // Boolean for checkbox
                break;
            case 'gpa':
                initialValue = { score: '', scoringSystem: '4.0' }; // Assuming GPA is a string, modify as needed
                break;
            case 'bulletPoints':
                initialValue = []; // Assuming bulletPoints is an array, modify as needed
                break;
            default:
                initialValue = null; // Fallback for any unhandled field types
        }

        acc[field.name] = initialValue;
        return acc;
    }, {});
    const { addArrayItem, removeArrayItem } = useFormArray({ resumeId, setKey: sectionName, setSaveStatus, valueToAdd, append, remove })

    return (
        <FormProvider {...methods}>
            <form className="mb-6 p-4">
                <div className='flex flex-col w-full'>
                    {fields.map((field: SectionItemType, index) => {
                        const fieldId = (items as { _id?: string }[])[index]?._id
                        const itemSetKey = sectionName + '.' + index
                        const removeItem = () => removeArrayItem(index, itemSetKey, fieldId)
                        return (
                            <SectionItem
                                key={field.id}
                                index={index}
                                item={items[index]}
                                resumeId={resumeId}
                                sectionName={sectionName}
                                fieldsConfig={fieldsConfig}
                                handleRemove={removeItem}
                                isVisible={visibility[field.id]}
                                toggleVisibility={() => toggleVisibility(field.id)}
                                setSaveStatus={setSaveStatus}
                            />
                        )
                    }
                    )}
                    <Button size='md' type="button" onClick={addArrayItem} >Add {sectionName}</Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default ResumeSection;