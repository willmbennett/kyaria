'use client'
import React, { useState } from 'react';
import { ResumeUploadForm } from './ResumeUploadForm';
import { Button } from '../../Button';
import ResumeTemplateForm from './ResumeTemplateForm';

const NewResumeForm = ({ userId }: { userId: string }) => {

    const [useTemplate, setUserTemplate] = useState(false)

    const toggleUserTemplate = () => {
        setUserTemplate(!useTemplate)
    }

    return (
        <>
            <Button size='sm' variant='ghost' href="/resumebuilder">← Back to Resumes</Button>
            {
                false &&
                <>
                    <div className='flex flex-row space-x-2'>
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
                        />
                    }
                    {useTemplate &&
                        <ResumeTemplateForm userId={userId} />
                    }
                </>
            }
            < ResumeTemplateForm userId={userId} />
        </>
    );
}

export default NewResumeForm;
