'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { Button } from '../Button';
import { ResumeScanDataClass } from '../../../models/ResumeScan';
import ResumeListMenu from './ui/ResumeMenu';
import { signIn } from "next-auth/react";
import { ResumeUploadForm } from './ui/ResumeUploadForm';
import ResumeDisplay from './ui/ResumeDisplay';
import { LoadingComponent } from './ui/LoadingComponent';
import { PDFViewer } from './ui/PDFViewer';
import { handleFormSubmit, useDocumentLoadSuccess, useFileHandler } from '../../../lib/hooks/resume-test';
import ResumeBuilder from '../resume/ResumeBuilder';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

type PDFFile = File | null;

type FormFields = {
    input: string;
};

export default function ResumeTest({ session, resumeScans }: { session: any, resumeScans: ResumeScanDataClass[] }) {
    const [resumeTest, setResumeTest] = useState<ResumeScanDataClass | null>(resumeScans[0])
    const [loading, setLoading] = useState(false)
    const [formHidden, setFormHidden] = useState(false);
    const [editResume, setEditResume] = useState(resumeTest ? true : false);
    const { handleSubmit, formState: { errors } } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async () => {
        await handleFormSubmit({
            setLoading, setFormHidden, setResumeTest, setFile, resumeUploadText, session
        });
    };

    const [file, setFile] = useState<PDFFile>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [resumeUploadText, setResumeUploadText] = useState('');

    const onFileChange = useFileHandler(setFile);
    const onDocumentLoadSuccess = useDocumentLoadSuccess(setNumPages);

    function handleTextContent(textContent: { items: any[]; }) {
        const strings = textContent.items.map(item => item.str);
        const fullText = strings.join(' ');
        //console.log(fullText);  // This logs the entire text content of the PDF page
        setResumeUploadText(fullText)
    }

    function resetForm() {
        setFormHidden(false);
        setResumeTest(null);
        setFile(null);
    }

    function toggleEdit() {
        setEditResume(!editResume)
    }

    return (
        <div className='py-4 flex flex-col lg:flex-row w-full justify-center'>
            {!editResume &&
                <div>
                    <ResumeListMenu
                        resumeScans={resumeScans}
                        setResumeTest={setResumeTest}
                        resumeTest={resumeTest}
                        setFormHidden={setFormHidden} />
                </div>
            }
            <div className={`py-4 items-center flex flex-col text-center ${editResume ? 'w-full' : 'lg:w-3/4'}`}>
                {!editResume && <>
                    <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                        Test your resume with ATS
                    </h1>
                    {!session?.user?.id && (
                        <Button onClick={() => signIn()}>Sign in to test your resume</Button>
                    )}

                    {file && (
                        <PDFViewer
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            numPages={numPages}
                            handleTextContent={handleTextContent}
                        />
                    )}

                    {!formHidden && session?.user?.id && (
                        <ResumeUploadForm
                            onSubmit={handleSubmit(onSubmit)}
                            onFileChange={onFileChange}
                            file={file}
                            errors={errors}
                        />
                    )}
                    {loading && <LoadingComponent />}
                </>}
                {resumeTest && (<>
                    <Button onClick={toggleEdit}>{editResume ? 'Switch Resume' : 'Edit Resume'}</Button>
                    {!editResume &&
                        <ResumeDisplay
                            resumeTest={resumeTest}
                            session={session}
                            resetForm={resetForm}
                        />
                    }
                    {editResume &&
                        <ResumeBuilder
                            education={resumeTest.Education?.EducationDetails}
                            experience={resumeTest.EmploymentHistory?.Positions}
                            skills={resumeTest.Skills}
                            professionalSummary={resumeTest.ProfessionalSummary}
                            objective={resumeTest.Objective}
                            hobbies={resumeTest.Hobbies}
                            patents={resumeTest.Patents}
                            publications={resumeTest.Publications}
                            speakingEngagements={resumeTest.SpeakingEngagements}
                            name={resumeTest.ContactInformation?.CandidateName?.FormattedName}
                            telephone={resumeTest.ContactInformation?.Telephones?.[0]?.Raw}
                            emailAddress={resumeTest.ContactInformation?.EmailAddresses?.[0]}
                            location={
                                `${resumeTest.ContactInformation?.Location?.Municipality}, ` +
                                `${resumeTest.ContactInformation?.Location?.Regions?.join(', ')}`
                            }
                        // Pass other resume sections as needed
                        />

                    }
                </>
                )}
            </div>
        </div>
    );
}

