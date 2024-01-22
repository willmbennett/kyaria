'use client'
import React, { useMemo, useState } from 'react';
import ResumeListMenu from './ui/ResumeMenu';
import { transformDataToFormValues } from '../../resumebuilder/resumetest-helper';
import FeedbackAside from '../landingpage/FeedbackAside';
import { ResumeClass } from '../../../models/Resume';
import CustomPDFViewer from './ui/CustomPDFViewer';

interface resumeTestProps {
    userId: string,
    resumes: ResumeClass[],
    activeSubscription: boolean
}

export default function ResumeTest(
    {
        userId,
        resumes,
        activeSubscription
    }: resumeTestProps) {

    // Set the index of the active resume
    const [resumeIndex, setResumeIndex] = useState<string | null>(resumes.length > 0 ? resumes[0]._id.toString() : null);

    // Set the active Resume
    const activeResume = useMemo(() => resumes.find(resume => resume._id == resumeIndex), [resumeIndex, resumes]);

    return (
        <div className='flex justify-center w-full'>
            <div className='px-2 py-4 w-full flex flex-col md:flex-row space-x-2 justify-center max-w-5xl'>
                <div className='w-full md:w-2/5 h-screen'>
                    <ResumeListMenu
                        resumes={resumes}
                        resumeIndex={resumeIndex}
                        setResumeIndex={setResumeIndex}
                        activeSubscription={activeSubscription}
                    />
                </div>
                <div className='items-center flex flex-col text-center md:min-w-3/5'>
                    {activeResume &&
                        <div className='w-full flex flex-col items-center justify-center'>
                            <CustomPDFViewer data={activeResume} useEdit={true} />
                        </div>
                    }
                </div>
                <div className='md:w-1/5'>
                    <FeedbackAside />
                </div>
            </div>
        </div >
    );
}

