
import { Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import type { PDFDocumentProxy } from 'pdfjs-dist';

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


type PDFViewerProps = {
    file: File | null;
    onLoadSuccess: (pdf: PDFDocumentProxy) => void;
    numPages: number | null;
    handleTextContent: (textContent: { items: any[]; }) => void;
};

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, onLoadSuccess, numPages, handleTextContent }) => (

    <Document file={file} onLoadSuccess={onLoadSuccess} options={options}>
        {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} onGetTextSuccess={handleTextContent} />
        ))}
    </Document>
);
