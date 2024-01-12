import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ContactInformation from './ContactInformation'; // adjust import path
import SocialLinksSection from './SocialLinksSection'; // adjust import path
import SortableResumeSection from '../resumebuilder/ui/SortableResumeSection';
import Section from '../resumebuilder/ui/Section';
import { ResumeBuilderFormData, sectionOptions } from '../../resumebuilder/resumetest-helper';

type ResumeFormProps = {
    handleDragEnd: (event: any) => void; // Specify the correct event type
    sections: sectionOptions[];
    methods: UseFormReturn<ResumeBuilderFormData, any, undefined>
};

const ResumeForm: React.FC<ResumeFormProps> = ({ handleDragEnd, sections, methods }) => {

    const { register, control, watch, setValue } = methods

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    return (
        <FormProvider {...methods}>
            <form>
                <Section title={"Contact Information".toUpperCase()}>
                    <div className='mb-6 p-4 border bg-slate-100 border-slate-400 shadow rounded-md'>
                        <ContactInformation />
                        <SocialLinksSection />
                    </div>
                </Section>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
    );
};

export default ResumeForm;
