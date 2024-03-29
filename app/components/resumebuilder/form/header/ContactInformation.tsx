import React, { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { JobClass } from '../../../../../models/Job';
import SingleInput from './SingleInput';
import { ResumeClass } from '../../../../../models/Resume';
import { FieldWrapper } from '../sections/fields/FieldWrapper';

interface ContactInformationProps {
    job?: Partial<JobClass>;
    resume: ResumeClass;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
}


const ContactInformation = ({ job, resume, setSaveStatus }: ContactInformationProps) => {
    const resumeId = resume._id.toString()
    const inputFields = [
        { sectionName: 'name' },
        { sectionName: 'title' },
        { sectionName: 'phone' },
        { sectionName: 'email' },
        { sectionName: 'location' },
        { sectionName: 'summary', optimize: true }
    ];

    const methods = useForm({
        defaultValues: {
            name: resume.name,
            title: resume.title,
            phone: resume.phone,
            location: resume.location,
            summary: resume.summary
        }
    });

    const { register } = methods

    return (
        <FormProvider {...methods}>
            <form>
                {inputFields.map((field, index) => (
                    <FieldWrapper
                        key={index}
                        className="w-full"
                        resumeId={resumeId}
                        placeholder={field.sectionName.toUpperCase()}
                        fieldName={field.sectionName}
                        setKey={field.sectionName}
                        setSaveStatus={setSaveStatus}
                    >
                        <SingleInput
                            key={index}
                            sectionName={field.sectionName}
                            register={register}
                            optimize={field.optimize}
                            job={job}
                            resume={resume}
                        />
                    </FieldWrapper>
                ))}
            </form>
        </FormProvider>
    );
};

export default ContactInformation;
