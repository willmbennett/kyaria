import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ResumeSection from './ResumeSection';
import { Position, EducationDetail } from '../../../models/ResumeScan';
import { PDFViewer } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import ListInput from './ListInput';
import { Skill, SkillsData } from '../../resumetest/resumetest-helper';

type FormData = {
    // Define the structure of your form data here
    education: Array<EducationDetail>;
    experience: Array<Position>;
    skills: Array<{ label: string; value: string }>;
    // Add other resume sections as needed
};

interface ResumeBuilderProps {
    // Define the structure of your form data here
    education?: Array<EducationDetail>;
    experience?: Array<Position>;
    skills?: SkillsData
    // Add other resume sections as needed
};

const ResumeBuilder = ({ education, experience, skills }: ResumeBuilderProps) => {
    const defaultSkills = skills?.Raw
    .sort((a, b) => (b.MonthsExperience?.Value || 1) - (a.MonthsExperience?.Value || 1))
    .map(skill => ({ label: skill.Name, value: skill.Name }))
    const [resume, setResume] = useState<FormData>()

    const { register, handleSubmit, control, reset } = useForm<FormData>({
        values: {
            education: education || [],
            experience: experience || [],
            skills: defaultSkills || []
        }
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        setResume(data)
    };

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Skills</h2>
            <ListInput
                name="skills"
                control={control}
            />

            <ResumeSection
                title="Education"
                register={register}
                control={control}
                sectionName="education"
            />
            <ResumeSection
                title="Professional Experience"
                register={register}
                control={control}
                sectionName="experience"
            />
            {/* Add other sections here */}
            <button type="submit">Generate Resume</button>
        </form>
        {resume &&
            <PDFViewer style={{ width: '100%', height: '90vh' }}>
                <ResumePDF data={resume} />
            </PDFViewer>
        }
    </>);
};

export default ResumeBuilder;
