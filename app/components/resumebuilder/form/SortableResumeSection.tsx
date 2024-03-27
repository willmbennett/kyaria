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
        <div className="rounded-xl w-full hover:shadow-lg hover:bg-slate-100 transition-all duration-200 ease-in-out">
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="flex p-3 rounded-xl justify-between items-center cursor-grab"
            >
                <h2 className="text-lg font-semibold">
                    {name.replace('_', ' ').toLocaleUpperCase()}
                </h2>
                <button
                    type="button"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 bg-transparent rounded-md p-2 transition-colors duration-150 ease-in-out"
                    onClick={() => setShowComponent(!showComponent)}
                >
                    {showComponent ? 'Hide' : 'Edit'}
                </button>
            </div>

            {showComponent && !isDragging && (
                <div className="mb-6 p-4 transition-all ease-in-out duration-300">
                    {renderField({ id, name, control, register, setValue, watch, job })}
                </div>
            )}
        </div>

    );
}

export default SortableResumeSection;