import React from 'react';

interface OverviewProps {
    ProfessionalSummary?: string;
    Objective?: string;
    CoverLetter?: string;
    Hobbies?: string;
    Patents?: string;
    Publications?: string;
    SpeakingEngagements?: string;
}

const Overview: React.FC<OverviewProps> = ({
    ProfessionalSummary,
    Objective,
    CoverLetter,
    Hobbies,
    Patents,
    Publications,
    SpeakingEngagements
}) => {
    return (
        <div className="overview p-8">
            {ProfessionalSummary && <p><strong>Professional Summary:</strong> {ProfessionalSummary}</p>}
            {Objective && <p><strong>Objective:</strong> {Objective}</p>}
            {CoverLetter && <p><strong>Cover Letter:</strong> {CoverLetter}</p>}
            {Hobbies && <p><strong>Hobbies:</strong> {Hobbies}</p>}
            {Patents && <p><strong>Patents:</strong> {Patents}</p>}
            {Publications && <p><strong>Publications:</strong> {Publications}</p>}
            {SpeakingEngagements && <p><strong>Speaking Engagements:</strong> {SpeakingEngagements}</p>}
        </div>
    );
}

export default Overview;
