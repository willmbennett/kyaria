import { FC } from 'react';
import { ResumeQuality } from '../../resumetest/resumetest-helper';

interface Props {
    data: ResumeQuality[];
}

const ResumeQualityDisplay: FC<Props> = ({ data }) => {
    return (
        <div className="p-6 space-y-6">
            {data.map((quality, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                    <h2 className="text-2xl font-semibold mb-4">{quality.Level}</h2>
                    <ul className="space-y-4">
                        {quality.Findings && quality.Findings.map((finding, idx) => (
                            <li key={idx} className="p-4 bg-gray-50 rounded-lg">
                                <p className="mb-4 text-gray-600">{finding.Message}</p>
                                <ul className="space-y-2 ml-4">
                                    {finding.SectionIdentifiers && finding.SectionIdentifiers.map((section, sIdx) => (
                                        <li key={sIdx} className="flex flex-col">
                                            <p className="text-gray-600">Section Type: {section.SectionType}</p>
                                            <p className="text-gray-600">ID: {section.Id}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

    );
};

export default ResumeQualityDisplay;
