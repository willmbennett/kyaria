import React, { useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import SingleInput from '../resumetest/ui/SingleInput';
import dynamic from 'next/dynamic';
import { Button } from '../Button';
import { ResumeClass } from '../../../models/Resume';
import { ResumeBuilderFormData } from '../../resumetest/resumetest-helper';
import Section from '../resumetest/ui/Section';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableResumeSection from '../resumetest/ui/SortableResumeSection';

const DynamicResumePDF = dynamic(() => import("./ResumePDF"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

type SocialField = { id: string, name: string, url: string }
type sectionOptions = "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests'

const socialPlatforms = ['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'Website', 'Blog']; // Add more platforms as needed

const ResumeBuilder = ({ data }: { data: ResumeClass }) => {
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
        interests
    } = data

    const resumeSections: sectionOptions[] = [
        'skills', 
        'professional_experience', 
        'education',
        'projects',
        'awards',
        'publications',
        'certifications',
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

    const methods = useForm<ResumeBuilderFormData>({
        values: {
            education: education || [],
            professional_experience: professional_experience || [],
            skills: defaultSkills || [],
            projects: projects || [],
            email,
            phone,
            location,
            summary,
            title,
            name,
            interests: defaultInterests || [],
            social_links: socialLinksArray
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


    return (<div className='flex flex-row w-full'>
        <div className='w-1/2'>
            <FormProvider {...methods}>
                <form>
                    <Section title={"Contact Information".toUpperCase()}>
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
                                        <select {...field} className="border p-1 rounded w-full" defaultValue={field.name || socialPlatforms[0]}>
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
                        <Button size='md' type="button" onClick={() => append({ name: socialPlatforms[0], url: '' })} className="text-blue-500">Add Social Link</Button>s
                    </Section>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                            {sections.map((section: sectionOptions, idx: number)  => 
                            <SortableResumeSection
                                key={idx}
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
        <div className='w-1/2'>
            <div className='sticky top-0 p-3'>
                <DynamicResumePDF data={watch() } sections={sections}/>
            </div>
        </div>
    </div>);
};

export default ResumeBuilder;
