'use client'
import { Button } from "../../Button";
import { FileUploader } from "./FileUploader";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useFileHandler } from "../../../../lib/hooks/resume-test";
import { useRouter } from "next/navigation";
import { PDFViewer } from "../pdfviewer/PDFViewer";
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import useSubmitResume from "../../../../lib/hooks/use-create-resume";
import { IconSpinner } from "../../ui/icons";

type FormFields = {
    input: string;
};

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PDFFile = File | null;

interface ResumeUploadFormProps {
    userId: string;
    goToResume?: boolean;
    autoSubmit?: boolean;
}

export const ResumeUploadForm = ({ userId, goToResume = false, autoSubmit = false }: ResumeUploadFormProps) => {
    const [file, setFile] = useState<PDFFile>(null);
    const [base64File, setBase64File] = useState<string | null>(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const [numPages, setNumPages] = useState<number | null>(null);
    const { handleSubmit, formState: { errors } } = useForm<FormFields>();
    const router = useRouter()

    const onFileChange = useFileHandler(setFile, setBase64File);
    const onDocumentLoadSuccess = (pdf: DocumentCallback): void => {
        setNumPages(pdf.numPages);
    };

    const { isLoading, handleResumeCreation } = useSubmitResume({
        onError: (error) => {
            console.error('Resume creation failed:', error);
            alert('Failed to upload resume. Please try again.');
            handleReset()
        },
        onSuccess: async (resumeId) => {
            //console.log('Resume successfully created with ID:', resumeId);
            // Await the completion of the navigation
            if (goToResume) {
                router.push(`/resumebuilder/${resumeId}`);
            } else {
                router.refresh();
            }
            // Any state updates that should occur after navigation completes can go here
        },
    });

    const onSubmit = async () => {
        if (!base64File || !userId) {
            alert('Please select a file and ensure user ID is set.');
            return;
        }
        await handleResumeCreation(base64File, userId);
    };


    const handleReset = () => {
        setFile(null);
        setBase64File(null)
        setNumPages(null);
        setFileInputKey(Date.now()); // Reset the key to force re-render of the file input
    };

    useEffect(() => {
        // Auto-submit logic
        const handleAutoSubmit = async () => {
            if (base64File && userId && !errors.input && autoSubmit) {
                await handleResumeCreation(base64File, userId);
            }
        };

        handleAutoSubmit();
    }, [base64File, userId, autoSubmit, errors]); // This useEffect will run every time base64File or userId changes



    return (
        <div className="w-full flex flex-col justify-center space-y-2">
            <div className="flex justify-center w-full">
                {!isLoading &&
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 md:flex-row w-full justify-center items-center">
                        {!file && <FileUploader key={fileInputKey} onFileChange={onFileChange} />}
                        {errors.input && <p>{errors.input.message}</p>}
                        {(file && !autoSubmit) && (
                            <div className="flex flex-col gap-4 justify-center">
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
                                <div className="bg-white shadow-lg border border-gray-200">
                                    <PDFViewer
                                        file={file}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        numPages={numPages}
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                }
                {isLoading &&
                    <div className="flex gap-2 items-center">
                        <p>Creating your resume</p>
                        <IconSpinner />
                    </div>
                }
            </div >
        </div >
    );
}
