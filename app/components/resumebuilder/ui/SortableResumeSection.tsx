'use client'
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ResumeBuilderFormData, sectionConfigs } from '../../../resumebuilder/resumetest-helper';
import ResumeSection from '../../resume/ResumeSection';
import ListInput from '../../resume/ListInput';
import { JobClass } from '../../../../models/Job';
import Section from './Section';


const renderField = ({ id, name, control, register, setValue, watch, job }: ListInputProps) => {

    const sectionConfig = sectionConfigs.find(config => config.id === id);
    switch (sectionConfig?.sectionType) {
        case 'list':
            return (
                <ListInput
                    name={name}
                    control={control}
                    setValue={setValue}
                    watch={watch}
                    job={job}
                />
            );
        case 'section':
            return (
                <ResumeSection
                    title={sectionConfig.title || ''}
                    register={register}
                    control={control}
                    sectionName={sectionConfig.sectionName || ''}
                    fieldsConfig={sectionConfig.fieldsConfig || [{ name: "misc", placeholder: "Add additional information", type: "textarea" }]}
                    watch={watch}
                />
            );
        default:
            return null;
    }
};

type ListInputProps = {
    id: string;
    name: "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests' | 'volunteering';
    control: Control<ResumeBuilderFormData>;
    register: UseFormRegister<ResumeBuilderFormData>;
    setValue: UseFormSetValue<ResumeBuilderFormData>;
    watch: UseFormWatch<ResumeBuilderFormData>;
    job?: Partial<JobClass>
};

function SortableResumeSection({ id, name, control, register, setValue, watch, job }: ListInputProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='flex flex-row items-top justify-center w-full h-full hover:cursor-grab shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-200'>
            <Section title={name.toUpperCase()} isDragging={isDragging}>
                {renderField({id, name, control, register, setValue, watch, job})}
            </Section>
        </div>
    );
}

export default SortableResumeSection;