'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { Button } from '../Button';
import {
    ResumeBuilderFormData,
    ResumeBuilderProps,
    transformDataToFormValues
} from '../../resumebuilder/resumetest-helper';
import SaveStatusIndicator from './SaveStatusIndicator';
import ResumeForm from './ResumeForm';
import {useGeneratePDF, useSaveResume, useDragAndDrop } from '../../../lib/hooks/resume-test';
import ResumeLoadingComponent from './ResumeLoadingComponent';

// Dynamic import with loading component
const DynamicResumePDF = dynamic(() => import('../resumebuilder/ui/CustomPDFViewer'), {
    loading: () => <ResumeLoadingComponent />,
    ssr: false
});


const ResumeBuilder = (
    {
        data,
        toggleEdit,
        editResume,
        resumeId,
        resumeScanId,
        userId,
        activeSubscription = false,
        job
    }: ResumeBuilderProps) => {
    const defaultValues = transformDataToFormValues(data)
    const methods = useForm<ResumeBuilderFormData>({ defaultValues });
    const { watch, setValue } = methods
    const sections = watch('sectionOrder')
    const { saveStatus, saveToDatabase } = useSaveResume({ userId, resumeId, resumeScanId, editResume, data, defaultValues, watch });
    const handleDragEnd = useDragAndDrop({ watch, setValue });
    const generatePDF = useGeneratePDF({ defaultValues });

    return (
        <div className='w-full flex flex-col px-4'>
            <div className='flex flex-row w-full space-x-2'>
                {editResume && <>
                    <div className='w-full'>
                        <div className='flex flex-row w-full justify-center items-center space-x-2 py-3 sticky top-0 bg-white'>
                            {activeSubscription && <Button type='button' variant='ghost' size='sm' onClick={saveToDatabase}>Save</Button>}
                            <Button type='button' variant='ghost' size='sm' onClick={toggleEdit}>Exit</Button>
                            <Button type='button' size='sm' onClick={generatePDF}>Download</Button>
                            <SaveStatusIndicator saveStatus={saveStatus} />
                        </div>
                        {activeSubscription ?
                            <ResumeForm handleDragEnd={handleDragEnd} sections={sections} methods={methods} job={job}/>
                            :
                            <Button href="/pricing">Subscribe to Edit</Button>
                        }
                    </div>
                </>}
                <div className='w-full h-auto'>
                    <div className='sticky top-0 h-screen'>
                        <DynamicResumePDF key={sections.join('-')} data={defaultValues} sections={sections} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
