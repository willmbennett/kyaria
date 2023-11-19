import React from 'react';
import { UseFormRegister, Control, useFieldArray } from 'react-hook-form';
import BulletPointsField from '../resumetest/ui/BulletPointsField';
import GPAField from '../resumetest/ui/GPAField';
import InputField from './InputField';
import TextareaAutosize from 'react-textarea-autosize';

type SectionItem = {
    id: string;
    [key: string]: any; // Additional fields as needed
};

type FieldConfig = {
    name: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'date' | 'gpa' | 'bulletPoints';
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
};

const ResumeSection: React.FC<SectionProps> = ({ title, register, control, sectionName, fieldsConfig }) => {
    const { fields, append, remove } = useFieldArray({ control, name: sectionName });

    const renderField = (fieldConfig: FieldConfig, item: SectionItem, index: number) => {
        const fieldName = `${sectionName}[${index}].${fieldConfig.name}`;

        switch (fieldConfig.type) {
            case 'text':
                return (
                    <div key={fieldConfig.name} className="mb-4">
                        <label className="text-gray-600 text-sm mb-1">{fieldConfig.placeholder.toUpperCase()}</label>
                        <InputField name={fieldName} register={register} placeholder={fieldConfig.placeholder} />
                    </div>
                );
            case 'textarea':
                return (
                    <div key={fieldConfig.name} className="mb-4 w-full">
                        <label className="text-gray-600 text-sm mb-1">{fieldConfig.placeholder.toUpperCase()}</label>
                        <TextareaAutosize {...register(fieldName)} placeholder={fieldConfig.placeholder} className="border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                );
            case 'date':
                return (
                    <div key={fieldConfig.name} className="mb-4">
                        <label className="text-gray-600 text-sm mb-1">{fieldConfig.placeholder.toUpperCase()}</label>
                        <input type="date" {...register(fieldName)} className="border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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
        const groupedFields = fieldsConfig.reduce<FieldGroups>((acc, fieldConfig) => {
            const group = fieldConfig.group || fieldConfig.name; // Fallback to name if no group specified
            acc[group] = acc[group] ? [...acc[group], fieldConfig] : [fieldConfig];
            return acc;
        }, {});
    
        return (
            <div key={item.id} className="mb-6 bg-white p-4 shadow rounded">
                {Object.entries(groupedFields).map(([group, groupFields]) => (
                    <div key={group} className="flex space-x-4">
                        {groupFields.map(fieldConfig => renderField(fieldConfig, item, index))}
                    </div>
                ))}
                <button type="button" onClick={() => remove(index)} className="mt-2 text-red-500 hover:text-red-700 transition duration-150 ease-in-out">Remove</button>
            </div>
        );
    };

    return (
        <div className="my-4 p-4 border border-gray-300 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{title.toUpperCase()}</h2>
            {fields.map(renderFields)}
            <button type="button" onClick={() => append({})} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">Add {title}</button>
        </div>
    );
};

export default ResumeSection;