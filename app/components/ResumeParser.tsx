'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { pdfjs, Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Button } from './Button';
import { createProfileAction } from '../profile/_action';
import { usePathname, useRouter } from "next/navigation";
import { transformParsedResume, demoJSON } from '../profile/profile-helper';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

type PDFFile = string | File | null;

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function ResumeParser(
    {
        setOnboardingStage,
        userId
    }: {
        setOnboardingStage: any,
        userId: string
    }) {

    const router = useRouter()
    const currentPath = usePathname()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();


    // Save the user's profile
    const saveProfile = async (addUserId: any, path: string) => {
        await createProfileAction(addUserId, path);
        setOnboardingStage('questionnaire')
        setLoading(false)
        router.push(currentPath)
    };

    const onSubmit: SubmitHandler<FormFields> = async () => {

        if (['development'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '')) {

            const addUserId = { ...demoJSON, userId: userId }
            //console.log(addUserId)
            const path = "/"
            //console.log('about to create profile')
            saveProfile(addUserId, path)
        } else {

            setLoading(true)

            const response = await fetch('/api/sovren', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: resumeUploadText })
            });

            const { parsedResume } = await response.json();
            //console.log(parsedResume)
            const transformedResume = transformParsedResume(parsedResume)
            //console.log(transformedResume)
            const addUserId = { ...transformedResume, userId: userId }
            //console.log(profile)
            const path = "/"
            //console.log('about to create profile')
            saveProfile(addUserId, path)
        }
    };

    const [file, setFile] = useState<PDFFile>();
    const [numPages, setNumPages] = useState<number>();
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

    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 mb-8">Welcome!</h1>
            <div className='flex-col items-center'>
                {!loading && (<>
                    <div className='w-full flex flex-col text-center'>
                        <p className="mb-4 text-sm text-base text-neutral-600 w-full max-w-screen">
                            Upload your resume to get started (pdf only).
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full">
                            <p className='py-2'>
                                <input
                                    {...register('input', { required: true })}
                                    onChange={onFileChange}
                                    type="file"
                                    accept=".pdf"
                                />
                                {errors.input && <p>Please fix your uploaded file</p>}
                            </p>
                        </div>
                        {file && (<>
                            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} onGetTextSuccess={handleTextContent} />
                                ))}
                            </Document>
                            <div className={BASIC_FIELD_STYLE}>
                                <Button
                                    variant="solid"
                                    size="md"
                                    type="submit"
                                    className="mt-3"
                                >
                                    Submit
                                </Button>
                            </div>
                        </>)}
                    </form>
                </>)}
                {loading && (<div className='flex-col items-center'>
                    <p className="mb-4 text-sm text-base text-neutral-600 w-full max-w-screen">
                        Loading...
                    </p>
                    <iframe src="https://giphy.com/embed/gJ3mEToTDJn3LT6kCT" className="giphy-embed w-full"></iframe>
                </div>)}
            </div>

        </div>
    );
}

