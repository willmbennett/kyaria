import { ProfessionalExperience } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

interface sortingInt {
    originalIndex: number,
    item: ProfessionalExperience
}

export const ProfessionalExperienceSection = ({ professional_experience }: { professional_experience: ProfessionalExperience[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Professional Experience'.toUpperCase()}</Text>
        <LineBreak />
        {professional_experience
            // Map the experiences to include the original index
            .map((item: ProfessionalExperience, index: number) => ({
                item,
                originalIndex: index,
            })).sort((a: sortingInt, b: sortingInt) => {
                // Check if either a or b has 'present' as end_date
                if (a.item.current) {
                    return -1; // 'current' comes before other dates
                } else if (a.item.end_date !== 'present' && b.item.end_date === 'present') {
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
                    <View key={index}>
                        <View style={pdfstyles.entryContainer}>
                            <View style={pdfstyles.entryMain}>
                                <Text style={pdfstyles.textbold}>{item.title || 'Job Title'}, {item.company || 'Employer'}, {item.location || 'Location'}</Text>
                            </View>
                            <Text style={pdfstyles.entryDate}>{formatDate(item.start_date)} - {item.current ? 'PRESENT' : formatDate(item.end_date)}</Text>
                        </View>
                        <View style={pdfstyles.entryContainer}>
                            <View style={pdfstyles.entryMain}>
                                {item.summary && <Text style={pdfstyles.text}>{item.summary}</Text>}
                                {item.responsibilities && item.responsibilities.map((resp, idx) =>
                                    <View style={pdfstyles.bullets} key={idx}>
                                        <Text key={idx} style={pdfstyles.bulletPoint}>•</Text>
                                        <Text key={idx} style={pdfstyles.bulletPoint}>{resp.content}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                )
            })}
    </View>
);
