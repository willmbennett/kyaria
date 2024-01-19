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

interface ResumePDFProps {
    data: ResumeBuilderFormData;
}

type pdfUrlTye = {
    current: string | null;
    previous: string | null;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();


const CustomPDFViewer = ({ data }: ResumePDFProps) => {
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
    const [newPdfUrl, setNewPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


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
        <div className='flex w-full h-full flex-col'>
            {numPages > 1 &&
                <div className='p-3 flex items-center flex-row justify-between'>
                    <Button
                        size='sm'
                        type="button"
                        variant={pageNumber <= 1 ? 'secondary' : 'solid'}
                        disabled={pageNumber <= 1}
                        onClick={previousPage}>
                        Previous
                    </Button>{" "}
                    <p>
                        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                    </p>

                    <Button
                        type="button"
                        size='sm'
                        variant={pageNumber >= numPages ? 'secondary' : 'solid'}
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        Next
                    </Button>
                </div>
            }
            <div className='flex w-full h-full'>
                <div className="flex w-full h-full bg-white shadow-lg p-4 border border-gray-200">
                    <div className={`flex w-full justify-center ${loading ? 'block' : 'hidden'}`}>
                        {loading && !currentPdfUrl ? <ResumeLoadingComponent /> : null}
                        {currentPdfUrl && (
                            <Document loading={<></>} file={currentPdfUrl}>
                                <Page loading={<></>} pageNumber={pageNumber} />
                            </Document>
                        )}
                    </div>
                    <div className={`flex w-full justify-center ${loading ? 'hidden' : 'block'}`}>
                        {newPdfUrl && (
                            <Document onLoadSuccess={handleDocumentLoad} loading={<></>} file={newPdfUrl}>
                                <Page onRenderSuccess={handleLoadSuccess} loading={<></>} pageNumber={pageNumber} />
                            </Document>
                        )}
                    </div>
                </div>
            </div>
        </div >

    );
};

export default CustomPDFViewer;
