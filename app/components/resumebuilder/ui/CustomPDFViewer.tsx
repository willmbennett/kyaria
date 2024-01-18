'use client'
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, pdfjs } from "react-pdf";
import ResumePDF from "../../resume/ResumePDF";
import { ResumeBuilderFormData } from "../../../resumebuilder/resumetest-helper";
import ResumeLoadingComponent from '../../resume/ResumeLoadingComponent';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

interface ResumePDFProps {
    data: ResumeBuilderFormData;
    sections: string[];
}

type pdfUrlTye = {
    current: string | null;
    previous: string | null;
}

const CustomPDFViewer = ({ data, sections }: ResumePDFProps) => {
    const [pdfUrls, setPdfUrls] = useState<pdfUrlTye>({ current: null, previous: null });
    const [loading, setLoading] = useState(true);

    const generatePDF = useCallback(async () => {
        setLoading(true);
        try {
            const blob = await ReactPDF.pdf(<ResumePDF key={sections.join('-')} data={data} sections={sections} />).toBlob();
            const newUrl = URL.createObjectURL(blob);

            setPdfUrls(urls => {
                if (urls.current) {
                    return { current: newUrl, previous: urls.current };
                }
                return { previous: newUrl, current: newUrl };
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            setLoading(false);
        }
    }, [data, sections]);

    const debouncedGenerateNewBlobs = useCallback(debounce(generatePDF, 1000), [generatePDF]);

    useEffect(() => {
        debouncedGenerateNewBlobs();
    }, [debouncedGenerateNewBlobs]);

    const handleLoadSuccess = () => {
        setLoading(false);
    };

    return (
        <>
            {loading && !pdfUrls.previous ? <ResumeLoadingComponent /> : null}
            <Document loading={<></>} className={!loading ? 'hidden' : 'block'} file={pdfUrls.previous || pdfUrls.current}>
                <Page loading={<></>} pageNumber={1} />
            </Document>
            {pdfUrls.current &&
                <Document className={loading ? 'hidden' : 'block'} loading={<></>} file={pdfUrls.current}>
                    <Page onRenderSuccess={handleLoadSuccess} loading={<></>} pageNumber={1} />
                </Document>
            }
        </>
    );
};

export default CustomPDFViewer;
