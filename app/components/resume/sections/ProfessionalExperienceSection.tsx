import { ProfessionalExperience } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

export const ProfessionalExperienceSection = ({ professional_experience }: { professional_experience: ProfessionalExperience[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Professional Experience'.toUpperCase()}</Text>
        <LineBreak />
        {professional_experience.map((exp, index) => (
            <View key={index}>
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        <Text style={pdfstyles.text}>{exp.title || 'Job Title'}, {exp.company || 'Employer'}, {exp.location || 'Location'}</Text>
                    </View>
                    <Text style={pdfstyles.entryDate}>{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</Text>
                </View>
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        {exp.responsibilities && exp.responsibilities.map((resp, idx) =>
                            <View style={pdfstyles.bullets} key={idx}>
                                <Text key={idx} style={pdfstyles.bulletPoint}>•</Text>
                                <Text key={idx} style={pdfstyles.bulletPoint}>{resp.content}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        ))}
    </View>
);
