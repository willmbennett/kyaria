'use client'
import React, { useMemo } from 'react';
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
import { useGeneratePDF, useSaveResume } from '../../../lib/hooks/resume-test';
import CustomPDFViewer from '../resumebuilder/ui/CustomPDFViewer';


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
    const defaultValues = useMemo(() => transformDataToFormValues(data), [data]);
    const methods = useForm<ResumeBuilderFormData>({ defaultValues });
    const { watch, setValue } = methods
    const { saveStatus, saveToDatabase } = useSaveResume({ userId, resumeId, resumeScanId, editResume, data, defaultValues, watch });
    const generatePDF = useGeneratePDF({ defaultValues });

    return (
        <div className='flex w-full p-4'>
            <div className={`w-full flex md:p-4 ${editResume ? 'flex-col md:flex-row space-y-2 md:space-x-2 border bg-slate-100 border-slate-400 shadow rounded-md' : ''}`}>
                {editResume &&
                    <div className={`w-full ${editResume ? 'md:w-1/2' : ''}`}>
                        <div className='flex flex-row w-full justify-center items-center space-x-2 py-3 sticky top-0 bg-slate-100'>
                            {activeSubscription && saveStatus == 'error' && <Button type='button' variant='ghost' size='sm' onClick={saveToDatabase}>Save</Button>}
                            <Button type='button' variant='ghost' size='sm' onClick={toggleEdit}>Exit</Button>
                            <Button type='button' size='sm' onClick={generatePDF}>Download</Button>
                            <SaveStatusIndicator saveStatus={saveStatus} />
                        </div>
                        <div className='w-full p-4'>
                            {activeSubscription ?

                                <ResumeForm methods={methods} job={job} />
                                :
                                <Button href="/pricing">Subscribe to Edit</Button>
                            }
                        </div>
                    </div>
                }
                <div className={`flex w-full ${editResume ? 'md:w-1/2' : ''}`}>
                    <div className='w-full sticky top-0 h-screen'>
                        {defaultValues &&
                            <CustomPDFViewer data={defaultValues} />
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
