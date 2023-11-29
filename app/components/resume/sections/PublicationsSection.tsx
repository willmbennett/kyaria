import { Publication } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

interface sortingInt {
    originalIndex: number,
    item: Publication
}

export const PublicationSection = ({ publications }: { publications: Publication[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Publications'.toUpperCase()}</Text>
        <LineBreak />
        {publications.map((item: Publication, index: number) => ({
            item,
            originalIndex: index,
        })).sort((a: sortingInt, b: sortingInt) => {
            // Compare the end_date values as timestamps (assuming they are in ISO date format)
            const dateA = new Date(a.item.date || '').getTime();
            const dateB = new Date(b.item.date || '').getTime();
            return dateB - dateA; // Sort other dates in descending order
        }).map((sortedExp, index) => {
            const item = sortedExp.item
            return (
                <View style={pdfstyles.entryContainer} key={index}>
                    <Text style={pdfstyles.bulletPoint}>•</Text>
                    <View style={pdfstyles.entryMain}>
                        <Text style={pdfstyles.bulletPoint}>
                            {item.publication || 'Publication Name'}, {item.publisher || 'Publisher'}
                        </Text>
                    </View>
                    <Text style={pdfstyles.entryDate}>{item.date}</Text>
                    <Text style={pdfstyles.entryDate}>{formatDate(item.date)}</Text>
                </View>
            )
        })}
    </View>
);
