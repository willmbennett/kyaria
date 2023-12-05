import { Dispatch, SetStateAction } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { ResumeScanDataClass } from '../../models/ResumeScan';
import { createResumeScanAction } from '../../app/resumebuilder/_action';
import { demoResume, testResumeData, transformParsedResume } from '../../app/resumebuilder/resumetest-helper';
import { createResumeAction, getResumeAction } from '../../app/board/_action';
import { ResumeClass } from '../../models/Resume';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Session } from 'next-auth';

type PDFFile = File | null;

interface FormSubmitParams {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setFormHidden: Dispatch<SetStateAction<boolean>>;
    setResumeTest: Dispatch<SetStateAction<ResumeScanDataClass | null>>;
    setResume: Dispatch<SetStateAction<ResumeClass | null>>;
    setUseResume: Dispatch<SetStateAction<boolean>>;
    setFile: Dispatch<SetStateAction<PDFFile>>;
    resumeUploadText: string;
    router: AppRouterInstance;
    session: Session | null; // Replace with your session type
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

export async function handleFormSubmit(
    {
        setLoading,
        setFormHidden,
        setResumeTest,
        setFile,
        setResume,
        setUseResume,
        resumeUploadText,
        session,
        router
    }: FormSubmitParams
): Promise<void> {
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

        //const parsedResume: Partial<ResumeScanDataClass> = testResumeData
        //console.log('Parsed Resume');
        //console.log(parsedResume);

        const userId = session?.user?.id
        //console.log(userId)

        if (session?.user?.id) {
            //console.log('1)  Made it to Resume Scan creation')
            const path = '/'
            const userId = session.user.id
            const dataToSave = { ...parsedResume, userId }
            const resumeScanId = await createResumeScanAction(dataToSave, path)
            //console.log('Created resume scan', resumeScanId)
            if (resumeScanId) {
                //console.log('2)  Made it to Resume creation')
                const resumeToCreate = transformParsedResume(parsedResume)
                delete resumeToCreate._id
                const userResumeWithIds = { resumeScan: resumeScanId, ...resumeToCreate, userId: userId }
                const resumeId = await createResumeAction(userResumeWithIds, '/')
                if (resumeId) {
                    //console.log('2)  Made it to Resume fetching')
                    const { resume, resumeScan } = await getResumeAction(resumeId, '/')
                    if (resume && resumeScan) {
                        setResume(resume)
                        setUseResume(true)
                        //console.log(resumeId)
                        setResumeTest(resumeScan)
                        setFile(null);
                        setLoading(false)
                        router.push("/resumebuilder")
                    }
                }
            }

        }
    }
}
