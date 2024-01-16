'use client'
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ResumeBuilderFormData, sectionConfigs } from '../../../resumebuilder/resumetest-helper';
import ResumeSection from '../../resume/ResumeSection';
import ListInput from '../../resume/ListInput';
import { JobClass } from '../../../../models/Job';


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
        <div className='flex flex-row items-top justify-center w-full h-full'>
            {/* Drag Handle */}
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="drag-handle h-full items-top py-3 px-3">
                :::
            </div>
            <div style={style} className="w-full">
                <div className='w-full'>
                    <button
                        type='button'
                        className='inline-flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 my-2'
                        onClick={() => setShowComponent(!showComponent)}
                        aria-expanded={showComponent}
                    >
                        {name.toUpperCase()}
                        <svg className={`-mr-1 h-5 w-5 text-gray-400 transition-transform duration-200 ${showComponent ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {!isDragging &&
                        <div className={`transition-all ease-in-out duration-300 ${showComponent ? '' : 'max-h-0 overflow-hidden'}`}>
                            {showComponent && renderField({ id, name, control, register, setValue, watch, job })}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SortableResumeSection;