import { DndContext, closestCenter, DragOverlay, } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ContactInformation from './header/ContactInformation'; // adjust import path
import { SocialLinksSection } from './header/SocialLinksSection'; // adjust import path
import Section from './sections/Section';
import { sectionOptions } from '../../../resumebuilder/resumetest-helper';
import { JobClass } from '../../../../models/Job';
import { useResumeForm } from '../../../../lib/resumebuilder/use-resume-form';
import { ResumeClass } from '../../../../models/Resume';
import { Dispatch, SetStateAction } from 'react';
import { SortableFormSection } from './sections/SortableFormSection';
import { FormSection } from './sections/FormSection';

type ResumeFormProps = {
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
    job?: Partial<JobClass>;
    resume: ResumeClass
};

const ResumeForm: React.FC<ResumeFormProps> = ({ setSaveStatus, job, resume }) => {

    const { id, handleDragStart, handleDragEnd, sensors, overlaySection, sections } = useResumeForm({ setSaveStatus, resume })

    return (
        <div className='w-full space-y-3 flex flex-col'>
            <SortableFormSection
                id={'Header'}
                sortable={false}
            >
                <>
                    <ContactInformation job={job} resume={resume} setSaveStatus={setSaveStatus} />
                    <SocialLinksSection social_links={resume.social_links} resumeId={resume._id.toString()} setSaveStatus={setSaveStatus} />
                </>
            </SortableFormSection>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} id={id}>
                <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                    {sections.map((section: sectionOptions, idx: number) => {

                        return (
                            <SortableFormSection
                                id={section}
                                key={section}
                            >
                                <FormSection
                                    id={section}
                                    name={section}
                                    resume={resume}
                                    setSaveStatus={setSaveStatus} />
                            </SortableFormSection>
                        )
                    }
                    )}
                </SortableContext>
                <DragOverlay>
                    {sections && overlaySection ? (
                        <Section title={overlaySection.replace('_', ' ').toUpperCase()} isDragging={true}>
                        </Section>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default ResumeForm;
