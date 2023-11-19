import React from 'react';
import { useForm } from 'react-hook-form';
import ResumeSection from './ResumeSection';
import { Position, EducationDetail } from '../../../models/ResumeScan';
import ListInput from './ListInput';
import { Skill, SkillsData } from '../../resumetest/resumetest-helper';
import SingleInput from '../resumetest/ui/SingleInput';
import dynamic from 'next/dynamic';

const DynamicResumePDF = dynamic(() => import("./ResumePDF"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
    });


type FormData = {
    education: Array<EducationDetail>;
    experience: Array<Position>;
    skills: Array<{ label: string; value: string }>;
    professionalSummary?: string;
    objective?: string;
    coverLetter?: string;
    hobbies?: string;
    patents?: string;
    publications?: string;
    speakingEngagements?: string;
    name?: string;
    telephone?: string;
    emailAddress?: string;
    location?: string;
    // Add other resume sections as needed
};


interface ResumeBuilderProps {
    education?: Array<EducationDetail>;
    experience?: Array<Position>;
    skills?: SkillsData;
    professionalSummary?: string;
    objective?: string;
    hobbies?: string;
    patents?: string;
    publications?: string;
    speakingEngagements?: string;
    name?: string
    telephone?: string;
    emailAddress?: string;
    location?: string;
    // Add other resume sections as needed
};


const ResumeBuilder = ({
    education,
    experience,
    skills,
    professionalSummary,
    objective,
    hobbies,
    patents,
    publications,
    speakingEngagements,
    name,
    telephone,
    emailAddress,
    location
}: ResumeBuilderProps) => {
    const defaultSkills = skills?.Raw
        .sort((a, b) => (b.MonthsExperience?.Value || 1) - (a.MonthsExperience?.Value || 1))
        .map(skill => ({ label: skill.Name, value: skill.Name }))

    const { register, handleSubmit, control, reset, watch } = useForm<FormData>({
        values: {
            education: education || [],
            experience: experience || [],
            skills: defaultSkills || []
        }
    });

    return (<div className='flex flex-row'>
        <div className='w-1/2'>
            <form>
                <SingleInput
                    sectionName="name"
                    register={register}
                    initialValue={name} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="telephone"
                    register={register}
                    initialValue={telephone} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="emailAddress"
                    register={register}
                    initialValue={emailAddress} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="location"
                    register={register}
                    initialValue={location} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="professionalSummary"
                    register={register}
                    initialValue={professionalSummary} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="objective"
                    register={register}
                    initialValue={objective} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="hobbies"
                    register={register}
                    initialValue={hobbies} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="patents"
                    register={register}
                    initialValue={patents} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="publications"
                    register={register}
                    initialValue={publications} // Replace with actual state/prop
                />

                <SingleInput
                    sectionName="speakingEngagements"
                    register={register}
                    initialValue={speakingEngagements} // Replace with actual state/prop
                />


                <h2>SKILLS</h2>
                <ListInput
                    name="skills"
                    control={control}
                />

                <ResumeSection
                    title="Experience"
                    register={register}
                    control={control}
                    sectionName="experience"
                    fieldsConfig={[
                        { name: "Employer.Name.Raw", placeholder: "Employer Name", type: "text", group: "emp" },
                        { name: "JobTitle.Raw", placeholder: "Job Title", type: "text", group: "emp" },
                        { name: "StartDate.Date", placeholder: "Start Date", type: "date", group: "emp-date" },
                        { name: "EndDate.Date", placeholder: "End Date", type: "date", group: "emp-date" },
                        { name: "Description", placeholder: "Job Description", type: "textarea" },
                        { name: "Bullets", placeholder: "Bullets", type: "bulletPoints" },
                        // ... other fields as needed
                    ]}
                />

                <ResumeSection
                    title="Education"
                    register={register}
                    control={control}
                    sectionName="education"
                    fieldsConfig={[
                        { name: "SchoolName.Raw", placeholder: "School Name", type: "text", group: "edu" },
                        { name: "Degree.Name.Raw", placeholder: "Degree", type: "text", group: "edu" },
                        { name: "GPA", placeholder: "GPA", type: "gpa", group: "edu" },
                        { name: "StartDate.Date", placeholder: "Start Date", type: "date", group: "edu-date" },
                        { name: "EndDate.Date", placeholder: "End Date", type: "date", group: "edu-date" },
                        { name: "Text", placeholder: "Education Details", type: "textarea" }
                        // ... other fields as needed
                    ]}
                />
            </form>
        </div>
        <div className='w-1/2'>
            <div className='sticky top-0 p-3'>
                <DynamicResumePDF data={watch()} />
            </div>
        </div>
    </div>);
};

export default ResumeBuilder;
