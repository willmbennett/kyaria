'use client'
import { useState, useEffect } from 'react';
import { useResumeDropDown } from '../../../lib/hooks/use-resume-dropdown';
import { ResumeDropAndSelect } from '../../components/ResumeDropAndSelect';
import { Question } from './pages/Question';
import { Situation } from './pages/Situation';
import BehavioralsMenu from './BehavioralsMenu';
import { Sections } from '../helper';
import { Details } from './pages/Details';
import { Answer } from './pages/Answer';

const resumeMessage = "We'll use this resume to help you choose which accomplishment best fits this question."

// Mapping of sections to components
const sectionComponents = {
    [Sections.Question]: (props: any) => <Question {...props} />,
    [Sections.Resume]: (props: any) => <ResumeDropAndSelect customMessage={resumeMessage} {...props} />,
    [Sections.Situation]: (props: any) => <Situation {...props} />,
    [Sections.Details]: (props: any) => <Details {...props} />,
    [Sections.Answer]: (props: any) => <Answer {...props} />,
};

const mapDataToSections = (question?: string, userResume?: string, situation?: string, details?: string, answer?: string) => ({
    [Sections.Question]: !!question,
    [Sections.Resume]: !!userResume,
    [Sections.Situation]: !!situation,
    [Sections.Details]: !!details,
    [Sections.Answer]: !!answer,
});

export const BehavioralsPage = ({
    questionId,
    userId,
    userResume,
    question,
    situation,
    details,
    answer,
}: {
    questionId: string,
    userId: string,
    userResume?: string,
    question?: string,
    situation?: string,
    details?: string,
    answer?: string
}) => {

    const { hasResumes, selectedResumeId, setSelectedResumeId, resumes, resume } = useResumeDropDown({ userId, userResume });
    const sections = Object.values(Sections);

    const initialCompletion = mapDataToSections(question, userResume, situation, details, answer);
    const [completedSections, setCompletedSections] = useState<{ [key in Sections]?: boolean }>(initialCompletion);
    const [currentSection, setCurrentSection] = useState<Sections>(Sections.Question);

    const handleSectionCompletion = (section: Sections) => {
        setCompletedSections(prev => ({ ...prev, [section]: true }));
    };

    const canNavigateToSection = (section: Sections) => {
        const sectionIndex = sections.indexOf(section);
        return sections.slice(0, sectionIndex).every(sec => completedSections[sec]);
    };

    const handleSectionChange = (section: Sections) => {
        if (canNavigateToSection(section)) {
            setCurrentSection(section);
        }
    };

    useEffect(() => {
        // Update completion state when data props change
        setCompletedSections(mapDataToSections(question, userResume, situation, details, answer));
    }, [question, userResume, situation, details, answer]);

    // Render the current section component
    const SectionComponent = sectionComponents[currentSection];

    return (

        <div className='relative w-full h-full overflow-hidden'>
            <div className='h-12 w-full'>
                <BehavioralsMenu
                    sections={sections}
                    currentSection={currentSection}
                    setCurrentSection={handleSectionChange}
                />
            </div>
            <div className='w-full h-full flex justify-center overflow-y-scroll'>
                <div className={`max-w-3xl justify-center ${[Sections.Question, Sections.Resume, Sections.Situation, Sections.Details].includes(currentSection) && 'flex items-center'}`}>
                    {<SectionComponent
                        questionId={questionId}
                        userId={userId}
                        resumes={resumes}
                        hasResumes={hasResumes}
                        selectedResumeId={selectedResumeId}
                        setSelectedResumeId={setSelectedResumeId}
                        resume={resume}
                        question={question}
                        situation={situation}
                        details={details}
                        answer={answer}
                        handleCompletion={handleSectionCompletion}
                    />}
                </div>
            </div>
        </div>
    );
};
