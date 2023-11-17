import React from 'react';
import { UseFormRegister, Control, useFieldArray } from 'react-hook-form';
import InputField from './InputField';

type SectionItem = {
    id: string;
    [key: string]: any; // Additional fields as needed
};

type SectionProps = {
    title: string;
    register: UseFormRegister<any>;
    control: Control<any>;
    sectionName: string;
};

const Section: React.FC<SectionProps> = ({ title, register, control, sectionName }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: sectionName,
    });

    const renderFields = (item: SectionItem, index: number) => {
        // Customize this part based on the fields needed for each section
        return (
            <div key={item.id}>
                <InputField
                    name={`${sectionName}[${index}].institution`}
                    register={register}
                    placeholder="Institution"
                />
                <InputField
                    name={`${sectionName}[${index}].degree`}
                    register={register}
                    placeholder="Degree"
                />
                {/* Add more fields as needed */}
                <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>
        );
    };

    return (
        <div>
            <h2>{title}</h2>
            {fields.map(renderFields)}
            <button type="button" onClick={() => append({})}>Add {title}</button>
        </div>
    );
};

export default Section;
