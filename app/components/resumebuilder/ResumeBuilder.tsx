'use client'
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import {
    convertFormDataToResumeModel,
    ResumeBuilderFormData,
    ResumeBuilderProps,
    transformDataToFormValues
} from '../../resumebuilder/resumetest-helper';
import ResumeForm from './form/ResumeForm';
import { useSaveResume } from '../../../lib/hooks/resume-test';
import CustomPDFViewer from './pdfviewer/CustomPDFViewer';
import Feedback from './Feedback';

const ResumeBuilder = (
    {
        data,
        resumeId,
        userId,
        job,
        useSave = true
    }: ResumeBuilderProps) => {
    const [toggleState, setToggleState] = useState(true)
    const defaultValues = useMemo(() => transformDataToFormValues(data), [data]);
    const methods = useForm<ResumeBuilderFormData>({ defaultValues });
    const { watch } = methods
    const { saveStatus } = useSaveResume({ userId, resumeId, data, watch, useSave })

    return (
        <div className='w-full min-h-screen lg:h-screen bg-white p-2 lg:pl-4 lg:pr-8'> {/* Ensured sticky bar is at the top with a higher z-index */}
            <div className='w-full h-full flex md:p-4 flex-col space-y-4 md:flex-row space-y-2 md:space-x-2 border bg-slate-100 border-slate-400 shadow rounded-md'>
                <div className='flex flex-col w-full h-full'>
                    <div className='py-3 flex flex-row w-full space-x-2 justify-center lg:justify-start'>
                        <h1 className="text-start text-2xl font-semibold text-slate-900 ">
                            Resume Builder
                        </h1>
                        <Button size='sm' variant='ghost' href="/resumebuilder">← Back to Resumes</Button>
                    </div>
                    <div className='flex flex-row w-full justify-between'>
                        <Button disabled={toggleState} size='sm' className='w-full' variant={toggleState ? 'solid' : 'ghost'} type='button' onClick={() => setToggleState(true)}>Edit</Button>
                        <Button disabled={!toggleState} size='sm' className='w-full' variant={!toggleState ? 'solid' : 'ghost'} type='button' onClick={() => setToggleState(false)}>Feedback</Button>
                    </div>
                    <div className='flex w-full h-full overflow-y-scroll lg:overscroll-none p-4 border border-slate-200 shadow-inner'>
                        {/*Toggle State True == Editing*/}
                        <div className={`h-full w-full ${!toggleState ? 'relative top-0' : 'hidden '}`}>
                            <Feedback userResume={defaultValues} job={job} />
                        </div>
                        <div className={`h-full w-full ${toggleState ? 'relative top-0' : 'hidden '}`}>
                            <ResumeForm methods={methods} job={job} />
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-center'>
                    {defaultValues &&
                        <CustomPDFViewer
                            data={useSave ? data : convertFormDataToResumeModel(watch(), data)}
                            saveStatus={saveStatus} userId={userId}
                            useSave={useSave}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
