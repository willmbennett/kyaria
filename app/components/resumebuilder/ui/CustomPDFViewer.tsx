import { ResumeBuilderFormData } from "../../../resumebuilder/resumetest-helper";
import { PDFViewer } from '@react-pdf/renderer';
import ResumePDF from "../../resume/ResumePDF";
import { pdfstyles } from "../../resume/styles";
import { UseFormWatch } from "react-hook-form";

interface ResumePDFProps {
    watch: UseFormWatch<ResumeBuilderFormData>;
    sections: string[]
}

const CustomPDFViewer = ({ watch, sections }: ResumePDFProps) => (
    <PDFViewer className="viewer rounded shadow-lg" showToolbar={false} style={pdfstyles.viewer}>
        <ResumePDF key={sections.join('-')} watch={watch} sections={sections} />
    </PDFViewer>
);

export default CustomPDFViewer;
