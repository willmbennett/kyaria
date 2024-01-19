import React from 'react';
import { Page, Text, View, Document, Link } from '@react-pdf/renderer';
import { GeneralSectionConfig, ResumeBuilderFormData, sectionConfigs } from '../../resumebuilder/resumetest-helper';
import { Award, Certification, Education, ProfessionalExperience, Project, Publication, Volunteering } from '../../../models/Resume';
import { pdfstyles } from './styles';
import { ListSection } from './sections/ListSection';
import PDFResumeSection from './sections/PDFResumeSection';


type ContactElement = {
  type: 'text' | 'link';
  value: string;
  url?: string; // Optional property for links
};

interface ResumePDFProps {
  data: ResumeBuilderFormData;
}

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

  const sectionConfig = sectionConfigs.find(config => config.id === id) as GeneralSectionConfig;

  switch (id) {
    case 'skills':
      return skills && skills.length > 0 && <ListSection name={id} list={skills} />;
    case 'interests':
      return interests && interests.length > 0 && <ListSection name={id} list={interests} />
    case 'professional_experience':
      return professional_experience && professional_experience.length > 0 && <PDFResumeSection key={id} sectionConfig={sectionConfig} data={professional_experience} />
    case 'volunteering':
      return volunteering && volunteering.length > 0 && <PDFResumeSection key={id} sectionConfig={sectionConfig} data={volunteering} />
    case 'education':
      return education && education.length > 0 && <PDFResumeSection key={id} sectionConfig={sectionConfig} data={education} />
    case 'certifications':
      return certifications && certifications.length > 0 && <PDFResumeSection key={id} sectionConfig={sectionConfig} data={certifications} />
    case 'projects':
      return projects && projects.length > 0 && <PDFResumeSection key={id} sectionConfig={sectionConfig} data={projects} />
    case 'publications':
      return publications && publications.length > 0 && <PDFResumeSection key={id} sectionConfig={sectionConfig} data={publications} />
    case 'awards':
      return awards && awards.length > 0 && <PDFResumeSection key={id} sectionConfig={sectionConfig} data={awards} />
    default:
      return null;
  }
};


// ResumePDF component
const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => {
  const {
    name, title, email, phone, location, social_links, summary, skills,
    professional_experience, education, interests, projects,
    certifications, awards, publications, volunteering, sectionOrder
  } = data;

  const contactElements: ContactElement[] = [];
  if (phone) {
    contactElements.push({ type: 'text', value: phone || '' });
  }
  if (email) {
    contactElements.push({ type: 'text', value: email || '' });
  }
  if (location) {
    contactElements.push({ type: 'text', value: location || '' });
  }

  // Add social links to contact elements
  social_links?.forEach(link => {
    contactElements.push({ type: 'link', value: link.name, url: link.url });
  });

  return (
    <Document>
      <Page size="A4" style={pdfstyles.page}>
        <View style={pdfstyles.resumeSection}>
          <View style={pdfstyles.header}>
            <Text style={pdfstyles.name}>{name}</Text>
            <View style={pdfstyles.contactView}>
              {contactElements.map((element, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Text style={pdfstyles.separator}>|</Text>}
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
          <View wrap={false} style={pdfstyles.summarySection}>
            {title && <Text style={pdfstyles.title}>{title.toLocaleUpperCase()}</Text>}
            {summary && <Text style={pdfstyles.text}>{summary}</Text>}
          </View>
        </View>
        {sectionOrder.map((sectionOrder, idx) =>
          <View key={idx}>
            {renderField({
              id: sectionOrder,
              skills: sectionOrder === 'skills' ? skills : undefined,
              professional_experience: sectionOrder === 'professional_experience' ? professional_experience : undefined,
              education: sectionOrder === 'education' ? education : undefined,
              interests: sectionOrder === 'interests' ? interests : undefined,
              projects: sectionOrder === 'projects' ? projects : undefined,
              certifications: sectionOrder === 'certifications' ? certifications : undefined,
              awards: sectionOrder === 'awards' ? awards : undefined,
              publications: sectionOrder === 'publications' ? publications : undefined,
              volunteering: sectionOrder === 'volunteering' ? volunteering : undefined,
            })}
          </View>
        )}
      </Page>
    </Document >
  );
};

export default ResumePDF;
