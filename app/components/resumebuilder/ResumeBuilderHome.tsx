'use client'
import React, { useMemo, useState } from 'react';
import ResumeListMenu from './ResumeMenu';
import { ResumeClass } from '../../../models/Resume';
import CustomPDFViewer from './pdfviewer/CustomPDFViewer';

interface resumeTestProps {
    userId: string,
    resumes: ResumeClass[]
}

export default function ResumeBuilderHome(
    {
        userId,
        resumes
    }: resumeTestProps) {

    // Set the index of the active resume
    const [resumeIndex, setResumeIndex] = useState<string | null>(resumes.length > 0 ? resumes[0]._id.toString() : null);

    // Set the active Resume
    const activeResume = useMemo(() => resumes.find(resume => resume._id == resumeIndex), [resumeIndex, resumes]);

    return (
        <div className='flex justify-center w-full'>
            <div className='px-2 py-4 w-full flex flex-col space-x-2 justify-center max-w-5xl'>
                <ResumeListMenu
                    resumes={resumes}
                    resumeIndex={resumeIndex}
                    setResumeIndex={setResumeIndex}
                />
                {activeResume &&
                    <div className='w-full flex flex-col items-center justify-center'>
                        <CustomPDFViewer
                            data={activeResume}
                            useEdit={true}
                            userId={userId}
                            useSave={true}
                        />
                    </div>
                }
            </div>
        </div >
    );
}

