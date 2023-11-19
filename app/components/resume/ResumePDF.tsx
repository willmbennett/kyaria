import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { DateDetails, EducationDetail, Position } from '../../../models/ResumeScan';

type ResumePDFProps = {
  data: {
    education?: Array<EducationDetail>;
    experience?: Array<Position>;
    skills: Array<{ label: string; value: string }>;
    professionalSummary?: string;
    objective?: string;
    hobbies?: string;
    patents?: string;
    publications?: string;
    speakingEngagements?: string;
    name?: string;
    telephone?: string;
    emailAddress?: string;
    location?: string;
    // Add other resume sections as needed
  };
}
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
    textAlign: 'right',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  separator: {
    marginHorizontal: 5, // Adjust as needed for spacing
    fontSize: 10,
    // ... other styles
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
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    marginBottom: 5,
  },
  bulletPoint: {
    marginLeft: 10,
    fontSize: 10,
  },
  // ... other styles as needed
});

const formatDate = (dateDetail: DateDetails | undefined) => {
  return dateDetail ? (dateDetail.IsCurrentDate ? 'present' : dateDetail.Date) : 'N/A';
};


// ResumePDF component
const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => {
  const contactElements = [];
  if (data.telephone) {
    contactElements.push({ type: 'text', value: data.telephone });
  }
  if (data.emailAddress) {
    contactElements.push({ type: 'text', value: data.emailAddress });
  }
  if (data.location) {
    contactElements.push({ type: 'text', value: data.location });
  }

  return (
    <PDFViewer className="viewer border border-gray-300 rounded shadow-lg" style={{ width: '100%', height: '97vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* ... Header and Skills Section ... */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.name}</Text>
            <View style={styles.contactView}>
              {contactElements.map((element, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Text style={styles.separator}>|</Text>} {/* Separator */}
                  <Text style={styles.contactInfo}>{element.value}</Text>
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* summary Section */}
          {data.professionalSummary ?
            (<div>
              <Text style={styles.sectionHeader}>Summary</Text>
              <View style={styles.entryContainer}>
                <Text style={styles.text}>{data.professionalSummary}</Text>
              </View>
            </div>)
            : null
          }

          {/* Objectives Section */}
          {data.objective ?
            (<div>
              <Text style={styles.sectionHeader}>Objective</Text>
              <View style={styles.entryContainer}>
                <Text style={styles.text}>{data.objective}</Text>
              </View>
            </div>)
            : null
          }

          {/* Hobbies Section */}
          {data.hobbies ?
            (<div>
              <Text style={styles.sectionHeader}>Hobbies</Text>
              <View style={styles.entryContainer}>
                <Text style={styles.text}>{data.hobbies}</Text>
              </View>
            </div>)
            : null
          }

          {/* Patents Section */}
          {data.patents ?
            (<div>
              <Text style={styles.sectionHeader}>Patents</Text>
              <View style={styles.entryContainer}>
                <Text style={styles.text}>{data.patents}</Text>
              </View>
            </div>)
            : null
          }

          {/* Patents Section */}
          {data.patents ?
            (<div>
              <Text style={styles.sectionHeader}>Patents</Text>
              <View style={styles.entryContainer}>
                <Text style={styles.text}>{data.patents}</Text>
              </View>
            </div>)
            : null
          }

          {/* Skills Section */}
          {data.skills && <>
            <Text style={styles.sectionHeader}>Skills</Text>
            <Text style={styles.text}>{data.skills.map(skill => skill.value).join(', ')}</Text>
          </>}


          {/* Education Section */}
          {data.education && <>
            <Text style={styles.sectionHeader}>Education</Text>
            {data.education.map((edu, index) => (
              <div key={index}>
                <View style={styles.entryContainer}>
                  <View style={styles.entryMain}>
                    <Text style={styles.text}>{edu.SchoolName?.Raw}{edu.SchoolName?.Raw && edu.Location?.StreetAddressLines ? ', ' : ''}{edu.Location?.StreetAddressLines}</Text>
                  </View>
                  <Text style={styles.entryDate}>{formatDate(edu.StartDate)} - {formatDate(edu.EndDate)}</Text>
                </View>
                <View style={styles.entryContainer}>
                  <View style={styles.entryMain}>
                    {edu.Text && <Text style={styles.bulletPoint}>{edu.Text}</Text>}
                    <Text style={styles.bulletPoint}>{edu.Degree?.Name?.Raw}{edu.GPA?.Score ? ', ' : ''}{edu.GPA?.Score}</Text>
                  </View>
                </View>
              </div>
            ))}
          </>}

          {/* Experience Section */}
          {data.experience && <>
            <Text style={styles.sectionHeader}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <div key={index}>
                <View style={styles.entryContainer}>
                  <View style={styles.entryMain}>
                    <Text style={styles.text}>{exp.JobTitle?.Raw || 'Job Title'} at {exp.Employer?.Name?.Raw || 'Employer'}</Text>
                  </View>
                  <Text style={styles.entryDate}>{formatDate(exp.StartDate)} - {formatDate(exp.EndDate)}</Text>
                </View>
                <View style={styles.entryContainer}>
                  <View style={styles.entryMain}>
                    {exp.Description && <Text style={styles.bulletPoint}>{exp.Description}</Text>}
                    {exp.Bullets && exp.Bullets.map((bullet, idx) => <Text key={idx} style={styles.bulletPoint}>• {bullet.Text}</Text>)}
                  </View>
                </View>
              </div>
            ))}
          </>}

          {/* Add other sections as needed */}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ResumePDF;
