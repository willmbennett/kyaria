import React from 'react';
import { ResumeScanDataClass } from '../../../../models/ResumeScan'; // Update this path according to your project structure
import { Button } from '../../Button';

// Assuming each of these are separate components you've created for displaying different parts of the resume
import ResumeQualityDisplay from '../sections/ResumeQuality';
import Overview from '../sections/Overview';
import ContactInformationDisplay from '../sections/ContactInfo';
import SkillsComponent from '../sections/SkillsComponent';
import EmploymentHistoryComponent from '../sections/EmploymentHistoryComponent';
import EducationComp from '../sections/Eduction';
import NameList from '../sections/NameList';
import Section from './Section';

type ResumeDisplayProps = {
    resumeTest: ResumeScanDataClass | null;
    session: any; // Replace with your session type
    resetForm: () => void;
};

const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ resumeTest, session, resetForm }) => {
    if (!resumeTest) {
        return null;
    }

    return (
        <div className='w-full my-3'>
            {session?.user?.id && (
                <Button onClick={resetForm} size='md' className='my-3'>
                    Upload Another Resume
                </Button>
            )}

            <h2 className="sm:text-4xl text-2xl font-bold text-slate-900 mb-8">
                {session?.user?.id ? 'Output' : 'Demo Output'}
            </h2>

            {/* Resume Quality Section */}
            {resumeTest.ResumeMetadata && resumeTest.ResumeMetadata.ResumeQuality && (
                <Section title="Resume Quality">
                    <ResumeQualityDisplay data={resumeTest.ResumeMetadata.ResumeQuality} />
                </Section>
            )}

            {/* Overview Section */}
            {(
                resumeTest.ProfessionalSummary ||
                resumeTest.Objective ||
                resumeTest.CoverLetter ||
                resumeTest.Hobbies ||
                resumeTest.Patents ||
                resumeTest.Publications ||
                resumeTest.SpeakingEngagements
            ) && (
                    <Section title="Overview">
                        <Overview
                            ProfessionalSummary={resumeTest.ProfessionalSummary}
                            Objective={resumeTest.Objective}
                            CoverLetter={resumeTest.CoverLetter}
                            Hobbies={resumeTest.Hobbies}
                            Patents={resumeTest.Patents}
                            Publications={resumeTest.Publications}
                            SpeakingEngagements={resumeTest.SpeakingEngagements}
                        />
                    </Section>
                )}

            {/* Contact Information Section */}
            {resumeTest.ContactInformation && (
                <Section title="Contact Information">
                    <ContactInformationDisplay data={resumeTest.ContactInformation} />
                </Section>
            )}

            {/* Skills Section */}
            {resumeTest.Skills && (
                <Section title="Skills">
                    <SkillsComponent data={resumeTest.Skills} />
                </Section>
            )}

            {/* Employment History Section */}
            {resumeTest.EmploymentHistory && (
                <Section title="Employment History">
                    <EmploymentHistoryComponent data={resumeTest.EmploymentHistory} />
                </Section>
            )}

            {/* Education Section */}
            {resumeTest.Education && (
                <Section title="Education">
                    <EducationComp data={resumeTest.Education} />
                </Section>
            )}

            {/* Certifications Section */}
            {resumeTest.Certifications && (
                <Section title="Certifications">
                    <NameList data={resumeTest.Certifications} title="Certifications" />
                </Section>
            )}

            {/* Licenses Section */}
            {resumeTest.Licenses && (
                <Section title="Licenses">
                    <NameList data={resumeTest.Licenses} title="Licenses" />
                </Section>
            )}
        </div>
    );
};

export default ResumeDisplay;
