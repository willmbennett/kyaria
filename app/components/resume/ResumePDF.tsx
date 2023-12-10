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
  sections: string[]
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
          <View style={pdfstyles.resumeSection}>
            {title && <Text style={pdfstyles.title}>{title.toLocaleUpperCase()}</Text>}
            {summary &&
              <View style={pdfstyles.entryContainer}>
                <Text style={pdfstyles.text}>{summary}</Text>
              </View>
            }
          </View>
        </View>
        {sections.map((section, idx) =>
          <View key={idx}>
            {renderField({
              id: section,
              skills: section === 'skills' ? skills : undefined,
              professional_experience: section === 'professional_experience' ? professional_experience : undefined,
              education: section === 'education' ? education : undefined,
              interests: section === 'interests' ? interests : undefined,
              projects: section === 'projects' ? projects : undefined,
              certifications: section === 'certifications' ? certifications : undefined,
              awards: section === 'awards' ? awards : undefined,
              publications: section === 'publications' ? publications : undefined,
              volunteering: section === 'volunteering' ? volunteering : undefined,
            })}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
