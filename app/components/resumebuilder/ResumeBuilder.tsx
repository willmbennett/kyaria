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
        <div className='w-full lg:h-screen p-2 md:p-4 lg:p-6'>
            <div className='w-full h-full flex flex-col md:flex-row gap-2'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-row w-full justify-between'>
                        <Button disabled={toggleState} size='sm' className='w-full' variant={toggleState ? 'solid' : 'ghost'} type='button' onClick={() => setToggleState(true)}>Edit</Button>
                        <Button disabled={!toggleState} size='sm' className='w-full' variant={!toggleState ? 'solid' : 'ghost'} type='button' onClick={() => setToggleState(false)}>Feedback</Button>
                    </div>
                    <div className='flex w-full h-full overflow-y-scroll lg:overscroll-none p-4'>
                        {/*Toggle State True == Editing*/}
                        <div className={`h-full w-full ${!toggleState ? 'flex' : 'hidden '}`}>
                            <Feedback userResume={defaultValues} job={job} />
                        </div>
                        <div className={`h-full w-full ${toggleState ? 'flex' : 'hidden '}`}>
                            <ResumeForm methods={methods} job={job} />
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-center'>
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
