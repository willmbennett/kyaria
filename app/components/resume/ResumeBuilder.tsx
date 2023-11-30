'use client'
import React, { useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import SingleInput from '../resumebuilder/ui/SingleInput';
import dynamic from 'next/dynamic';
import { Button } from '../Button';
import { Award, Certification, Education, ProfessionalExperience, Project, Publication, ResumeClass, Volunteering } from '../../../models/Resume';
import { GeneralSectionConfig, parseDate, ResumeBuilderFormData, sectionConfigs, sectionType, sortDataBasedOnConfig } from '../../resumebuilder/resumetest-helper';
import Section from '../resumebuilder/ui/Section';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ReactPDF from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { format } from 'date-fns';

const DynamicResumePDF = dynamic(() => import('../resumebuilder/ui/CustomPDFViewer'), {
    loading: () => <p>Loading Resume...</p>,
    ssr: false,
});

const SortableResumeSection = dynamic(
    () => import('../resumebuilder/ui/SortableResumeSection'),
    { ssr: false }
);

type SocialField = { id: string, name: string, url: string }
type sectionOptions = "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests' | 'volunteering'

const socialPlatforms = ['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'Website', 'Blog']; // Add more platforms as needed

const ResumeBuilder = ({ data, toggleEdit, editResume }: { data: ResumeClass, toggleEdit: any, editResume: boolean }) => {
    const {
        name,
        title,
        email,
        phone,
        social_links,
        location,
        summary,
        skills,
        professional_experience,
        education,
        projects,
        interests,
        certifications,
        publications,
        awards,
        volunteering
    } = data

    const resumeSections: sectionOptions[] = [
        'skills',
        'professional_experience',
        'education',
        'projects',
        'awards',
        'publications',
        'certifications',
        'volunteering',
        'interests'
    ]

    const [sections, setSections] = useState<sectionOptions[]>(resumeSections);

    const defaultSkills = skills ? skills
        .map(skill => ({ label: skill, value: skill })) : null

    const defaultInterests = interests ? interests
        .map(interest => ({ label: interest, value: interest })) : null


    const socialLinksArray = Object.entries(social_links).map(([name, url]) => ({
        name,
        url
    }));

    type dateSections = Publication | Award
    type startEndSections = ProfessionalExperience | Education | Project | Certification | Volunteering

    const handleResumeInport = <T extends sectionType>(id: string, section?: sectionType[]): T[] => {
        const config = sectionConfigs.find(config => config.id === id) as GeneralSectionConfig;
        const hasEndDate = config.fieldsConfig.some(field => field.name === 'end_date');
        const hasStartDate = config.fieldsConfig.some(field => field.name === 'start_date');
        const hasDate = config.fieldsConfig.some(field => field.name === 'date');

        const updatedSection = (section || []).map(item => {
            const updatedItem = { ...item };

            // Format date fields correctly, if they exist
            if (hasDate) {
                const parsedDate = parseDate((updatedItem as dateSections).date);
                (updatedItem as dateSections).date = format(parsedDate, 'yyyy-MM-dd');
            }
            if (hasEndDate) {
                const parsedDate = parseDate((updatedItem as startEndSections).end_date);
                (updatedItem as startEndSections).end_date = format(parsedDate, 'yyyy-MM-dd');
            }
            if (hasStartDate) {
                const parsedDate = parseDate((updatedItem as startEndSections).start_date);
                (updatedItem as startEndSections).start_date = format(parsedDate, 'yyyy-MM-dd');
            }

            // Map and filter responsibilities if they exist
            if ('responsibilities' in item && item.responsibilities) {
                item.responsibilities = item.responsibilities.filter(resp => resp.show !== false);
            }

            // Map and filter details if they exist
            if ('details' in item && item.details) {
                item.details = item.details.filter(detail => detail.show !== false);
            }

            return updatedItem;
        }).filter(item => item.show === null || item.show !== false)

        const sortedResumeSection = sortDataBasedOnConfig(updatedSection, config) || [];

        return sortedResumeSection as T[];;
    };






    const methods = useForm<ResumeBuilderFormData>({
        values: {
            email,
            phone,
            location,
            summary,
            title,
            name,
            education: handleResumeInport('education', education),
            professional_experience: handleResumeInport('professional_experience', professional_experience),
            skills: defaultSkills || [],
            projects: handleResumeInport('projects', projects),
            interests: defaultInterests || [],
            social_links: socialLinksArray,
            certifications: handleResumeInport('certifications', certifications),
            publications: handleResumeInport('publications', publications),
            awards: handleResumeInport('awards', awards),
            volunteering: handleResumeInport('volunteering', volunteering),
        }
    });

    const { register, control, watch, setValue } = methods


    const { fields, append, remove } = useFieldArray({
        control,
        name: "social_links"
    });

    const inputFields = [
        { sectionName: 'name', initialValue: name },
        { sectionName: 'title', initialValue: title },
        { sectionName: 'phone', initialValue: phone },
        { sectionName: 'email', initialValue: email },
        { sectionName: 'location', initialValue: location },
        { sectionName: 'summary', initialValue: summary, optimize: true }
    ];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (over && active.id !== over.id) {
            setSections((sections) => {
                const oldIndex = sections.indexOf(active.id.toString() as sectionOptions);
                const newIndex = sections.indexOf(over.id.toString() as sectionOptions);
                return arrayMove(sections, oldIndex, newIndex);
            });
        }
    };

    const generatePDF = async () => {
        const name = watch('name')?.replace(' ', '_')
        const blob = await ReactPDF.pdf((
            <ResumePDF key={sections.join('-')} data={watch()} sections={sections} />
        )).toBlob();

        // Example: Save the blob as a file (or you can handle it as needed)
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}_Resume.pdf`;
        link.click();
    };


    return (<div className='flex flex-row w-full px-3'>
        {editResume && <>
            <div className='min-h-screen p-3'>
                <div className='flex flex-col sticky top-0 space-y-2 border border-slate-200 shadow rounded-md p-3'>
                    <h1>Menu</h1>
                    <Button variant='ghost' size='md' onClick={toggleEdit}>Exit Builder</Button>
                    <Button size='md' onClick={generatePDF} className="mb-2">Download Resume</Button>
                </div>
            </div>
            <div className='w-full'>
                <FormProvider {...methods}>
                    <form>
                        <Section title={"Contact Information".toUpperCase()}>
                            <div className='mb-6 p-4 border bg-slate-100 border-slate-400 shadow rounded-md'>
                                {inputFields.map((field, index) => (
                                    <SingleInput
                                        key={index}
                                        sectionName={field.sectionName}
                                        register={register}
                                        optimize={field.optimize}
                                    />
                                ))}

                                <h2 className="text-lg font-semibold mb-4">{'Social Links'.toUpperCase()}</h2>
                                {fields.map((field: SocialField, index) => (
                                    <div key={field.id} className="flex items-center mb-2">
                                        <Controller
                                            name={`social_links.${index}.name`}
                                            control={control}
                                            render={({ field }) => (
                                                <select {...field} className="border p-1 rounded w-full">
                                                    {socialPlatforms.map((platform, idx) => (
                                                        <option key={idx} value={platform}>
                                                            {platform}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                            defaultValue={field.name || socialPlatforms[0]} // Set default value
                                        />
                                        <Controller
                                            name={`social_links.${index}.url`}
                                            control={control}
                                            render={({ field }) => <input {...field} placeholder="Social Link URL" className="border p-1 rounded w-full" />}
                                        />
                                        <button onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                                    </div>
                                ))}
                                <Button size='md' type="button" onClick={() => append({ name: socialPlatforms[0], url: '' })} className="text-blue-500">Add Social Link</Button>
                            </div>
                        </Section>

                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
                            <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                                {sections.map((section: sectionOptions, idx: number) =>
                                    <SortableResumeSection
                                        key={section}
                                        id={section}
                                        name={section}
                                        control={control}
                                        register={register}
                                        setValue={setValue}
                                        watch={watch}
                                    />)}
                            </SortableContext>
                        </DndContext>
                    </form>
                </FormProvider>
            </div>
        </>}
        <div className='w-full h-auto'>
            <div className='sticky top-0 p-3 h-screen'>
                <DynamicResumePDF key={sections.join('-')} data={watch()} sections={sections} />
            </div>

        </div>
    </div>);
};

export default ResumeBuilder;
