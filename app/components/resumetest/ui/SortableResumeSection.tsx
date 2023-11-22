import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ResumeBuilderFormData } from '../../../resumetest/resumetest-helper';
import ResumeSection from '../../resume/ResumeSection';
import Section from './Section';
import ListInput from '../../resume/ListInput';

const renderField = ({ id, name, control, register, setValue, watch }: ListInputProps) => {

    switch (id) {
        case 'skills':
            return (
                <ListInput
                    name="skills"
                    control={control}
                    setValue={setValue}
                    watch={watch}
                />
            );
        case 'experience':
            return (
                <ResumeSection
                    title="Experience"
                    register={register}
                    control={control}
                    sectionName="professional_experience"
                    fieldsConfig={[
                        { name: "company", placeholder: "Employer Name", type: "text", group: "emp" },
                        { name: "title", placeholder: "Job Title", type: "text", group: "emp" },
                        { name: "location", placeholder: "Location", type: "text" },
                        { name: "start_date", placeholder: "Start Date", type: "date", group: "emp-date" },
                        { name: "end_date", placeholder: "End Date", type: "date", group: "emp-date" },
                        { name: "responsibilities", placeholder: "Bullets", type: "bulletPoints" },
                        // ... other fields as needed
                    ]}
                />
            );
        case 'education':
            return (
                <ResumeSection
                    title="Education"
                    register={register}
                    control={control}
                    sectionName="education"
                    fieldsConfig={[
                        { name: "institution", placeholder: "School Name", type: "text", group: "edu" },
                        { name: "degree", placeholder: "Degree", type: "text", group: "edu" },
                        { name: "location", placeholder: "Location", type: "text" },
                        { name: "GPA", placeholder: "GPA", type: "gpa" },
                        { name: "start_date", placeholder: "Start Date", type: "date", group: "edu-date" },
                        { name: "end_date", placeholder: "End Date", type: "date", group: "edu-date" },
                        { name: "details", placeholder: "Bullets", type: "bulletPoints" },
                        // ... other fields as needed
                    ]}
                />
            );
        default:
            return null;
    }
};

type ListInputProps = {
    id: string;
    name: string;
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