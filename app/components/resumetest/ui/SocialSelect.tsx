import React, { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import CreatableSelect from 'react-select/creatable';
import { ResumeBuilderFormData } from '../../../resumetest/resumetest-helper';

const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
    createOption('LinkedIn'),
    createOption('Github'),
    createOption('Twitter'),
    createOption('Website'),
    createOption('Blog'),
];

function SocialSelect({ field }: { field: ControllerRenderProps<ResumeBuilderFormData, `social_links.${number}.name`>}) {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(defaultOptions);

    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption]);
            field.onChange(newOption); // Update form state
        }, 1000);
    };

    return (
        <div className='w-full'>
            <CreatableSelect
                isClearable
                name={field.name}
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={field.onChange} // Use field.onChange
                onCreateOption={handleCreate}
                options={options}
            />
        </div>
    );
};

export default SocialSelect;