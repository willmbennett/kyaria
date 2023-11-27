import React from 'react';
import { Education } from '../../../../models/ResumeScan';

interface EducationProps {
    data: Education;
}

const EducationComp: React.FC<EducationProps> = ({ data }) => {
    return (
        <div className="p-6">
            {data.HighestDegree && (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Highest Degree</h3>
                    <p className="font-medium">{data.HighestDegree.Name.Raw} ({data.HighestDegree.Type})</p>
                </div>
            )}

            {data.EducationDetails && data.EducationDetails.map((detail, idx) => (
                <div key={idx} className="mb-6 border-b pb-4">
                    <h4 className="text-lg font-semibold mb-2">{detail.SchoolName?.Raw}</h4>

                    {detail.Location && (
                        <div className="mt-2 text-sm text-gray-600">
                            <p>{detail.Location.StreetAddressLines?.join(', ')}</p>
                            <p>{detail.Location.Municipality}, {detail.Location.Regions.join(', ')} {detail.Location.CountryCode}</p>
                        </div>
                    )}

                    {detail.Graduated && <p className="mt-2 text-sm">Graduated: {detail.Graduated.Value ? 'Yes' : 'No'}</p>}
                    
                    <p className="text-sm text-gray-600 mb-2">{detail.StartDate?.Date} - {detail.EndDate?.Date}</p>

                    {detail.Degree && (
                        <p className="font-medium mb-1">
                            {detail.Degree.Name.Raw}, {detail.Degree.Type}
                        </p>
                    )}

                    <div className="flex flex-wrap">
                        {detail.Majors && (
                            <div className="mr-6">
                                <strong>Majors:</strong> {detail.Majors.join(', ')}
                            </div>
                        )}
                        {detail.Minors && (
                            <div className="mr-6">
                                <strong>Minors:</strong> {detail.Minors.join(', ')}
                            </div>
                        )}
                    </div>

                    {detail.GPA && (
                        <div className="mt-2">
                            <strong>GPA:</strong> {detail.GPA.Score}/{detail.GPA.MaxScore} ({detail.GPA.ScoringSystem})
                        </div>
                    )}

                    {detail.Text && (
                        <p className="mt-2 text-gray-700 text-left">{detail.Text}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default EducationComp;