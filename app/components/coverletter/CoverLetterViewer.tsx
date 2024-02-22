'use client'
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useGeneratePDF, useCopyResume } from '../../../lib/hooks/resume-test';
import { ResumeClass } from '../../../models/Resume';
import { Button } from '../Button';
import SaveStatusIndicator from '../resumebuilder/SaveStatusIndicator';
import ResumeLoadingComponent from '../resumebuilder/pdfviewer/ResumeLoadingComponent';
import ResumePDF from '../resumebuilder/pdfviewer/ResumePDF';
import { JobClass } from '../../../models/Job';
import { CoverLetterPDF } from '../apps/CoverLetterPDF';

interface ResumePDFProps {
    userResume: Partial<ResumeClass>;
    job: Partial<JobClass>;
    currentCoverLetter: string;
}

const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = url


export const CoverLetterViewer = (
    {
        userResume,
        job,
        currentCoverLetter
    }: ResumePDFProps
) => {
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
    const [newPdfUrl, setNewPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);


    const generatePDF = useCallback(async () => {
        setLoading(true);
        //console.log('Starting PDF generation');
        try {
            const blob = await ReactPDF.pdf(
                <CoverLetterPDF
                    name={userResume.name}
                    phone={userResume.phone}
                    email={userResume.email}
                    address={userResume.location}
                    company={job.company}
                    companyLocation={job.location}
                    bodyText={currentCoverLetter}
                />).toBlob();
            const newUrl = URL.createObjectURL(blob);
            //console.log('PDF generated, new URL:', newUrl);
            if (!currentPdfUrl) {
                setCurrentPdfUrl(newUrl)
                setFirstLoad(false)
            }
            setNewPdfUrl(newUrl)
        } catch (error) {
            //console.error('Error generating PDF:', error);
            setLoading(false);
        }
    }, [userResume, job, currentCoverLetter]);

    const debouncedGeneratePDF = useCallback(debounce(generatePDF, 1000), [generatePDF]);


    useEffect(() => {
        //console.log('Effect triggered to generate PDF');
        debouncedGeneratePDF();
        return () => {
            // Clean up the last used URLs
            if (currentPdfUrl) {
                URL.revokeObjectURL(currentPdfUrl);
            }
            if (newPdfUrl) {
                URL.revokeObjectURL(newPdfUrl);
            }
        };
    }, [debouncedGeneratePDF]);

    const handleDocumentLoad = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    }


    const handleLoadSuccess = () => {
        setLoading(false);
        const oldUrl = currentPdfUrl
        setCurrentPdfUrl(newPdfUrl)
        if (oldUrl) URL.revokeObjectURL(oldUrl);
    };

    function changePage(offset: number) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <div className='flex h-full flex-col justify-center w-full lg:w-[62vh]'>
            <div className={`pb-3 flex w-full items-center flex-row ${numPages > 1 ? 'justify-between' : 'justify-center'}`}>
                {numPages > 1 && <Button
                    size='sm'
                    type="button"
                    variant={pageNumber <= 1 ? 'secondary' : 'solid'}
                    disabled={pageNumber <= 1}
                    onClick={previousPage}>
                    Previous
                </Button>}
                <div className='flex flex-row  justify-center items-center space-x-2'>
                    {numPages > 1 && <p>Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</p>}
                </div>
                {numPages > 1 && <Button
                    type="button"
                    size='sm'
                    variant={pageNumber >= numPages ? 'secondary' : 'solid'}
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Next
                </Button>}
            </div>
            <div className='flex h-full bg-white shadow-lg border border-gray-200 w-full'>
                <div className={`flex w-full h-full justify-center overflow-x-auto ${loading ? 'block' : 'hidden'}`}>
                    {!currentPdfUrl && <ResumeLoadingComponent />}
                    {currentPdfUrl && !firstLoad && (
                        <Document className={'flex w-full h-full justify-center'} loading={<></>} file={currentPdfUrl}>
                            <Page loading={<></>} pageNumber={pageNumber} />
                        </Document>
                    )}
                </div>
                <div className={`flex w-full justify-center overflow-x-auto ${loading ? 'hidden' : 'block'}`}>
                    {newPdfUrl && (
                        <Document className={'flex w-full h-full justify-center'} onLoadSuccess={handleDocumentLoad} loading={<></>} file={newPdfUrl}>
                            <Page onRenderSuccess={handleLoadSuccess} loading={<></>} pageNumber={pageNumber} />
                        </Document>
                    )}
                </div>
            </div>
        </div >

    );
}
