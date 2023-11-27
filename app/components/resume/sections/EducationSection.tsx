import { Education } from "../../../../models/Resume";
import { Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

export const EducationSection = ({ education }: { education: Education[] }) => (
  <View>
    <Text style={pdfstyles.sectionHeader}>{'Education'.toUpperCase()}</Text>
    <LineBreak />
    {education.map((edu, index) => (
      <View key={index} >
        <View style={pdfstyles.entryContainer}>
          <View style={pdfstyles.entryMain}>
            <Text style={pdfstyles.text}>{edu.institution}{edu.institution && edu.location ? ', ' : ''}{edu.location}</Text>
          </View>
          <Text style={pdfstyles.entryDate}>{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</Text>
        </View>
        <View style={pdfstyles.entryContainer}>
          <View style={pdfstyles.entryMain}>
            {edu.details && edu.details.map((detail, idx) =>
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
