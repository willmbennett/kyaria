'use client'
import React, { useState } from 'react';
import { ResumeUploadForm } from './ResumeUploadForm';
import { Button } from '../../Button';
import ResumeTemplates from './Template';

const NewResumeForm = ({ userId }: { userId: string }) => {

    const [useTemplate, setUserTemplate] = useState(false)

    const toggleUserTemplate = () => {
        setUserTemplate(!useTemplate)
    }

    return (
        <>
            <div className='flex gap-2'>
                {!useTemplate && <p className='py-2'>Upload your resume, or </p>}
                <Button
                    onClick={toggleUserTemplate}
                    size="sm"
                    type="button"
                >
                    {useTemplate ? 'Upload File Instead' : "Use a template"}
                </Button>
            </div>
            {!useTemplate &&
                <ResumeUploadForm
                    userId={userId}
                    goToResume={true}
                />
            }
            {useTemplate &&
                <ResumeTemplates userId={userId} />
            }
        </>
    );
}

export default NewResumeForm;
