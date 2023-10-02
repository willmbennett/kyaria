'use client'
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useChat } from 'ai/react';
import { pdfjs, Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

import type { PDFDocumentProxy } from 'pdfjs-dist';

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
        setValues,
        expectedJson,
        defaultTextInput,
        demoJSON,
        inputTextType,
        setFormView,
        setInputTextView,
    }: {
        setValues: any,
        expectedJson: any,
        defaultTextInput?: string,
        demoJSON?: any,
        inputTextType: string,
        setFormView?: any,
        setInputTextView?: any
    }) {
    const [loading, setLoading] = useState(false)
    const [finishedLoading, setFinishedLoading] = useState(false)
    const { register, handleSubmit, control } = useForm<FormFields>({
        defaultValues: { input: defaultTextInput ? defaultTextInput : '' } // Leave blank
    });

    const { messages, reload, append } = useChat({
        body: {
            temp: 0.1
        },
        onFinish() {
            setFinishedLoading(true)
        }
    });

    // Make a call to chatGPT
    const chatGPT = async (message: any) => {
        //console.log("1")
        setLoading(true)
        if (['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '')) {
            //console.log("2")
            setFinishedLoading(true)
        } else {
            //console.log("3")
            append(message);
        }
    };

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            const finalMessage = ['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '') ? demoJSON : JSON.parse(messages[messages.length - 1].content);
            //console.log(finalMessage)
            setValues(finalMessage)
            setInputTextView(false) // hide the text input
            setFormView(true) // Show the form
            setLoading(false)

        }
    }, [finishedLoading]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const message = [
            {
                "role": "system",
                "content": `You will be provided with unstructured data, and your task is to extract data from it. Return the data in the following format: ${JSON.stringify(expectedJson)}. If fields are empy simply return them as such.`
            },
            {
                "role": "user",
                "content": `Extract the ${inputTextType} details from this ${resumeUploadText} text and return it in json format following this format: ${JSON.stringify(expectedJson)}`
            }
        ]
        console.log(message)
        chatGPT(message)
    };

    const [file, setFile] = useState<PDFFile>();
    const [numPages, setNumPages] = useState<number>();
    const [resumeUploadText, setResumeUploadText] = useState('');

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { files } = event.target;

        if (files && files[0]) {
            setFile(files[0] || null);
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
        <>
            <div className='flex-col items-center'>
                {!loading && !finishedLoading && (<>
                    <div className='w-full flex flex-col text-center'>
                        <p className="mb-4 text-sm text-base text-neutral-600 w-full max-w-screen">
                            Upload your resume here. We use AI to scan your text.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full">
                            <label className="bg-white text-dartmouth-green py-2 px-4 cursor-pointer hover:bg-green-100">
                                Upload File
                                <input
                                    className="opacity-0"
                                    onChange={onFileChange}
                                    type="file"
                                />
                            </label>
                        </div>
                        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} onGetTextSuccess={handleTextContent} />
                            ))}
                        </Document>
                        <div className={BASIC_FIELD_STYLE}>
                            <button
                                className="inline-block bg-dartmouth-green rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                disabled={loading}
                                type="submit">Submit</button>
                        </div>
                        {loading && (
                            <div>
                                <p>Insert Pretty Loading GIF Here</p>
                            </div>
                        )}
                    </form>
                </>)}
                {loading && (<div className='flex-col items-center'>
                    <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                        AI is scanning your data
                    </h1>
                    <div className='p-2'>
                        <p>This may take a minute</p>
                    </div>
                    <iframe src="https://giphy.com/embed/gJ3mEToTDJn3LT6kCT" className="giphy-embed w-full"></iframe>
                </div>)}
            </div>
        </>
    );
}
