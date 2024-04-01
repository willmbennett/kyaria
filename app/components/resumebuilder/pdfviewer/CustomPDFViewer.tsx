'use client'
import ReactPDF, { pdf } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import ResumePDF from "./ResumePDF";
import ResumeLoadingComponent from './ResumeLoadingComponent';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Button } from '../../Button';
import SaveStatusIndicator from '../SaveStatusIndicator';
import { ResumeClass } from '../../../../models/Resume';
import { useCopyResume } from '../../../../lib/hooks/use-copy-resume';
import { useRouter } from 'next/navigation';

interface ResumePDFProps {
    data: ResumeClass;
    saveStatus?: "error" | "saving" | "up to date";
    useEdit?: boolean;
    userId: string;
    useSave: boolean;
}

const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = url


const CustomPDFViewer = (
    {
        data,
        saveStatus,
        useEdit = false,
        userId,
        useSave
    }: ResumePDFProps
) => {
    const router = useRouter()
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
    const [newPdfUrl, setNewPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);

    //console.log('data: ', data)

    const downloadPDF = useCallback(async () => {
        //console.log(`Made it to [downloadPDF] with blob: ${newPdfUrl}`)
        if (newPdfUrl) {
            const name = data.name?.replace(/\s/g, '_') || ''
            const link = document.createElement('a');
            link.href = newPdfUrl;
            link.download = `${name}_Resume.pdf`;
            link.click();
        }
    }, [data, currentPdfUrl]);


    const generatePDF = useCallback(async () => {
        setLoading(true);
        //console.log('Starting PDF generation');
        //console.log(data)
        try {
            const blob = await ReactPDF.pdf(<ResumePDF data={data} />).toBlob();
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
        //console.log('finished loading new page')
        setLoading(false);
        // Clean up old url if not the same as new
        if (currentPdfUrl && (currentPdfUrl != newPdfUrl)) {
            URL.revokeObjectURL(currentPdfUrl)
        }
        //console.log(`About to set old url: `, newPdfUrl)
        setCurrentPdfUrl(newPdfUrl)

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

    const { handleCopyResume } = useCopyResume()

    const handleCopy = async () => {
        const resumeId = await handleCopyResume(userId, data, true)
        if (resumeId) {
            router.push(`/resumebuilder/` + resumeId)
        }
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
                    <p>Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</p>
                    {useEdit && <Button type='button' size='sm' href={`/resumebuilder/${data._id}`}>Edit</Button>}
                    <Button type='button' size='sm' onClick={downloadPDF}>Download</Button>
                    <Button type='button' size='sm' onClick={handleCopy}>Copy</Button>
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
};

export default CustomPDFViewer;
