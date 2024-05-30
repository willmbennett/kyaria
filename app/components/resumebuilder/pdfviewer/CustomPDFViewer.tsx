'use client'
import { useEffect, useState, useRef } from 'react';
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from '../../Button';
import SaveStatusIndicator from '../SaveStatusIndicator';
import { ResumeClass } from '../../../../models/Resume';
import { usePDFViwerer } from "../../../../lib/resumebuilder/use-pdf-viewer";

interface ResumePDFProps {
    data: ResumeClass;
    saveStatus?: "error" | "saving" | "up to date";
    useEdit?: boolean;
    userId: string;
    useSave: boolean;
    jobId?: string;
}

const CustomPDFViewer = (
    {
        data,
        saveStatus,
        useEdit = false,
        userId,
        useSave,
        jobId
    }: ResumePDFProps
) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const updateDimensions = () => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            setDimensions({
                width: clientWidth,
                height: clientHeight
            });
        }
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const {
        numPages,
        pageNumber,
        previousPage,
        editUrl,
        downloadPDF,
        handleCopy,
        nextPage,
        loading,
        currentPdfUrl,
        firstLoad,
        newPdfUrl,
        handleDocumentLoad,
        handleLoadSuccess
    } = usePDFViwerer({
        data,
        userId,
        jobId
    });

    return (
        <div className='relative h-full w-full max-w-xl'>
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
                    {useEdit && <Button type='button' size='sm' href={editUrl}>Edit</Button>}
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
            <div className='flex-none flex justify-center h-full w-full overflow-y-scroll shadow-lg border border-gray-200'>
                <div ref={containerRef} className="flex justify-center aspect-[1/1.41] w-full h-auto">
                    <div className={`aspect-[1/1.41] ${loading ? 'flex w-full h-full' : 'hidden'}`}>
                        {currentPdfUrl && !firstLoad && (
                            <Document loading={<></>} file={currentPdfUrl}>
                                <Page loading={<></>} pageNumber={pageNumber} width={dimensions.width} height={dimensions.height} />
                            </Document>
                        )}
                    </div>
                    <div className={`aspect-[1/1.41] ${loading ? 'hidden' : 'flex w-full h-full'}`}>
                        {newPdfUrl && (
                            <Document onLoadSuccess={handleDocumentLoad} loading={<></>} file={newPdfUrl}>
                                <Page onRenderSuccess={handleLoadSuccess} loading={<></>} pageNumber={pageNumber} width={dimensions.width} height={dimensions.height} />
                            </Document>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPDFViewer;
