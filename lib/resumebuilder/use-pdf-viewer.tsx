'use client'
import { pdfjs } from "react-pdf";
import ReactPDF from '@react-pdf/renderer';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { ResumeClass } from '../../models/Resume';
import ResumePDF from '../../app/components/resumebuilder/pdfviewer/ResumePDF';
import { useCopyResume } from '../hooks/use-copy-resume';
const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = url

interface UsePDFViwererProps {
    data: ResumeClass;
    userId: string;
    jobId?: string
}

export const usePDFViwerer = ({
    data,
    userId,
    jobId
}: UsePDFViwererProps) => {
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

    const editUrl = `/resumebuilder/${data._id}` + (jobId ? `?job=${jobId}` : '')

    return { numPages, pageNumber, previousPage, editUrl, downloadPDF, handleCopy, nextPage, loading, currentPdfUrl, firstLoad, newPdfUrl, handleDocumentLoad, handleLoadSuccess }
}