import React from 'react';
import { Page, Text, View, Document, PDFViewer, Link, Svg, Line } from '@react-pdf/renderer';
import { ResumeBuilderFormData } from '../../resumebuilder/resumetest-helper';
import { Award, Certification, Education, ProfessionalExperience, Project, Publication, Volunteering } from '../../../models/Resume';
import { pdfstyles } from './styles';
import { EducationSection } from './sections/EducationSection';
import { ProfessionalExperienceSection } from './sections/ProfessionalExperienceSection';
import { ListSection } from './sections/ListSection';
import { ProjectSection } from './sections/ProjectsSection';
import { PublicationSection } from './sections/PublicationsSection';
import { AwardSection } from './sections/AwardSection';
import { CertificationSection } from './sections/CertificationSection';
import { VolunteeringSection } from './sections/VolunteeringSection';


type ContactElement = {
  type: 'text' | 'link';
  value: string;
  url?: string; // Optional property for links
};

interface ResumePDFProps {
  data: ResumeBuilderFormData;
  sections: string[]
}

const LineBreak = () => (
  <View style={pdfstyles.lineBreak}>
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
  skills?: {
    label: string;
    value: string;
  }[];
  professional_experience?: ProfessionalExperience[];
  education?: Education[];
  projects?: Project[];
  publications?: Publication[];
  awards?: Award[];
  certifications?: Certification[];
  interests?: { label: string; value: string }[];
  volunteering?: Volunteering[];
}

const renderField = (
  { id,
    skills,
    professional_experience,
    education,
    interests,
    publications,
    projects,
    awards,
    certifications,
    volunteering
  }: ListInputProps) => {

  switch (id) {
    case 'skills':
      return (<>{skills && skills.length > 0 && <ListSection name={id} list={skills} />}</>);
    case 'interests':
      return (<>{interests && interests.length > 0 && <ListSection name={id} list={interests} />}</>);
    case 'professional_experience':
      return (<>{professional_experience && professional_experience.length > 0 && <ProfessionalExperienceSection professional_experience={professional_experience} />} </>);
    case 'projects':
      return (<>{projects && projects.length > 0 && <ProjectSection projects={projects} />}</>);
    case 'publications':
      return (<>{publications && publications.length > 0 && <PublicationSection publications={publications} />}</>);
    case 'certifications':
      return (<>{certifications && certifications.length > 0 && <CertificationSection certifications={certifications} />}</>);
    case 'awards':
      return (<>{awards && awards.length > 0 && <AwardSection awards={awards} />}</>);
    case 'education':
      return (<>{education && education.length > 0 && <EducationSection education={education} />}</>);
    case 'volunteering':
      return (<>{volunteering && volunteering.length > 0 && <VolunteeringSection volunteering={volunteering} />}</>);
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
    publications,
    volunteering
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
  data.social_links?.forEach(link => {
    contactElements.push({ type: 'link', value: link.name, url: link.url });
  });

  return (
    <PDFViewer className="viewer border border-gray-300 rounded shadow-lg" style={{ width: '100%', height: '97vh' }}>
      <Document>
        <Page size="A4" style={pdfstyles.page}>
          <View style={pdfstyles.header}>
            <Text style={pdfstyles.name}>{name}</Text>
            <View style={pdfstyles.contactView}>
              {contactElements.map((element, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Text style={pdfstyles.separator}>|</Text>} {/* Separator */}
                  {element.type === 'text' && (
                    <Text style={pdfstyles.contactInfo}>{element.value}</Text>
                  )}
                  {element.type === 'link' && (
                    <Link src={element.url || ''} style={pdfstyles.contactInfoLink}>
                      {element.value}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
          {summary ?
            (<View>
              <Text style={pdfstyles.title}>{title?.toUpperCase()}</Text>
              <View style={pdfstyles.entryContainer}>
                <Text style={pdfstyles.text}>{summary}</Text>
              </View>
            </View>
            )
            : <View></View>
          }
          {sections.map((section, idx) =>
            <View key={idx}>
              {renderField(
                {
                  id: section,
                  skills,
                  professional_experience,
                  education,
                  interests,
                  projects,
                  certifications,
                  awards,
                  publications,
                  volunteering
                })}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ResumePDF;
