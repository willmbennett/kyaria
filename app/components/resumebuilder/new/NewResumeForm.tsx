'use client'
import React, { useState } from 'react';
import { ResumeUploadForm } from './ResumeUploadForm';
import { Button } from '../../Button';
import { Container } from '../../landingpage/Container';
import ResumeTemplates from './Template';

const NewResumeForm = ({ userId }: { userId: string }) => {

    const [useTemplate, setUserTemplate] = useState(false)

    const toggleUserTemplate = () => {
        setUserTemplate(!useTemplate)
    }

    return (
        <section className="flex flex-col lg:flex-row overflow-hidden pt-5 w-full  pb-14">
            <Container>
                <div className="mx-auto max-w-lg pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-xl xl:pb-14">
                    <div className='flex pb-3'>
                        <Button size='sm' variant='ghost' href="/resumebuilder">← Back to Resumes</Button>
                    </div>
                    <h1 className="pb-10 text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-6xl xl:leading-tighter">
                        Create a new resume
                    </h1>
                    <p className="pb-3 ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg">
                        Either scan your resume or select one of our pre-existing templates.
                    </p>
                    <div className='flex flex-row space-x-2 justify-center'>
                        {!useTemplate && <p className='py-2'>Upload your resume, or </p>}
                        <Button
                            onClick={toggleUserTemplate}
                            size="sm"
                            type="button"
                        >
                            {useTemplate ? 'Upload File Instead' : "Use a template"}
                        </Button>
                    </div>
                </div>
            </Container>

            <div className="w-full lg:w-1/2 h-full px-4">
                <div className='flex flex-col space-y-2'>
                    {!useTemplate &&
                        <ResumeUploadForm
                            userId={userId}
                        />
                    }
                    {useTemplate &&
                        <ResumeTemplates userId={userId} />
                    }
                </div>
            </div>
        </section>
    );
}

export default NewResumeForm;
