import React from 'react';
import { useFormContext } from 'react-hook-form';
import { JobClass } from '../../../models/Job';
import SingleInput from '../resumebuilder/ui/SingleInput';

const ContactInformation = ({ job }: { job?: Partial<JobClass> }) => {
    const { register } = useFormContext(); // Using React Hook Form's context

    const inputFields = [
        { sectionName: 'name' },
        { sectionName: 'title' },
        { sectionName: 'phone' },
        { sectionName: 'email' },
        { sectionName: 'location' },
        { sectionName: 'summary', optimize: true }
    ];

    return (
        <div className='mb-6 p-4'>
            {inputFields.map((field, index) => (
                <SingleInput
                    key={index}
                    sectionName={field.sectionName}
                    register={register}
                    optimize={field.optimize}
                    job={job}
                />
            ))}
        </div>
    );
};

export default ContactInformation;
