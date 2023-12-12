import React, { useState } from 'react';
import { ResumeUploadForm } from './ui/ResumeUploadForm';
import ResumeTemplates from './Template';
import { LoadingComponent } from './ui/LoadingComponent';
import { PDFViewer } from './ui/PDFViewer';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { Button } from '../Button';
import { ResumeClass } from '../../../models/Resume';

type FormFields = {
    input: string;
};

type PDFFile = File | null;

interface ResumeUploadSectionProps {
    userId: string;
    handleSubmit: UseFormHandleSubmit<FormFields, undefined>;
    onSubmit: SubmitHandler<FormFields>;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    resetForm: () => void;
    file: PDFFile;
    errors: FieldErrors<FormFields>;
    loading: boolean;
    numPages: number | null;
    onDocumentLoadSuccess: (pdf: any) => void
    handleTextContent: (textContent: { items: any[] }) => void;
    handleAnnotations: (annotations: any[]) => void;
    handleTemplateSelection: (resume: Partial<ResumeClass>) => void;
}


const NewResumeSection = (
    {
        userId,
        handleSubmit,
        onSubmit,
        onFileChange, 
        resetForm, 
        file, 
        errors, 
        loading, 
        numPages, 
        onDocumentLoadSuccess, 
        handleTextContent, 
        handleAnnotations,
        handleTemplateSelection
    }: ResumeUploadSectionProps) => {

    const [useTemplate, setUserTemplate] = useState(false)

    const toggleUserTemplate = () => {
        setUserTemplate(!useTemplate)
    }

    return (
        <>
            {!loading && (
                <>
                    <div className='flex flex-row space-x-2'>
                        {!useTemplate && <p className='py-2'>Upload your resume, or </p>}
                        <Button
                            onClick={toggleUserTemplate}
                            size="sm"
                            type="button"
                        >
                            {useTemplate ? 'Upload File Instead' : "Use a template"}
                        </Button>
                    </div>
                    {!useTemplate &&
                        <ResumeUploadForm
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            onFileChange={onFileChange}
                            handleCancel={resetForm}
                            file={file}
                            errors={errors}
                        />
                    }
                    {useTemplate &&
                        <ResumeTemplates userId={userId} handleTemplateSelection={handleTemplateSelection} />
                    }
                </>
            )}
            {loading && <LoadingComponent />}
            {file && !loading && (
                <PDFViewer
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    numPages={numPages}
                    handleTextContent={handleTextContent}
                    handleAnnotations={handleAnnotations}
                />
            )}
        </>
    );
}

export default NewResumeSection;
