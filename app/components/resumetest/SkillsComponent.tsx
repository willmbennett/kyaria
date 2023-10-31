import React from 'react';
import { SkillsData } from '../../resumetest/resumetest-helper';

interface SkillsProps {
    data: SkillsData;
}

const SkillsComponent: React.FC<SkillsProps> = ({ data }) => {
    return (
        <div className="p-6">
            <table className="min-w-full border-collapse table-auto">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 font-semibold text-center">Skill</th>
                        <th className="border px-4 py-2 font-semibold text-center">Found In</th>
                        <th className="border px-4 py-2 font-semibold text-center">Experience (months)</th>
                        <th className="border px-4 py-2 font-semibold text-center">Last Used</th>
                    </tr>
                </thead>
                <tbody>
                    {data.Raw.map((skill, idx) => (
                        <tr key={idx}>
                            <td className="border px-4 py-2">{skill.Name}</td>
                            <td className="border px-4 py-2">
                                {skill.FoundIn.map(f => f.SectionType).join(', ')}
                            </td>
                            <td className="border px-4 py-2 text-sm">
                                {skill.MonthsExperience ? skill.MonthsExperience.Value : '-'}
                            </td>
                            <td className="border px-4 py-2 text-sm">
                                {skill.LastUsed ? skill.LastUsed.Value : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkillsComponent;
