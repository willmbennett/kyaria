import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { EducationDetail, Position } from '../../../models/ResumeScan';

type ResumePDFProps = {
  data: {
    // Define the structure of your form data here
    education: Array<EducationDetail>;
    experience: Array<Position>;
    skills: Array<{ label: string; value: string }>;
    // Add other resume sections as needed

  };
}
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    margin: 5,
  },
  text: {
    margin: 5,
    fontSize: 11,
    textAlign: 'justify',
  },
  // Add more styles as needed
});

const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => {
  const skills = data.skills
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Resume</Text>

          {/* Skills Section */}
          <Text style={styles.subtitle}>Skills</Text>
          <Text style={styles.text}>{skills.map(skill => skill.value).join(', ')}</Text>

          {/* Education Section */}
          <Text style={styles.subtitle}>Education</Text>
          {data.education.map((edu: any, index: number) => (
            <Text style={styles.text} key={index}>{edu.degree} - {edu.institution}</Text>
          ))}

          {/* Experience Section */}
          <Text style={styles.subtitle}>Professional Experience</Text>
          {data.experience.map((exp: any, index: number) => (
            <Text style={styles.text} key={index}>{exp.position} - {exp.company}</Text>
          ))}

          {/* Add other sections here */}

        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
