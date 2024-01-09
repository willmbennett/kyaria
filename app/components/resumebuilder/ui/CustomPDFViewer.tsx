import { ResumeBuilderFormData } from "../../../resumebuilder/resumetest-helper";
import { PDFViewer } from '@react-pdf/renderer';
import ResumePDF from "../../resume/ResumePDF";
import { pdfstyles } from "../../resume/styles";
import { UseFormWatch } from "react-hook-form";

interface ResumePDFProps {
    data: ResumeBuilderFormData;
    sections: string[]
}

const CustomPDFViewer = ({ data, sections }: ResumePDFProps) => (
    <PDFViewer className="viewer rounded shadow-lg" showToolbar={false} style={pdfstyles.viewer}>
        <ResumePDF key={sections.join('-')} data={data} sections={sections} />
    </PDFViewer>
);

export default CustomPDFViewer;
