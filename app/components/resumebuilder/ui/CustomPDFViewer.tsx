'use client'
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import ResumePDF from "../../resume/ResumePDF";
import { ResumeBuilderFormData } from "../../../resumebuilder/resumetest-helper";
import ResumeLoadingComponent from '../../resume/ResumeLoadingComponent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce, isEqual } from 'lodash';

interface ResumePDFProps {
    data: ResumeBuilderFormData;
}

type pdfUrlTye = {
    current: string | null;
    previous: string | null;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();


const CustomPDFViewer = ({ data }: ResumePDFProps) => {
    const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
    const [newPdfUrl, setNewPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const generatePDF = useCallback(async () => {
        console.log('Starting PDF generation');
        try {
            const blob = await ReactPDF.pdf(<ResumePDF data={data} />).toBlob();
            const newUrl = URL.createObjectURL(blob);
            console.log('PDF generated, new URL:', newUrl);
            if (!currentPdfUrl) {
                setCurrentPdfUrl(newUrl)
            }
            setNewPdfUrl(newUrl)
        } catch (error) {
            console.error('Error generating PDF:', error);
            setLoading(false);
        }
    }, [data]);


    useEffect(() => {
        console.log('Effect triggered to generate PDF');
        generatePDF();
        return () => {
            // Clean up the last used URLs
            if (currentPdfUrl) {
                URL.revokeObjectURL(currentPdfUrl);
            }
            if (newPdfUrl) {
                URL.revokeObjectURL(newPdfUrl);
            }
        };
    }, [generatePDF]);


    const handleLoadSuccess = () => {
        setLoading(false);
        const oldUrl = currentPdfUrl
        setCurrentPdfUrl(newPdfUrl)
        if (oldUrl) URL.revokeObjectURL(oldUrl);
    };

    const handleLoadStart = () => {
        setLoading(true);
    };

    return (
        <>
            {loading && !currentPdfUrl ? <ResumeLoadingComponent /> : null}
            <Document loading={<></>} className={!loading ? 'hidden' : 'block'} file={currentPdfUrl}>
                <Page loading={<></>} pageNumber={1} />
            </Document>
            {newPdfUrl &&
                <Document onLoadStart={handleLoadStart} className={loading ? 'hidden' : 'block'} loading={<></>} file={newPdfUrl}>
                    <Page onRenderSuccess={handleLoadSuccess} loading={<></>} pageNumber={1} />
                </Document>
            }
        </>
    );
};

export default CustomPDFViewer;
