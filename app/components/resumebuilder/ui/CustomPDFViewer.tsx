'use client'
import ReactPDF, { pdf } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import ResumePDF from "../../resume/ResumePDF";
import { ResumeBuilderFormData } from "../../../resumebuilder/resumetest-helper";
import ResumeLoadingComponent from '../../resume/ResumeLoadingComponent';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce, isEqual } from 'lodash';
import { pdfstyles } from '../../resume/styles';
import { Button } from '../../Button';
import { useGeneratePDF } from '../../../../lib/hooks/resume-test';
import SaveStatusIndicator from '../../resume/SaveStatusIndicator';
import { ResumeClass } from '../../../../models/Resume';

interface ResumePDFProps {
    data: ResumeClass;
    saveStatus?: "error" | "saving" | "up to date";
    useEdit?: boolean;
}

type pdfUrlTye = {
    current: string | null;
    previous: string | null;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();


const CustomPDFViewer = ({ data, saveStatus, useEdit = false }: ResumePDFProps) => {
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
    const [newPdfUrl, setNewPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const downloadPDF = useGeneratePDF({ data });


    const generatePDF = useCallback(async () => {
        setLoading(true);
        //console.log('Starting PDF generation');
        try {
            const blob = await ReactPDF.pdf(<ResumePDF data={data} />).toBlob();
            const newUrl = URL.createObjectURL(blob);
            //console.log('PDF generated, new URL:', newUrl);
            if (!currentPdfUrl) {
                setCurrentPdfUrl(newUrl)
            }
            setNewPdfUrl(newUrl)
        } catch (error) {
            //console.error('Error generating PDF:', error);
            setLoading(false);
        }
    }, [data]);

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
        <div className='flex h-full flex-col justify-center w-[62vh]'>
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
                    <p>Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</p>
                    {useEdit && <Button type='button' size='sm' href={`/resumebuilder/${data._id}`}>Edit</Button>}
                    <Button type='button' size='sm' onClick={downloadPDF}>Download</Button>
                    {saveStatus && <SaveStatusIndicator saveStatus={saveStatus} />}
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
            <div className='flex w-full h-full'>
                <div className={`flex w-full justify-center ${loading ? 'block' : 'hidden'}`}>
                    {!currentPdfUrl && <ResumeLoadingComponent />}
                    {currentPdfUrl && (
                        <Document className={'flex w-full h-full justify-center'} loading={<></>} file={currentPdfUrl}>
                            <Page className="bg-white shadow-lg border border-gray-200" loading={<></>} pageNumber={pageNumber} />
                        </Document>
                    )}
                </div>
                <div className={`flex w-full justify-center ${loading ? 'hidden' : 'block'}`}>
                    {newPdfUrl && (
                        <Document className={'flex w-full h-full justify-center'} onLoadSuccess={handleDocumentLoad} loading={<></>} file={newPdfUrl}>
                            <Page className="bg-white shadow-lg border border-gray-200" onRenderSuccess={handleLoadSuccess} loading={<></>} pageNumber={pageNumber} />
                        </Document>
                    )}
                </div>
            </div>
        </div >

    );
};

export default CustomPDFViewer;
