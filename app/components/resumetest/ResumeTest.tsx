'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { pdfjs, Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { demoResume, ResumeData } from '../../resumetest/resumetest-helper';
import ContactInformationDisplay from './ContactInfo';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Button } from '../Button';
import Section from './Section';
import ResumeQualityDisplay from './ResumeQuality';
import Overview from './Overview';
import EducationComp from './Eduction';
import EmploymentHistoryComponent from './EmploymentHistoryComponent';
import SkillsComponent from './SkillsComponent';
import NameList from './NameList';

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

export default function ResumeTest() {
    //const [resumeTest, setResumeTest] = useState<ResumeData>(demoResume)
    const [resumeTest, setResumeTest] = useState<ResumeData>()
    const [loading, setLoading] = useState(false)
    const [formHidden, setFormHidden] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async () => {
        setLoading(true)
        setFormHidden(true);

        const response = await fetch('/api/sovren', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: resumeUploadText })
        });

        const { parsedResume } = await response.json();
        setResumeTest(parsedResume)
        setLoading(false)
    };

    const [file, setFile] = useState<PDFFile>();
    const [numPages, setNumPages] = useState<number>();
    const [resumeUploadText, setResumeUploadText] = useState('');

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { files } = event.target;

        if (files && files[0]) {
            const file = files[0];
            const fileType = file.type;

            if (fileType !== "application/pdf") {
                alert("Please upload a valid PDF file.");
                event.target.value = "";  // Clear the file input
                return;
            }


            setFile(file);
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
        <div className='py-4 flex flex-col items-center justify-center text-center w-full'>
            <div className='py-4 items-center flex flex-col justify-center text-center w-full'>
                <div className='w-full flex flex-col text-center'>
                    <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                        Test your resume with ATS
                    </h1>
                    <p className="mb-4 text-sm text-base text-neutral-600 w-full max-w-screen">
                        Upload your resume here (pdf only). We will not store your resume.
                    </p>
                </div>
                {!formHidden && (<>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full">
                            <p className='py-2'>
                                <input
                                    {...register('input', { required: true })}
                                    onChange={onFileChange}
                                    type="file"
                                    accept=".pdf"
                                />
                                {errors.input && <p>Please fix your uploaded file</p>}
                            </p>
                        </div>
                        {file && (<>
                            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} onGetTextSuccess={handleTextContent} />
                                ))}
                            </Document>
                            <div className={BASIC_FIELD_STYLE}>
                                <Button
                                    variant="solid"
                                    size="md"
                                    type="submit"
                                    className="mt-3"
                                >
                                    Submit
                                </Button>
                            </div>
                        </>)}
                    </form>
                </>)}
                {loading && (<div className='flex-col items-center'>
                    <p className="mb-4 text-sm text-base text-neutral-600 w-full max-w-screen">
                        Loading...
                    </p>
                    <iframe src="https://giphy.com/embed/gJ3mEToTDJn3LT6kCT" className="giphy-embed w-full"></iframe>
                </div>)}
                {resumeTest && (
                    <div className='w-full my-3'>
                        <Button onClick={() => {
                            setFormHidden(false);
                            setResumeTest(undefined);
                            setFile(null);
                        }}
                            size='md'
                            className='my-3'
                        >
                            Upload Another Resume
                        </Button>
                        <h2 className="sm:text-4xl text-2xl font-bold text-slate-900 mb-8">
                            Output
                        </h2>
                        {/* Resume Quality Section */}
                        <h3 className="text-2xl font-semibold mb-4">Resume Quality</h3>
                        <Section>
                            <ResumeQualityDisplay data={resumeTest.ResumeMetadata.ResumeQuality} />
                        </Section>

                        {
                            (resumeTest.ProfessionalSummary ||
                                resumeTest.Objective ||
                                resumeTest.CoverLetter ||
                                resumeTest.Hobbies ||
                                resumeTest.Patents ||
                                resumeTest.Publications ||
                                resumeTest.SpeakingEngagements) && (
                                <>
                                    <h3 className="text-2xl font-semibold mb-4">Overview</h3>
                                    <Section>
                                        <Overview
                                            ProfessionalSummary={resumeTest.ProfessionalSummary}
                                            Objective={resumeTest.Objective}
                                            CoverLetter={resumeTest.CoverLetter}
                                            Hobbies={resumeTest.Hobbies}
                                            Patents={resumeTest.Patents}
                                            Publications={resumeTest.Publications}
                                            SpeakingEngagements={resumeTest.SpeakingEngagements}
                                        />
                                    </Section>
                                </>
                            )
                        }

                        {/* Contact Info Section */}
                        {resumeTest.ContactInformation && (<>
                            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                            <Section>
                                <ContactInformationDisplay data={resumeTest.ContactInformation} />
                            </Section>
                        </>)}

                        {/* Skills Section */}
                        {resumeTest.Skills && (<>
                            <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                            <Section>
                                <SkillsComponent data={resumeTest.Skills} />
                            </Section>
                        </>)}

                        {/* Employment Section */}
                        {resumeTest.EmploymentHistory && (<>
                            <h3 className="text-2xl font-semibold mb-4">Employment</h3>
                            <Section>
                                <EmploymentHistoryComponent data={resumeTest.EmploymentHistory} />
                            </Section>
                        </>)}

                        {/* Eduction Section */}
                        {resumeTest.Education && (<>
                            <h3 className="text-2xl font-semibold mb-4">Education</h3>
                            <Section>
                                <EducationComp data={resumeTest.Education} />
                            </Section>
                        </>)}

                        {/* Certifications Section */}
                        {resumeTest.Certifications && (<>
                            <h3 className="text-2xl font-semibold mb-4">Certifications</h3>
                            <Section>
                                <NameList data={resumeTest.Certifications} title='Certifications' />
                            </Section>
                        </>)}

                        {/* Licenses Section */}
                        {resumeTest.Licenses && (<>
                            <h3 className="text-2xl font-semibold mb-4">Licenses</h3>
                            <Section>
                                <NameList data={resumeTest.Licenses} title='Licenses' />
                            </Section>
                        </>)}
                    </div>
                )}
            </div>
        </div>
    );
}

