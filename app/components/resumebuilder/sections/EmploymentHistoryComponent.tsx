import React from 'react';
import { EmploymentHistory } from '../../../../models/ResumeScan';

interface EmploymentProps {
    data: EmploymentHistory;
}

const EmploymentHistoryComponent: React.FC<EmploymentProps> = ({ data }) => {
    return (
        <div className="p-6">
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Experience Summary</h3>
                {[
                    ['Description', data.ExperienceSummary.Description],
                    ['Months of Work Experience', data.ExperienceSummary.MonthsOfWorkExperience],
                    ['Management Experience', `${data.ExperienceSummary.MonthsOfManagementExperience} months`],
                    ['Executive Type', data.ExperienceSummary.ExecutiveType],
                    ['Average Months Per Employer', data.ExperienceSummary.AverageMonthsPerEmployer],
                    ['Fulltime Direct Hire Predictive Index', data.ExperienceSummary.FulltimeDirectHirePredictiveIndex],
                    ['Management Story', data.ExperienceSummary.ManagementStory],
                    ['Current Management Level', data.ExperienceSummary.CurrentManagementLevel],
                    ['Management Score', data.ExperienceSummary.ManagementScore],
                    ['Attention Needed', data.ExperienceSummary.AttentionNeeded]
                ].map(([label, value], index) => (
                    <p key={index} className="text-sm mt-2">
                        <strong>{label}:</strong> {value}
                    </p>
                ))}
            </section>

            {data.Positions.map((position, idx) => (
                <section key={idx} className="mb-6 border-b pb-4">
                    <header className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold">{position.JobTitle?.Raw}</h4>
                        <span className="text-sm text-gray-600">{position.StartDate?.Date} - {position.EndDate?.Date}</span>
                    </header>

                    {position.Employer && (
                        <div className="mb-2">
                            {position.Employer.Name?.Raw && <p className="font-medium">{position.Employer.Name.Raw}</p>}
                            {position.Employer.Location && (
                                <>
                                    <p className="text-sm"><strong>Location:</strong> {position.Employer.Location.Municipality}, {position.Employer.Location.CountryCode}</p>
                                    {position.Employer.Location.Regions && <p className="text-sm"><strong>Region:</strong> {position.Employer.Location.Regions.join(", ")}</p>}
                                    {position.Employer.Location.StreetAddressLines && <p className="text-sm"><strong>Street Address:</strong> {position.Employer.Location.StreetAddressLines.join(", ")}</p>}
                                    <p className="text-sm"><strong>Postal Code:</strong> {position.Employer.Location.PostalCode}</p>
                                    {position.Employer.Location.GeoCoordinates && <p className="text-sm"><strong>Geo Coordinates:</strong> Lat {position.Employer.Location.GeoCoordinates.Latitude}, Long {position.Employer.Location.GeoCoordinates.Longitude}</p>}
                                </>
                            )}
                        </div>
                    )}

                    <div className="mb-2">
                        {position.RelatedToByDates && <p className="text-sm"><strong>Related to by Dates:</strong> {position.RelatedToByDates.join(", ")}</p>}
                        <p className="text-sm"><strong>Self Employed:</strong> {position.IsSelfEmployed ? "Yes" : "No"}</p>
                        <p className="text-sm"><strong>Is Current:</strong> {position.IsCurrent ? "Yes" : "No"}</p>
                        {position.Description && <p className="text-sm mt-2"><strong>Description:</strong> {position.Description}</p>}
                    </div>

                    <div className="mb-2">
                        {position.Bullets && (
                            <ul className="list-disc pl-5">
                                {position.Bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="text-sm">{bullet.Text}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default EmploymentHistoryComponent;
