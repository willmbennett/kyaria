import { Dispatch, SetStateAction } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { transformParsedResume } from '../../app/resumebuilder/resumetest-helper';
import { createResumeAction } from '../../app/resumebuilder/_action';
import { ResumeClass } from '../../models/Resume';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPDF from '@react-pdf/renderer';
import ResumePDF from '../../app/components/resumebuilder/pdfviewer/ResumePDF';

type PDFFile = File | null;

interface FormSubmitParams {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setFormHidden: Dispatch<SetStateAction<boolean>>;
    setUseResume: Dispatch<SetStateAction<boolean>>;
    setResumeIndex: Dispatch<SetStateAction<string | null>>;
    setFile: Dispatch<SetStateAction<PDFFile>>;
    resumeUploadText: string;
    router: AppRouterInstance;
    userId: string | null; // Replace with your session type
}

export const useFileHandler = (
    setFile: Dispatch<SetStateAction<File | null>>,
    setBase64File: Dispatch<SetStateAction<string | null>>
): ((event: React.ChangeEvent<HTMLInputElement> | FileList) => void) => {
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement> | FileList): void => {
        // Determine if the event is from input change or file drop
        const files = event instanceof FileList ? event : event.target.files;

        if (files && files[0] && files[0].type === "application/pdf") {
            setFile(files[0]); // Set the file object

            // Read and encode the file as base64
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                const base64String = reader.result as string;
                setBase64File(base64String.split(',')[1]); // Set only the base64 part
            };
            reader.onerror = error => {
                console.error('Error reading file:', error);
                setBase64File(null);
            };
        } else {
            alert("Please upload a valid PDF file.");
            // For input event, reset the input value
            if (!(event instanceof FileList) && event.target) {
                event.target.value = ""; // Reset input for traditional file input
            }
            setFile(null);
            setBase64File(null);
        }
    };

    return onFileChange;
};

export const useDocumentLoadSuccess = (setNumPages: Dispatch<SetStateAction<number | null>>): ((pdf: PDFDocumentProxy) => void) => {
    const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy): void => {

        setNumPages(nextNumPages);
    };

    return onDocumentLoadSuccess;
};

export const useGeneratePDF = ({ data }: { data: ResumeClass }) => {
    const generatePDF = useCallback(async () => {
        const name = data.name?.replace(/\s/g, '_') || ''
        const blob = await ReactPDF.pdf(
            <ResumePDF data={data} />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}_Resume.pdf`;
        link.click();
    }, [data]);

    return generatePDF;
};
