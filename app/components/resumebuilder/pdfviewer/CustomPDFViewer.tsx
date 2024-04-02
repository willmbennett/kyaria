'use client'
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
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
    jobId?: string
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
    })


    return (
        <div className='flex h-full flex-col justify-center w-full'>
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
            <div className="flex justify-center">
                <div className={`aspect-[1/1.41] ${loading ? 'flex' : 'hidden'}`}>
                    {currentPdfUrl && !firstLoad && (
                        <Document loading={<></>} file={currentPdfUrl}>
                            <Page loading={<></>} pageNumber={pageNumber} className="shadow-lg border border-gray-200 w-full h-auto" />
                        </Document>
                    )}
                </div>
                <div className={`aspect-[1/1.41] ${loading ? 'hidden' : 'flex'}`}>
                    {newPdfUrl && (
                        <Document onLoadSuccess={handleDocumentLoad} loading={<></>} file={newPdfUrl}>
                            <Page onRenderSuccess={handleLoadSuccess} loading={<></>} className="shadow-lg border border-gray-200 w-full h-auto" pageNumber={pageNumber} />
                        </Document>
                    )}
                </div>
            </div>
        </div >

    );
};

export default CustomPDFViewer;
