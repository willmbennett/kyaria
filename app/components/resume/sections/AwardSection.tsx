import { Award } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

export const AwardSection = ({ awards }: { awards: Award[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Awards'.toUpperCase()}</Text>
        <LineBreak />
        {awards.map((award, index) => (
            <View style={pdfstyles.entryContainer} key={index}>
                <Text style={pdfstyles.bulletPoint}>•</Text>
                <View style={pdfstyles.entryMain}>
                    <Text style={pdfstyles.bulletPoint}>
                        {award.award || 'Award Name'}, {award.organization || 'Organization'}
                    </Text>
                </View>
                <Text style={pdfstyles.entryDate}>{formatDate(award.date)}</Text>
            </View>
        ))}
    </View>
);
