'use client'
import React, { useCallback, useEffect, useId, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import SingleInput from '../resumebuilder/ui/SingleInput';
import dynamic from 'next/dynamic';
import { Button } from '../Button';
import { Award, Certification, Education, ProfessionalExperience, Project, Publication, ResumeClass, Volunteering } from '../../../models/Resume';
import { convertFormDataToResumeModel, GeneralSectionConfig, parseDate, ResumeBuilderFormData, sectionConfigs, sectionType, sortDataBasedOnConfig } from '../../resumebuilder/resumetest-helper';
import Section from '../resumebuilder/ui/Section';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ReactPDF from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { format } from 'date-fns';
import SortableResumeSection from '../resumebuilder/ui/SortableResumeSection';
import { createResumeAction, updateResumeAction } from '../../board/_action';
import { debounce, isEqual } from 'lodash';
import { useRouter } from 'next/navigation';

const DynamicResumePDF = dynamic(() => import('../resumebuilder/ui/CustomPDFViewer'), {
    loading: () => <p>Loading Resume...</p>,
    ssr: false,
});

type SocialField = { id: string, name: string, url: string }
type sectionOptions = "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests' | 'volunteering'

const socialPlatforms = ['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'Website', 'Blog']; // Add more platforms as needed

const ResumeBuilder = (
    {
        data,
        toggleEdit,
        editResume,
        resumeId,
        resumeScanId,
        userId
    }: {
        data: Partial<ResumeClass>,
        toggleEdit: any,
        editResume: boolean,
        resumeId?: string,
        resumeScanId?: string
        userId?: string
    }) => {
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
        volunteering,
        sectionOrder
    } = data
    const [saveStatus, setSaveStatus] = useState('up to date');
    const router = useRouter()

    const resumeSections: sectionOptions[] = sectionOrder ? sectionOrder as sectionOptions[] : [
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

    const defaultSkills = skills ? skills
        .map(skill => ({ label: skill, value: skill })) : null

    const defaultInterests = interests ? interests
        .map(interest => ({ label: interest, value: interest })) : null


    const socialLinksArray = social_links && Object.entries(social_links).map(([name, url]) => ({
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
            sectionOrder: resumeSections
        }
    });

    const { register, control, watch, setValue } = methods

    const [currentResume, setCurrentResume] = useState(convertFormDataToResumeModel(watch()));
    const newResume = convertFormDataToResumeModel(watch())

    const savetoDatabase = async () => {
        setSaveStatus('saving');
        const resumeToSave = convertFormDataToResumeModel(watch())
        //console.log(resumeToSave)
        try {
            const userResumeWithIds = { userId, resumeScan: resumeScanId, ...resumeToSave }
            //console.log('resumeId: ', resumeId)
            //console.log('resumeScanId: ', resumeScanId)
            //console.log('resumeToSave: ', resumeToSave)
            //console.log('userId: ', userId)
            //console.log('userResumeWithIds: ', userResumeWithIds)
            if (resumeId) {
                await updateResumeAction(resumeId, { ...resumeToSave }, '/')
            } else if (resumeScanId) {
                const resumeId = await createResumeAction(userResumeWithIds, '/')
                //console.log(resumeId)
            }
            router.refresh()
            setTimeout(() => {
                setSaveStatus('up to date');
            }, 1000); // Adjust the delay as needed
        } catch (error) {
            //console.error('Error saving to database:', error);
            setSaveStatus(`error: ${error}`);
            // Handle the error appropriately
        }
    }

    function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
        let timeoutId: NodeJS.Timeout | null = null;

        return function (...args: Parameters<T>) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => callback(...args), delay);
        };
    }

    const debouncedSaveToDatabase = useCallback(
        debounce(() => {
            savetoDatabase();
        }, 5000),
        [] // Dependencies array is empty to ensure this is only created once
    );

    useEffect(() => {
        //console.log('newResume: ', newResume);
        //console.log('currentResume: ', currentResume);
        const resumeChanged = !isEqual(currentResume, newResume)
        if ((resumeChanged) && editResume) {
            //console.log('Made it to save');
            debouncedSaveToDatabase();
            setCurrentResume(newResume); // Update the current state
        }
    }, [newResume, currentResume, editResume, debouncedSaveToDatabase, savetoDatabase]);

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
            const currentSectionOrder = watch('sectionOrder')
            const updateSections = (sections: sectionOptions[]): sectionOptions[] => {
                const oldIndex = sections.indexOf(active.id.toString() as sectionOptions);
                const newIndex = sections.indexOf(over.id.toString() as sectionOptions);
                return arrayMove(sections, oldIndex, newIndex);
            }

            const newSectionOrder = updateSections(currentSectionOrder)
            //console.log(newSectionOrder)

            setValue('sectionOrder', newSectionOrder)
        }
    };

    const generatePDF = async () => {
        const name = watch('name')?.replace(' ', '_')
        const sectionOrder = watch('sectionOrder')
        const blob = await ReactPDF.pdf((
            <ResumePDF key={sectionOrder.join('-')} data={watch()} sections={sectionOrder} />
        )).toBlob();

        // Example: Save the blob as a file (or you can handle it as needed)
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}_Resume.pdf`;
        link.click();
    };

    const id = useId()

    const sections = watch('sectionOrder')


    return (
        <div className='w-full flex flex-col px-4'>
            <div className='flex flex-row w-full space-x-2'>
                {editResume && <>
                    <div className='w-full'>
                        <div className='flex flex-row w-full justify-center items-center space-x-2 py-3 sticky top-0 bg-white'>
                            <Button variant='ghost' size='sm' onClick={savetoDatabase}>Save</Button>
                            <Button variant='ghost' size='sm' onClick={toggleEdit}>Exit</Button>
                            <Button size='sm' onClick={generatePDF}>Download</Button>
                            <div className='flex flex-row space-x-2'>
                                <p>Status: </p>
                                {saveStatus === 'saving' && (
                                    <span className='text-orange-500'>
                                        Saving... <span role="img" aria-label="saving">⏳</span>
                                    </span>
                                )}
                                {saveStatus === 'up to date' && (
                                    <span className='text-green-500'>
                                        Up to date <span role="img" aria-label="ok">✅</span>
                                    </span>
                                )}
                                {saveStatus === 'error' && (
                                    <span className='text-red-500'>
                                        Error during save <span role="img" aria-label="error">❌</span>
                                    </span>
                                )}
                            </div>

                        </div>
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
                                                    render={({ field }) => <input type="url" {...field} placeholder="Social Link URL" className="border p-1 rounded w-full" />}
                                                />
                                                <button onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                                            </div>
                                        ))}
                                        <Button size='md' type="button" onClick={() => append({ name: socialPlatforms[0], url: '' })} className="text-blue-500">Add Social Link</Button>
                                    </div>
                                </Section>

                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} id={id}>
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
                    <div className='sticky top-0 h-screen'>
                        <DynamicResumePDF key={sections.join('-')} data={watch()} sections={sections} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
