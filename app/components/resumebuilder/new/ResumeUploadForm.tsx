'use client'
import { Button } from "../../Button";
import { FileUploader } from "../ui/FileUploader";
import { FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useState } from "react";
import { useDocumentLoadSuccess, useFileHandler } from "../../../../lib/hooks/resume-test";
import { LoadingComponent } from "../ui/LoadingComponent";
import { createResumeScanAction } from "../../../resumebuilder/_action";
import { transformParsedResume } from "../../../resumebuilder/resumetest-helper";
import { createResumeAction } from "../../../board/_action";
import { useRouter } from "next/navigation";
import { PDFViewer } from "../ui/PDFViewer";
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

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
    const [numPages, setNumPages] = useState<number | null>(null);
    const [resumeUploadText, setResumeUploadText] = useState('');
    const { handleSubmit, formState: { errors } } = useForm<FormFields>();
    const router = useRouter()

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
            console.error('Server responded with status:', response.status);
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
                        setLoading(false)
                        setFile(null);
                        router.push(`/resumebuilder/${resumeId}`)
                    }
                }
            }
        };
    }

    const handleReset = () => {
        setFile(null)
        setResumeUploadText('')
        setNumPages(null)
    }

    return (
        <div className="w-full flex flex-col justify-center space-y-2 bg-slate-100 border border-slate-200 p-4">
            <h1 className="text-center sm:text-3xl text-2xl font-bold text-slate-900 mt-3">
                Upload your resume
            </h1>
            <div className="flex justify-center w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 md:flex-row w-full justify-center items-center">
                    <p>
                        <FileUploader onFileChange={onFileChange} />
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
            <div className="flex justify-center">
                <div className="flex w-full shadow-lg border border-gray-200">
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
                </div>
            </div>
        </div>
    );
}
