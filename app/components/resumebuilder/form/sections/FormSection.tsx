'use client'
import React, { Dispatch, SetStateAction } from 'react';
import { sectionConfigs } from '../../../../resumebuilder/resumetest-helper';
import ResumeSection from './ResumeSection';
import ListInput from '../lists/ListInput';
import { JobClass } from '../../../../../models/Job';
import { ResumeClass } from '../../../../../models/Resume';
import { SectionFieldNames } from '../../../../resumebuilder/[id]/resumebuilder-helper';

type ListInputProps = {
    id: string;
    name: "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests' | 'volunteering';
    job?: Partial<JobClass>
    resume: ResumeClass
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
};

export const FormSection = ({ id, name, job, resume, setSaveStatus }: ListInputProps) => {

    const sectionConfig = sectionConfigs.find(config => config.id === id);

    if (!sectionConfig?.sectionType) return <></>

    switch (sectionConfig.sectionType) {
        case 'list':
            return (
                <ListInput
                    name={name}
                    resume={resume}
                    job={job}
                    setSaveStatus={setSaveStatus}
                />
            );
        case 'section':
            const sectionName = name as SectionFieldNames
            const items = resume[sectionName]
            //console.log('item: ', items)
            if (items) {
                return (
                    <ResumeSection
                        items={items}
                        resumeId={resume._id.toString()}
                        sectionName={sectionConfig.sectionName}
                        fieldsConfig={sectionConfig.fieldsConfig}
                        setSaveStatus={setSaveStatus}
                    />
                );
            } else {
                return <></>
            }
    }
}