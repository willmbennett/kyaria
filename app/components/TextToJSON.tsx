'use client'
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useChat, type Message } from 'ai/react'
import { pdfjs, Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Button } from './Button';
import { createProfileAction } from '../profile/_action';
import { usePathname, useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

type PDFFile = string | File | null;

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function TextToJSON(
    {
        expectedJson,
        defaultTextInput,
        demoJSON,
        setOnboardingStage,
        userId
    }: {
        expectedJson: any,
        defaultTextInput?: string,
        demoJSON?: any,
        setOnboardingStage: any,
        userId: string
    }) {

    const router = useRouter()
    const currentPath = usePathname()
    const [loading, setLoading] = useState(false)
    const [finishedLoading, setFinishedLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        defaultValues: { input: defaultTextInput ? defaultTextInput : '' } // Leave blank
    });

    const initialMessage: Message[] = [
        {
            "id": "1",
            "role": "system",
            "content": `You will be provided with unstructured data, and your task is to extract data from it. Return the data in the following format: ${JSON.stringify(expectedJson)}. If fields are empty simply return them as such.`
        }
    ]

    const { messages, append } = useChat({
        body: {
            temp: 0.1
        },
        onFinish() {
            setFinishedLoading(true)
        },
        initialMessages: initialMessage
    });

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            const finalMessage = ['', ''].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '') ? demoJSON : JSON.parse(messages[messages.length - 1].content);
            //console.log(finalMessage)
            console.log('Data to be created:')
            console.log(finalMessage)
            const path = "/"
            const addUserId = { ...finalMessage, userId: userId }
            //console.log(profile)
            console.log('about to create profile')
            setLoading(false)
            saveProfile(addUserId, path)
        }
    }, [finishedLoading]);

    // Save the user's profile
    const saveProfile = async (addUserId: any, path: string) => {
        await createProfileAction(addUserId, path);
        setOnboardingStage('questionaire')
        router.push(currentPath, { scroll: true })
    };

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log("Made it to parse text")
        // Ask chatGPT to parse resume text
        setLoading(true)
        append({
            "id": "2",
            "role": "user",
            "content": `${resumeUploadText}`
        });
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
        if (nextNumPages > 1) {
            alert('Please upload a PDF with only one page.');
            setFile(null);  // Reset the uploaded file
            return;
        }
        setNumPages(nextNumPages);
    }

    function handleTextContent(textContent: { items: any[]; }) {
        const strings = textContent.items.map(item => item.str);
        const fullText = strings.join(' ');
        //console.log(fullText);  // This logs the entire text content of the PDF page
        setResumeUploadText(fullText)
    }

    return (
        <div className='flex-col items-center'>
            {!loading && (<>
                <div className='w-full flex flex-col text-center'>
                    <p className="mb-4 text-sm text-base text-neutral-600 w-full max-w-screen">
                        Upload your resume here.
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
    );
}

