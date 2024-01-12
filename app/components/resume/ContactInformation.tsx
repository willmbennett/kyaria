import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResumeBuilderFormData } from '../../resumebuilder/resumetest-helper';
import SingleInput from '../resumebuilder/ui/SingleInput';

const ContactInformation = ({
    name,
    title,
    phone,
    email,
    location,
    summary
}: Partial<ResumeBuilderFormData>) => {
    const { register } = useFormContext(); // Using React Hook Form's context

    const inputFields = [
        { sectionName: 'name', initialValue: name },
        { sectionName: 'title', initialValue: title },
        { sectionName: 'phone', initialValue: phone },
        { sectionName: 'email', initialValue: email },
        { sectionName: 'location', initialValue: location },
        { sectionName: 'summary', initialValue: summary, optimize: true }
    ];

    return (
        <div className='mb-6 p-4'>
            {inputFields.map((field, index) => (
                <SingleInput
                    key={index}
                    sectionName={field.sectionName}
                    register={register}
                    optimize={field.optimize}
                />
            ))}
        </div>
    );
};

export default ContactInformation;
