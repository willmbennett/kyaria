import React from 'react';
import { Page, Text, View, Document, Link } from '@react-pdf/renderer';
import { GeneralSectionConfig, ResumeBuilderFormData, sectionConfigs } from '../../../resumebuilder/resumetest-helper';
import { Award, Certification, Education, ProfessionalExperience, Project, Publication, ResumeClass, Volunteering } from '../../../../models/Resume';
import { pdfstyles } from './styles';
import { ListSection } from './ListSection';
import PDFResumeSection from './PDFResumeSection';


type ContactElement = {
  type: 'text' | 'link';
  value: string;
  url?: string; // Optional property for links
};

interface ListInputProps {
  id: string
  skills?: string[]
  professional_experience?: ProfessionalExperience[];
  education?: Education[];
  projects?: Project[];
  publications?: Publication[];
  awards?: Award[];
  certifications?: Certification[];
  interests?: string[]
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
const ResumePDF = ({ data }: { data: ResumeClass }) => {
  const {
    name, title, email, phone, location, social_links, summary, skills,
    professional_experience, education, interests, projects,
    certifications, awards, publications, volunteering, sectionOrder
  } = data;

  const resumeSections = (sectionOrder && sectionOrder.length > 0) ? sectionOrder : [
    'skills',
    'professional_experience',
    'education',
    'projects',
    'awards',
    'publications',
    'certifications',
    'volunteering',
    'interests'
  ];

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

  if (social_links) {
    // Iterate over the keys of the social_links object
    for (const name in social_links) {
      // Check if the key is actually a property of the object and not inherited
      if (social_links.hasOwnProperty(name)) {
        contactElements.push({ type: 'link', value: name, url: social_links[name] });
      }
    }
  }


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
                      <Text>
                        {element.value}
                      </Text>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
          <View wrap={false} style={pdfstyles.summarySection}>
            {title !== undefined && <Text style={pdfstyles.title}>{title.toLocaleUpperCase()}</Text>}
            {summary !== undefined && <Text style={pdfstyles.text}>{summary}</Text>}
          </View>
        </View>
        {resumeSections.map((section, idx) =>
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
    </Document >
  );
};

export default ResumePDF;
