import React, { useId, useState } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, DragStartEvent, } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ContactInformation from './ContactInformation'; // adjust import path
import SocialLinksSection from './SocialLinksSection'; // adjust import path
import SortableResumeSection from './SortableResumeSection';
import Section from './Section';
import { ResumeBuilderFormData, sectionOptions } from '../../../resumebuilder/resumetest-helper';
import { JobClass } from '../../../../models/Job';
import { useDragAndDrop } from '../../../../lib/hooks/resume-test';

type ResumeFormProps = {
    methods: UseFormReturn<ResumeBuilderFormData, any, undefined>
    job?: Partial<JobClass>
};

const ResumeForm: React.FC<ResumeFormProps> = ({ methods, job }) => {

    const { register, control, watch, setValue } = methods
    const handleDragEnd = useDragAndDrop({ watch, setValue });

    const sections = watch('sectionOrder')
    const [activeSection, setActiveSection] = useState<string | null>()

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    );

    const handleDragStart = (event: DragStartEvent) => {
        // Logic to handle item drop, updating the state of jobApps accordingly
        //console.log(event.active.id.toString())
        setActiveSection(event.active.id.toString());
    };

    const overlaySection = sections.find(section => section === activeSection) || ''

    const id = useId()

    return (
        <FormProvider {...methods}>
            <form>
                <div className='w-full space-y-3 flex flex-col justify-center '>
                    <Section title={"Header".toUpperCase()}>
                        <ContactInformation job={job} />
                        <SocialLinksSection />
                    </Section>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} id={id}>
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
                                    job={job}
                                />)}
                        </SortableContext>
                        <DragOverlay>
                            {sections && overlaySection ? (
                                <Section title={overlaySection.replace('_', ' ').toUpperCase()}>
                                </Section>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </form>
        </FormProvider>
    );
};

export default ResumeForm;
