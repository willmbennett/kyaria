import { Dispatch, SetStateAction } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { createResumeScanAction } from '../../app/resumebuilder/_action';
import { convertFormDataToResumeModel, demoResume, ResumeBuilderFormData, sectionOptions, testResumeData, transformParsedResume } from '../../app/resumebuilder/resumetest-helper';
import { createResumeAction, updateResumeAction } from '../../app/resumebuilder/_action';
import { ResumeClass } from '../../models/Resume';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { debounce, isEqual } from 'lodash';
import { useRouter } from 'next/navigation';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
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

export async function handleFormSubmit(
    {
        setLoading,
        setFormHidden,
        setFile,
        setUseResume,
        setResumeIndex,
        resumeUploadText,
        userId,
        router
    }: FormSubmitParams
): Promise<void> {
    setLoading(true);
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
        //console.log(userId)

        if (userId) {
            //console.log('1)  Made it to Resume Scan creation')
            const path = '/'
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
                    router.refresh()
                    setUseResume(true)
                    setResumeIndex(resumeId)
                    setFile(null);
                    setLoading(false)
                    setFormHidden(true);
                }
            }
        }
    }
}


type UseDragAndDropProps = {
    watch: UseFormWatch<ResumeBuilderFormData>
    setValue: UseFormSetValue<ResumeBuilderFormData>
};

export const useDragAndDrop = ({ watch, setValue }: UseDragAndDropProps) => {
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (over && active.id !== over.id) {
            const currentSectionOrder = watch('sectionOrder');
            const updateSections = (sections: sectionOptions[]): sectionOptions[] => {
                const oldIndex = sections.indexOf(active.id as sectionOptions);
                const newIndex = sections.indexOf(over.id as sectionOptions);
                return arrayMove(sections, oldIndex, newIndex);
            };

            const newSectionOrder = updateSections(currentSectionOrder);
            setValue('sectionOrder', newSectionOrder);
        }
    }, [watch, setValue]);

    return handleDragEnd;
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

export const useCopyResume = (data: ResumeClass, userId: string) => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handleCopy = useCallback(async () => {
        setLoading(true); // Start loading

        try {
            const resumeCopy: Partial<ResumeClass> = { ...data };

            delete resumeCopy._id;
            delete resumeCopy.createdAt;
            delete resumeCopy.updatedAt;
            delete resumeCopy.userId;

            const userResumeWithIds = { fromTemplate: true, ...resumeCopy, userId };
            const resumeId = await createResumeAction(userResumeWithIds, '/');

            if (resumeId) {
                router.push(`/resumebuilder/${resumeId}`);
            }
        } catch (error) {
            console.error('Error during resume copy:', error);
        } finally {
            setLoading(false); // End loading
        }
    }, [data, userId, router]);

    return { handleCopy, isLoading };
};

