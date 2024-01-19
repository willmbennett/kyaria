'use client'
import React, { useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { Button } from '../Button';
import { ResumeScanDataClass } from '../../../models/ResumeScan';
import ResumeListMenu from './ui/ResumeMenu';
import { signIn } from "next-auth/react";
import { ResumeUploadForm } from './ui/ResumeUploadForm';
import ResumeDisplay from './ui/ResumeDisplay';
import { LoadingComponent } from './ui/LoadingComponent';
import { PDFViewer } from './ui/PDFViewer';
import { handleFormSubmit, useDocumentLoadSuccess, useFileHandler } from '../../../lib/hooks/resume-test';
import ResumeBuilder from '../resume/ResumeBuilder';
import { sampleResume, testResumeData, transformParsedResume } from '../../resumebuilder/resumetest-helper';
import FeedbackAside from '../landingpage/FeedbackAside';
import { ResumeClass } from '../../../models/Resume';
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth';
import ResumeTemplates from './Template';
import NewResumeSection from './NewResume';
import { createResumeAction, getResumeAction } from '../../board/_action';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

type PDFFile = File | null;

type FormFields = {
    input: string;
};

interface resumeTestProps {
    userId: string,
    resumeScans: ResumeScanDataClass[],
    resumes: ResumeClass[],
    activeSubscription: boolean
}

export default function ResumeTest(
    {
        userId,
        resumeScans,
        resumes,
        activeSubscription
    }: resumeTestProps) {
    const hasResumes = !(resumes.length === 0 && resumeScans.length === 0)
    const [resumeIndex, setResumeIndex] = useState<string | null>(resumes.length > 0 ? resumes[0]._id.toString() : resumeScans.length > 0 ? resumeScans[0]._id.toString() : null);
    const [useResume, setUseResume] = useState(resumes.length > 0 ? true : false)
    const activeResume = useMemo(() => {
        return useResume ? resumes.find(resume => resume._id == resumeIndex) : resumeScans.find(scan => scan._id == resumeIndex);
    }, [resumeIndex, useResume, resumes, resumeScans]);
    const [loading, setLoading] = useState(false)
    const [formHidden, setFormHidden] = useState(hasResumes);
    const [editResume, setEditResume] = useState(false);
    const router = useRouter()
    const { handleSubmit, formState: { errors } } = useForm<FormFields>();

    const [file, setFile] = useState<PDFFile>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [resumeUploadText, setResumeUploadText] = useState('');

    const onFileChange = useFileHandler(setFile);
    const onDocumentLoadSuccess = useDocumentLoadSuccess(setNumPages);

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
        //console.log('resumeUploadText: ', resumeUploadText)
        await handleFormSubmit({
            setLoading,
            setFormHidden,
            setFile,
            setUseResume,
            setResumeIndex,
            resumeUploadText,
            userId,
            router
        });
    };

    const handleTemplateSelection = async (resumeTemplate: Partial<ResumeClass>) => {
        const userResumeWithIds = { fromTemplate: true, ...resumeTemplate, userId: userId }
        console.log('userResumeWithIds', userResumeWithIds)
        const resumeId = await createResumeAction(userResumeWithIds, '/')
        if (resumeId) {
            router.refresh()
            setResumeIndex(resumeId)
            setUseResume(true)
            setFormHidden(true);
        }
    }

    function resetForm() {
        setFormHidden(false);
        setFile(null);
    }

    function toggleEdit() {
        setEditResume(!editResume)
    }

    return (
        <div className={`flex justify-center w-full`}>
            <div className={`py-4 flex flex-col md:flex-row space-x-2 justify-center ${editResume ? 'w-full' : 'w-full lg:w-4/5'}`}>
                {!editResume && hasResumes &&
                    <div className='w-full md:w-1/3 h-screen'>
                        <ResumeListMenu
                            resumeScans={resumeScans}
                            resumes={resumes}
                            resumeIndex={resumeIndex}
                            setResumeIndex={setResumeIndex}
                            setUseResume={setUseResume}
                            toggleEdit={toggleEdit}
                            resetForm={resetForm}
                            setFormHidden={setFormHidden}
                            userId={userId}
                            activeSubscription={activeSubscription}
                        />
                    </div>
                }
                <div className={`items-center flex flex-col text-center ${editResume ? 'w-full' : 'lg:w-2/3'}`}>
                    {!editResume && !formHidden && activeSubscription &&
                        <NewResumeSection
                            userId={userId}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            onFileChange={onFileChange}
                            resetForm={resetForm}
                            file={file}
                            errors={errors}
                            loading={loading}
                            numPages={numPages}
                            onDocumentLoadSuccess={onDocumentLoadSuccess}
                            handleTextContent={handleTextContent}
                            handleAnnotations={handleAnnotations}
                            handleTemplateSelection={handleTemplateSelection}
                        />
                    }
                    {formHidden && activeResume && hasResumes &&
                        <div className='w-full flex flex-col items-center justify-center'>
                            {useResume ?
                                <>
                                    <ResumeBuilder
                                        data={activeResume} // sampleResume
                                        toggleEdit={toggleEdit}
                                        editResume={editResume}
                                        resumeId={activeResume._id.toString()}
                                        userId={userId}
                                        key={activeResume._id.toString()}
                                        activeSubscription={activeSubscription}
                                    />
                                </>
                                :
                                <div key={activeResume._id.toString()} className="w-full">
                                    <ResumeDisplay
                                        resumeTest={activeResume}
                                    />
                                    <ResumeBuilder
                                        data={transformParsedResume(activeResume)}
                                        toggleEdit={toggleEdit}
                                        editResume={editResume}
                                        resumeScanId={activeResume._id.toString()}
                                        userId={userId}
                                        activeSubscription={activeSubscription}
                                    />
                                </div>
                            }
                        </div>
                    }
                </div>
                {!editResume && hasResumes &&
                    <div>
                        <FeedbackAside />
                    </div>
                }
            </div>
        </div >
    );
}

