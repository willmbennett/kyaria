import { Publication } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

export const PublicationSection = ({ publications }: { publications: Publication[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Publications'.toUpperCase()}</Text>
        <LineBreak />
        {publications.map((publication, index) => (
            <View style={pdfstyles.entryContainer} key={index}>
                <Text style={pdfstyles.bulletPoint}>•</Text>
                <View style={pdfstyles.entryMain}>
                    <Text style={pdfstyles.bulletPoint}>
                        {publication.publication || 'Publication Name'}, {publication.publisher || 'Publisher'}
                    </Text>
                </View>
                <Text style={pdfstyles.entryDate}>{formatDate(publication.date)}</Text>
            </View>
        ))}
    </View>
);
