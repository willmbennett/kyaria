'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Button } from '../Button';
import { createResumeScanAction } from '../../resumetest/_action';
import { ResumeScanDataClass } from '../../../models/ResumeScan';
import ResumeListMenu from './ui/ResumeMenu';
import { signIn } from "next-auth/react";
import { ResumeUploadForm } from './ui/ResumeUploadForm';
import ResumeDisplay from './ui/ResumeDisplay';
import { LoadingComponent } from './ui/LoadingComponent';
import { PDFViewer } from './ui/PDFViewer';

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
    const { handleSubmit, formState: { errors } } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async () => {
        setLoading(true)
        setFormHidden(true);
        //console.log('Resume Text')
        //console.log(resumeUploadText)

        const response = await fetch('/api/sovren', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: resumeUploadText })
        });

        if (!response.ok) {
            // If the response is not ok, print the status and throw an error
            //console.error('Server responded with status:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const { parsedResume } = await response.json();
            //console.log('Parsed Resume');
            //console.log(parsedResume);

            setResumeTest(parsedResume)
            setFile(null);
            setLoading(false)

            if (session?.user?.id) {
                const path = '/'
                const dataToSave = { ...parsedResume, userId: session.user.id }
                const resumeScanId = await createResumeScanAction(dataToSave, path)
                //console.log(resumeScanId)
            }
        }
    };

    const [file, setFile] = useState<PDFFile>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [resumeUploadText, setResumeUploadText] = useState('');

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { files } = event.target;

        if (files && files[0]) {
            const file = files[0];
            const fileType = file.type;

            if (fileType !== "application/pdf") {
                alert("Please upload a valid PDF file.");
                event.target.value = "";  // Clear the file input
                return;
            }
            setFile(file);
        }
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

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

    return (
        <div className='py-4 flex flex-col lg:flex-row w-full justify-center'>
            <div>
                <ResumeListMenu
                    resumeScans={resumeScans}
                    setResumeTest={setResumeTest}
                    resumeTest={resumeTest}
                    setFormHidden={setFormHidden} />
            </div>
            <div className='py-4 items-center flex flex-col text-center lg:w-3/4'>
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
                {resumeTest && (
                    <ResumeDisplay
                        resumeTest={resumeTest}
                        session={session}
                        resetForm={resetForm}
                    />
                )}
            </div>
        </div>
    );
}

