import { Certification } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

export const CertificationSection = ({ certifications }: { certifications: Certification[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Certifications'.toUpperCase()}</Text>
        <LineBreak />
        {certifications.map((publication, index) => (
            <View style={pdfstyles.entryContainer} key={index}>
                <Text style={pdfstyles.bulletPoint}>•</Text>
                <View style={pdfstyles.entryMain}>
                    <Text style={pdfstyles.bulletPoint}>
                        {publication.certification || 'Certification'}, {publication.provider || 'Provider'}
                    </Text>
                </View>
                <Text style={pdfstyles.entryDate}>{formatDate(publication.start_date)} - {formatDate(publication.end_date)}</Text>
            </View>
        ))}
    </View>
);
