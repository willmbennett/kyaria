'use client'
import { Button } from "../../Button";
import { FileUploader } from "./FileUploader";
import { SubmitHandler, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useState } from "react";
import { useFileHandler } from "../../../../lib/hooks/resume-test";
import { LoadingComponent } from "./LoadingComponent";
import { createResumeScanAction } from "../../../resumebuilder/_action";
import { transformParsedResume } from "../../../resumebuilder/resumetest-helper";
import { createResumeAction } from "../../../board/_action";
import { useRouter } from "next/navigation";
import { PDFViewer } from "../pdfviewer/PDFViewer";
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import type { PDFDocumentProxy } from 'pdfjs-dist';

type FormFields = {
    input: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

type PDFFile = File | null;

export const ResumeUploadForm = ({ userId }: { userId: string }) => {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<PDFFile>(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const [numPages, setNumPages] = useState<number | null>(null);
    const [resumeUploadText, setResumeUploadText] = useState('');
    const { handleSubmit, formState: { errors } } = useForm<FormFields>();
    const router = useRouter()

    const onFileChange = useFileHandler(setFile);
    const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy): void => {

        setNumPages(nextNumPages);
    };

    function handleTextContent(textContent: { items: any[]; }) {
        const strings = textContent.items.map(item => item.str);
        const fullText = strings.join(' ');
        //console.log('fullText: ', fullText);  // This logs the entire text content of the PDF page
        //console.log('resumeUploadText: ', resumeUploadText);  // This logs the entire text content of the PDF page
        setResumeUploadText(resumeUploadText + ' ' + fullText)
    }

    function handleAnnotations(annotations: any[]) {
        const links = annotations.map(item => item.url);
        const LinkText = links.join(' ');
        //console.log(LinkText)
        //console.log('LinkText: ', LinkText);  // This logs the entire text content of the PDF page
        //console.log('resumeUploadText: ', resumeUploadText);  // This logs the entire text content of the PDF page
        setResumeUploadText(LinkText + ' ' + resumeUploadText)
    }

    const onSubmit: SubmitHandler<FormFields> = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/sovren', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: resumeUploadText })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { parsedResume } = await response.json();
            //console.log('Parsed Resume', parsedResume);

            if (userId) {
                const path = '/';
                const dataToSave = { ...parsedResume, userId };
                //console.log('1111111111111111111111111111')
                const resumeScanId = await createResumeScanAction(dataToSave, path);
                //console.log('2222222222222222222222222222')
                //console.log('resumeScanId: ', resumeScanId)
                if (!resumeScanId) {
                    throw new Error("Failed to create resume scan");
                }
                console.log('Created resume scan', resumeScanId);

                const resumeToCreate = transformParsedResume(parsedResume);
                delete resumeToCreate._id;
                const userResumeWithIds = { resumeScan: resumeScanId, ...resumeToCreate, userId };

                const resumeId = await createResumeAction(userResumeWithIds, '/');
                if (!resumeId) {
                    throw new Error("Failed to create resume");
                }
                //console.log('resumeId: ', resumeId);

                router.push(`/resumebuilder/${resumeId}`);
            }
        } catch (error) {
            console.error('Error in resume upload:', error);
        } finally {
            //console.log('made it to finally')
            setLoading(false);
            setFile(null);
        }
    };


    const handleReset = () => {
        setFile(null);
        setResumeUploadText('');
        setNumPages(null);
        setFileInputKey(Date.now()); // Reset the key to force re-render of the file input
    };


    return (
        <div className="w-full flex flex-col justify-center space-y-2">
            <h1 className="text-center sm:text-3xl text-2xl font-bold text-slate-900 mt-3">
                Upload your resume
            </h1>
            <div className="flex justify-center w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 md:flex-row w-full justify-center items-center">
                    <p>
                        <FileUploader key={fileInputKey} onFileChange={onFileChange} />
                        {errors.input && <p>{errors.input.message}</p>}

                    </p>
                    {file && (
                        <div className="space-x-2">
                            <Button
                                variant="ghost"
                                size="md"
                                type="button"
                                onClick={handleReset}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                size="md"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    )}
                </form>
            </div>
            {file &&
                <div className="flex justify-center">
                    <div className="bg-white shadow-lg border border-gray-200">
                        {loading && <LoadingComponent />}
                        {!loading && (
                            <PDFViewer
                                file={file}
                                onLoadSuccess={onDocumentLoadSuccess}
                                numPages={numPages}
                                handleTextContent={handleTextContent}
                                handleAnnotations={handleAnnotations}
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    );
}
