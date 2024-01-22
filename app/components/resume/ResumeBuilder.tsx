'use client'
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import {
    ResumeBuilderFormData,
    ResumeBuilderProps,
    transformDataToFormValues
} from '../../resumebuilder/resumetest-helper';
import ResumeForm from './ResumeForm';
import { useSaveResume } from '../../../lib/hooks/resume-test';
import CustomPDFViewer from '../resumebuilder/ui/CustomPDFViewer';


const ResumeBuilder = (
    {
        data,
        resumeId,
        resumeScanId,
        userId,
        activeSubscription = false,
        job
    }: ResumeBuilderProps) => {
    const defaultValues = useMemo(() => transformDataToFormValues(data), [data]);
    const methods = useForm<ResumeBuilderFormData>({ defaultValues });
    const { watch } = methods
    const { saveStatus } = useSaveResume({ userId, resumeId, resumeScanId, data, defaultValues, watch });

    return (
        <div className='w-screen h-screen bg-white px-4'> {/* Ensured sticky bar is at the top with a higher z-index */}
            <div className='w-full h-full flex md:p-4 flex-col md:flex-row space-y-2 md:space-x-2 border bg-slate-100 border-slate-400 shadow rounded-md'>
                <div className='w-full h-full overflow-scroll overscroll-none'>
                    <div className='p-3 w-full justify-start sticky top-0 bg-slate-100'>
                        <div className='flex flex-row space-x-4'>
                            <h1 className="text-start text-2xl font-semibold text-slate-900 ">
                                Resume Builder
                            </h1>
                            <Button size='sm' variant='ghost' href="/resumebuilder">← Back to Resumes</Button>
                        </div>
                    </div>
                    <div className="w-full min-h-full p-4 border border-slate-200 shadow-inner">
                        {activeSubscription ?

                            <ResumeForm methods={methods} job={job} />
                            :
                            <Button href="/pricing">Subscribe to Edit</Button>
                        }
                    </div>
                </div>
                {defaultValues &&
                    <CustomPDFViewer data={data} saveStatus={saveStatus} />
                }
            </div>
        </div>
    );
};

export default ResumeBuilder;
