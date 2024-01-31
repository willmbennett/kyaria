'use client'
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ResumeBuilderFormData, sectionConfigs } from '../../../resumebuilder/resumetest-helper';
import ResumeSection from './ResumeSection';
import ListInput from './ListInput';
import { JobClass } from '../../../../models/Job';
import { Button } from '../../Button';


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
    const [showComponent, setShowComponent] = useState(false);
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
        <div className='flex flex-row items-top justify-center w-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-200'>
            <div className='w-full bg-white rounded-xl'>
                <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='flex p-3 rounded-xl justify-between items-center hover:cursor-grab '>
                    <h2 className='text-lg font-semibold'>{name.replace('_', ' ').toLocaleUpperCase()}</h2>
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => setShowComponent(!showComponent)}
                    >
                        {showComponent ? 'Hide' : 'Edit'}
                    </Button>
                </div>

                {showComponent && !isDragging &&
                    <div className={`mb-6 p-4 transition-all ease-in-out duration-300 ${showComponent ? '' : 'max-h-0 overflow-hidden'}`}>
                        {renderField({ id, name, control, register, setValue, watch, job })}
                    </div>
                }
            </div>
        </div >
    );
}

export default SortableResumeSection;