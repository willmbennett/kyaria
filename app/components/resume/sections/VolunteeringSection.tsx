import { Volunteering } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

export const VolunteeringSection = ({ volunteering }: { volunteering: Volunteering[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Volunteering'.toUpperCase()}</Text>
        <LineBreak />
        {volunteering.map((v, index) => (
            <View key={index}>
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        <Text style={pdfstyles.text}>{v.involvement || 'Involvement'}, {v.organization || 'Organization'}, {v.location || 'Location'}</Text>
                    </View>
                    <Text style={pdfstyles.entryDate}>{formatDate(v.start_date)} - {formatDate(v.end_date)}</Text>
                </View>
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        {v.details && v.details.map((detail, idx) =>
                            <View style={pdfstyles.bullets} key={idx}>
                                <Text key={idx} style={pdfstyles.bulletPoint}>•</Text>
                                <Text key={idx} style={pdfstyles.bulletPoint}>{detail.content}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        ))}
    </View>
);
