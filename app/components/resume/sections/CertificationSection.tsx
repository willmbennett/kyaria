import { Certification } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

interface sortingInt {
    originalIndex: number,
    item: Certification
}

export const CertificationSection = ({ certifications }: { certifications: Certification[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Certifications'.toUpperCase()}</Text>
        <LineBreak />
        {certifications.map((item: Certification, index: number) => ({
            item,
            originalIndex: index,
        })).sort((a: sortingInt, b: sortingInt) => {
            // Check if either a or b has 'present' as end_date
            if (a.item.end_date !== 'present' && b.item.end_date === 'present') {
                return 1; // 'present' comes before other dates
            } else {
                // Compare the end_date values as timestamps (assuming they are in ISO date format)
                const dateA = new Date(a.item.end_date || '').getTime();
                const dateB = new Date(b.item.end_date || '').getTime();
                return dateB - dateA; // Sort other dates in descending order
            }
        })
            .map((sortedExp, index) => {
                const item = sortedExp.item
                return (
                    <View style={pdfstyles.entryContainer} key={index}>
                        <Text style={pdfstyles.bulletPoint}>•</Text>
                        <View style={pdfstyles.entryMain}>
                            <Text style={pdfstyles.bulletPoint}>
                                {item.certification || 'Certification'}, {item.provider || 'Provider'}
                            </Text>
                        </View>
                        <Text style={pdfstyles.entryDate}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
                    </View>
                )
            })}
    </View>
);
