import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ResumeBuilderFormData, sectionConfigs } from '../../../resumetest/resumetest-helper';
import ResumeSection from '../../resume/ResumeSection';
import Section from './Section';
import ListInput from '../../resume/ListInput';
import { Button } from '../../Button';


const renderField = ({ id, name, control, register, setValue, watch }: ListInputProps) => {

    const sectionConfig = sectionConfigs.find(config => config.id === id);
    switch (sectionConfig?.sectionType) {
        case 'list':
            return (
                <ListInput
                    name={name}
                    control={control}
                    setValue={setValue}
                    watch={watch}
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
                />
            );
        default:
            return null;
    }
};

type ListInputProps = {
    id: string;
    name: "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests';
    control: Control<ResumeBuilderFormData>;
    register: UseFormRegister<ResumeBuilderFormData>;
    setValue: UseFormSetValue<ResumeBuilderFormData>;
    watch: UseFormWatch<ResumeBuilderFormData>;
};

function SortableResumeSection({ id, name, control, register, setValue, watch }: ListInputProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className='flex flex-row items-center justify-center w-full'>
            {/* Drag Handle */}
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="drag-handle h-full">
                :::
            </div>
            <div style={style} className="w-full">
                <Section title={name.toUpperCase()}>
                    {renderField({ id, name, control, register, setValue, watch })}
                </Section>
            </div>
        </div>
    );
}

export default SortableResumeSection;