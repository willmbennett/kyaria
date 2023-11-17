import { Dispatch, SetStateAction } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { ResumeScanDataClass } from '../../models/ResumeScan';
import { createResumeScanAction } from '../../app/resumetest/_action';

type PDFFile = File | null;

interface FormSubmitParams {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setFormHidden: Dispatch<SetStateAction<boolean>>;
    setResumeTest: Dispatch<SetStateAction<ResumeScanDataClass | null>>;
    setFile: Dispatch<SetStateAction<PDFFile>>;
    resumeUploadText: string;
    session: any; // Replace with your session type
}


export const useFileHandler = (setFile: Dispatch<SetStateAction<PDFFile>>): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const { files } = event.target;

        if (files && files[0] && files[0].type === "application/pdf") {
            setFile(files[0]);
        } else {
            alert("Please upload a valid PDF file.");
            event.target.value = "";
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

export async function handleFormSubmit({ setLoading, setFormHidden, setResumeTest, setFile, resumeUploadText, session }: FormSubmitParams): Promise<void> {
    setLoading(true);
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
}
