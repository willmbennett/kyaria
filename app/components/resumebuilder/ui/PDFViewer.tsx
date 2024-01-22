
import { Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useState } from 'react';
import { Button } from '../../Button';

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

type PDFViewerProps = {
    file: File | null;
    onLoadSuccess: (pdf: PDFDocumentProxy) => void;
    numPages: number | null;
    handleTextContent: (textContent: { items: any[]; }) => void;
    handleAnnotations: (annotations: any[]) => void;
};

export const PDFViewer: React.FC<PDFViewerProps> = (
    { file,
        onLoadSuccess,
        numPages,
        handleTextContent,
        handleAnnotations
    }
) => {
    const [pageNumber, setPageNumber] = useState(1);
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
        <div className='w-full flex flex-col justify-center'>
            {numPages &&
                <div className={`p-3 flex w-full items-center flex-row ${numPages > 1 ? 'justify-between' : 'justify-center'}`}>
                    <Button
                        size='sm'
                        type="button"
                        variant={pageNumber <= 1 ? 'secondary' : 'solid'}
                        disabled={pageNumber <= 1}
                        onClick={previousPage}>
                        Previous
                    </Button>
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
            <div className="flex w-full p-3 overflow-x-auto items-center justify-center"> {/* Ensuring the container doesn't spill off */}
                <Document file={file} onLoadSuccess={onLoadSuccess} options={options} className="w-full max-w-[62vh]">
                    <Page
                        key={`page_${pageNumber}`}
                        pageNumber={pageNumber}
                        onGetTextSuccess={handleTextContent}
                        onGetAnnotationsSuccess={handleAnnotations}
                        className="w-full"  // Set width to full
                    />
                </Document>
            </div>
        </div>
    )
}
