import React, { useState } from 'react';
import { UseFormRegister, Control, useFieldArray, UseFormWatch } from 'react-hook-form';
import BulletPointsField from '../resumebuilder/ui/BulletPointsField';
import GPAField from '../resumebuilder/ui/GPAField';
import InputField from './InputField';
import TextareaAutosize from 'react-textarea-autosize';
import { ResumeBuilderFormData } from '../../resumebuilder/resumetest-helper';
import { Button } from '../Button';

type SectionItem = {
    id: string;
    [key: string]: any; // Additional fields as needed
};

type FieldConfig = {
    name: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'date' | 'gpa' | 'bulletPoints' | 'check';
    group?: string; // Optional grouping key
};

interface FieldGroups {
    [key: string]: FieldConfig[];
}

type SectionProps = {
    title: string;
    register: UseFormRegister<any>;
    control: Control<any>;
    sectionName: string;
    fieldsConfig: FieldConfig[]; // New prop for field configuration
    watch: UseFormWatch<ResumeBuilderFormData>
};

const ResumeSection: React.FC<SectionProps> = ({ title, register, control, sectionName, fieldsConfig, watch }) => {
    const { fields, append, remove } = useFieldArray({ control, name: sectionName });

    const renderField = (fieldConfig: FieldConfig, item: SectionItem, index: number) => {
        const fieldName = `${sectionName}[${index}].${fieldConfig.name}`;
        const isCurrent = watch(`${sectionName}[${index}].current` as keyof ResumeBuilderFormData);
        const usePresent = fieldConfig.name == 'end_date' && isCurrent

        switch (fieldConfig.type) {
            case 'text':
                return (
                    <div key={fieldConfig.name} className="mb-4 flex flex-col w-full">
                        <label className="text-gray-600 text-sm mb-1">{fieldConfig.placeholder.toUpperCase()}</label>
                        <InputField name={fieldName} register={register} placeholder={fieldConfig.placeholder} />
                    </div>
                );
            case 'textarea':
                return (
                    <div key={fieldConfig.name} className="mb-4 w-full flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">{fieldConfig.placeholder.toUpperCase()}</label>
                        <TextareaAutosize {...register(fieldName)} placeholder={fieldConfig.placeholder} className="border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                );
            case 'date':
                return (
                    <div key={fieldConfig.name} className="mb-4 flex flex-col">
                        <label className={`${(usePresent) ? 'invisible' : ''} text-gray-600 text-sm mb-1`}>{fieldConfig.placeholder.toUpperCase()}</label>
                        <input type="date" {...register(fieldName)} className={`${(usePresent) ? 'invisible' : ''} border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} />
                    </div>
                );
            case 'check':
                return (
                    <div key={fieldConfig.name} className="mb-4 flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">{fieldConfig.placeholder.toUpperCase()}</label>
                        <input type="checkbox" {...register(fieldName)} />
                    </div>
                );
            case 'gpa':
                return <GPAField key={fieldConfig.name} name={fieldName} control={control} />;
            case 'bulletPoints':
                return <BulletPointsField key={fieldConfig.name} name={fieldName} control={control} />;
            default:
                return null;
        }
    };

    const renderFields = (item: SectionItem, index: number) => {
        const [showComponent, setShowComponent] = useState(false);
        const groupedFields = fieldsConfig.reduce<FieldGroups>((acc, fieldConfig) => {
            const group = fieldConfig.group || fieldConfig.name; // Fallback to name if no group specified
            acc[group] = acc[group] ? [...acc[group], fieldConfig] : [fieldConfig];
            return acc;
        }, {});
        const previewItems = fieldsConfig.slice(0, 2); // Adjust the number as needed


        return (
            <div key={item.id} className="mb-6 py-4">
                <div className='w-full flex flex-col lg:flex-row items-center justify-between'>
                    <div className='flex flex-row space-x-2'>
                        {previewItems.map(fieldConfig =>
                            <h3 className='flex flex-row space-x-2 text-lg font-semibold'>
                                {renderFieldPreview(fieldConfig, item, index)}
                            </h3>
                        )}
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            onClick={() => setShowComponent(!showComponent)}
                        >
                            {showComponent ? 'Hide' : 'Edit'}
                        </Button>
                        <Button type="button" onClick={() => remove(index)} size='md' variant='secondary'>Remove</Button>
                    </div>
                </div>
                {showComponent && Object.entries(groupedFields).map(([group, groupFields]) => (
                    <div key={group} className="flex flex-col lg:flex-row lg:space-x-4 py-2">
                        {groupFields.map(fieldConfig => renderField(fieldConfig, item, index))}
                    </div>
                ))}
            </div>
        );
    };

    const addBlankSection = () => {
        const blankSection = fieldsConfig.reduce<Partial<SectionItem>>((acc, field) => {
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

        append(blankSection);
    };

    const renderFieldPreview = (fieldConfig: FieldConfig, item: SectionItem, index: number) => {
        const fieldName = `${sectionName}[${index}].${fieldConfig.name}`;
        const value = watch(fieldName as keyof ResumeBuilderFormData)
        return <span>{value as string}</span>
    };


    return (
        <div className='flex flex-col w-full'>
            {fields.map(renderFields)}
            <Button size='md' type="button" onClick={addBlankSection} >Add {title}</Button>
        </div>
    );
};

export default ResumeSection;