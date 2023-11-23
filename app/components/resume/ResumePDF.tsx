import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Link, Svg, Line } from '@react-pdf/renderer';
import { ResumeBuilderFormData } from '../../resumetest/resumetest-helper';
import { Award, Certification, Education, ProfessionalExperience, Project, Publication } from '../../../models/Resume';
import { format, parse } from 'date-fns';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  entryMain: {
    flex: 1,
    minWidth: 0,
  },
  entryDate: {
    flexShrink: 0,
    marginLeft: 10,
    fontSize: 11,
    textAlign: 'right'
  },
  header: {
    textAlign: 'center',
    marginBottom: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A6274'
  },
  separator: {
    marginHorizontal: 5, // Adjust as needed for spacing
    fontSize: 10,
    // ... other styles
  },
  lineBreak: {
    marginBottom: 2 // Adjust as needed for spacing
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactInfo: {
    marginHorizontal: 3, // Adjust as needed for spacing
    fontSize: 10,
  },
  contactInfoLink: {
    marginHorizontal: 3, // Adjust as needed for spacing
    fontSize: 10,
    textDecoration: 'none',
    color: '#4A6274'
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  bullets: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  bulletPoint: {
    marginLeft: 5,
    fontSize: 10,
  },
  // ... other styles as needed
});

type ContactElement = {
  type: 'text' | 'link';
  value: string;
  url?: string; // Optional property for links
};

const formatDate = (dateDetail: string | undefined) => {
  if (dateDetail === 'present') {
    return 'present';
  }
  if (dateDetail) {
    try {
      return format(parse(dateDetail, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy');
    } catch (error) {
      console.error('Invalid date format:', error);
      return dateDetail; // or return a default/fallback value
    }
  }
  return ''; // Handle undefined dateDetail
};

interface ResumePDFProps {
  data: ResumeBuilderFormData;
  sections: string[]
}

const LineBreak = () => (
  <View style={styles.lineBreak}>
    <Svg height="5" width="100%">
      <Line
        x1="0"
        y1="3"
        x2="1000"
        y2="3"
        strokeWidth={2}
        stroke="#4A6274"
      />
    </Svg>
  </View>)

interface ListInputProps {
  id: string
  skills: {
    label: string;
    value: string;
  }[];
  professional_experience: ProfessionalExperience[];
  education: Education[];
  projects: Project[];
    publications?: Publication[];
    awards?: Award[];
    certifications?: Certification[];
    interests: { label: string; value: string }[];
}

const renderField = ({ id, skills, professional_experience, education }: ListInputProps) => {

  switch (id) {
    case 'skills':
      return (
        <View>
          <Text style={styles.sectionHeader}>{'Skills'.toUpperCase()}</Text>
          <LineBreak />
          <Text style={styles.text}>{skills.map(skill => skill.value).join(', ')}</Text>
        </View>
      );
    case 'professional_experience':
      return (
        <View>
          <Text style={styles.sectionHeader}>{'Professional Experience'.toUpperCase()}</Text>
          <LineBreak />
          {professional_experience.map((exp, index) => (
            <View key={index}>
              <View style={styles.entryContainer}>
                <View style={styles.entryMain}>
                  <Text style={styles.text}>{exp.title || 'Job Title'}, {exp.company || 'Employer'}</Text>
                </View>
                <Text style={styles.entryDate}>{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</Text>
              </View>
              <View style={styles.entryContainer}>
                <View style={styles.entryMain}>
                  {exp.responsibilities && exp.responsibilities.map((resp, idx) =>
                    <View style={styles.bullets} key={idx}>
                      <Text key={idx} style={styles.bulletPoint}>•</Text>
                      <Text key={idx} style={styles.bulletPoint}>{resp.content}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    case 'education':
      return (
        <View>
          <Text style={styles.sectionHeader}>{'Education'.toUpperCase()}</Text>
          <LineBreak />
          {education.map((edu, index) => (
            <View key={index} >
              <View style={styles.entryContainer}>
                <View style={styles.entryMain}>
                  <Text style={styles.text}>{edu.institution}{edu.institution && edu.location ? ', ' : ''}{edu.location}</Text>
                </View>
                <Text style={styles.entryDate}>{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</Text>
              </View>
              <View style={styles.entryContainer}>
                <View style={styles.entryMain}>
                  {edu.details && edu.details.map((detail, idx) =>
                    <View style={styles.bullets} key={idx}>
                      <Text key={idx} style={styles.bulletPoint}>•</Text>
                      <Text key={idx} style={styles.bulletPoint}>{detail.content}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    default:
      return null;
  }
};


// ResumePDF component
const ResumePDF: React.FC<ResumePDFProps> = ({ data, sections }) => {
  const {
    name,
    title,
    email,
    phone,
    location,
    summary,
    skills,
    professional_experience,
    education,
    interests,
    projects,
    certifications,
    awards,
    publications
  } = data

  const contactElements: ContactElement[] = [];
  if (data.phone) {
    contactElements.push({ type: 'text', value: phone || '' });
  }
  if (data.email) {
    contactElements.push({ type: 'text', value: email || '' });
  }
  if (data.location) {
    contactElements.push({ type: 'text', value: location || '' });
  }

  // Add social links to contact elements
  data.social_links.forEach(link => {
    contactElements.push({ type: 'link', value: link.name, url: link.url });
  });

  return (
    <PDFViewer className="viewer border border-gray-300 rounded shadow-lg" style={{ width: '100%', height: '97vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* ... Header and Skills Section ... */}
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.contactView}>
              {contactElements.map((element, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Text style={styles.separator}>|</Text>} {/* Separator */}
                  {element.type === 'text' && (
                    <Text style={styles.contactInfo}>{element.value}</Text>
                  )}
                  {element.type === 'link' && (
                    <Link src={element.url || ''} style={styles.contactInfoLink}>
                      {element.value}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* summary Section */}
          {summary ?
            (<View>
              <Text style={styles.title}>{title?.toUpperCase()}</Text>
              <View style={styles.entryContainer}>
                <Text style={styles.text}>{summary}</Text>
              </View>
            </View>
            )
            : <View></View>
          }

          {sections.map(section => renderField(
            {
              id: section,
              skills,
              professional_experience,
              education,
              interests,
              projects,
              certifications,
              awards,
              publications
            }))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ResumePDF;
