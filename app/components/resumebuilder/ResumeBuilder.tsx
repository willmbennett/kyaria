'use client'
import React, { useState } from 'react';
import { Button } from '../Button';
import ResumeForm from './form/ResumeForm';
import CustomPDFViewer from './pdfviewer/CustomPDFViewer';
import Feedback from './Feedback';
import { ResumeClass } from '../../../models/Resume';
import { JobClass } from '../../../models/Job';

interface ResumeBuilderProps {
    resume: ResumeClass;
    resumeId: string;
    userId: string;
    job?: Partial<JobClass>;
    useSave?: boolean
}

export const ResumeBuilder = (
    {
        resume,
        resumeId,
        userId,
        job,
        useSave = true
    }: ResumeBuilderProps) => {
    const [toggleState, setToggleState] = useState(true)

    const [saveStatus, setSaveStatus] = useState<'saving' | 'up to date' | 'error'>('up to date');

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
                            <Feedback userResume={resume} job={job} />
                        </div>
                        <div className={`h-full w-full ${toggleState ? 'flex' : 'hidden '}`}>
                            <ResumeForm setSaveStatus={setSaveStatus} job={job} resume={resume} />
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-center'>
                    <CustomPDFViewer
                        data={resume}
                        saveStatus={saveStatus} userId={userId}
                        useSave={useSave}
                    />
                </div>
            </div>
        </div>
    );
};
