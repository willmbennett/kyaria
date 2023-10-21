import React from 'react';
import EmployeeChart from './EmployeeChart';
import Investments from './Investments';

const CompanyProfile = ({ companyData }: { companyData: any }) => {

    // Extract data from the API response
    const {
        name,
        description,
        logo,
        twitterUri,
        homepageUri,
        wikipediaUri,
        linkedInUri,
        angellistUri,
        crunchbaseUri,
        githubUri,
        blogUri,
        nbEmployeesMin,
        nbEmployeesMax,
        isPublic,
        foundedDate,
        industries,
        location,
        employeeCategories,
        founders,
        totalInvestment, // Include totalInvestment data
        investments, // Include investments data
    } = companyData;

    const links = [
        { name: 'Twitter', uri: twitterUri },
        { name: 'Homepage', uri: homepageUri },
        { name: 'Wikipedia', uri: wikipediaUri },
        { name: 'Crunchbase', uri: crunchbaseUri },
        { name: 'LinkedIn', uri: linkedInUri },
        { name: 'Blog', uri: blogUri },
        { name: 'GitHub', uri: githubUri },
        { name: 'Angel List', uri: angellistUri },
    ];

    return (
        <div className="p-6 space-y-4 w-full">
            {logo && (
                <img
                    src={logo}
                    alt={`${name} Logo`}
                    className="w-32 h-32 rounded-full mx-auto object-scale-down border shadow-md"
                />
            )}
            {name && <h1 className="text-3xl font-bold text-center">{name}</h1>}

            {location && location.address && (
                <p className="text-gray-600 text-center">{location.address}</p>
            )}

            {/* Links */}
            <div className="flex flex-col md:flex-row justify-center md:space-x-4">
                {links.map((link, index) => (
                    link.uri && (
                        <a
                            key={index}
                            href={`https://${link.uri}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {link.name}
                        </a>
                    )
                ))}
            </div>

            {description && <p className="text-gray-800 text-center">{description}</p>}

            {/* Additional company information */}
            {foundedDate && <p>Founded Date: {foundedDate}</p>}
            {nbEmployeesMin && nbEmployeesMax && (
                <p>Number of Employees: {nbEmployeesMin} - {nbEmployeesMax}</p>
            )}
            {typeof isPublic !== 'undefined' && (
                <p>Publicly Traded: {isPublic ? 'Yes' : 'No'}</p>
            )}

            {industries && industries.length > 0 && (
                <p>
                    <strong>Industries:</strong> {industries.join(', ')}
                </p>
            )}

            {/* Founders Section */}
            {founders && founders.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold my-4">Founders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {founders.map((founder: any, index: number) => (
                            <div key={index} className="bg-white p-4 rounded shadow-md">
                                <img
                                    src={founder.image}
                                    alt={`${founder.name} Image`}
                                    className="w-32 h-32 rounded-full mx-auto object-cover"
                                />
                                <h3 className="text-xl font-semibold mt-2">{founder.name}</h3>
                                <p className="text-gray-600">{founder.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold mt-4">Investments</h2>
            {totalInvestment && (
                <p>
                    Total Raised: {totalInvestment.currency}{' '} {(totalInvestment.value / 1000000).toFixed(0)}M
                </p>
            )}
            
            {Array.isArray(investments) && investments.length > 0 && (
                <Investments investments={investments} />
            )}

            <h2 className="text-2xl font-bold mt-4">Employee Breakdown</h2>
            <EmployeeChart employeeCategories={employeeCategories} />

        </div>
    );
};

export default CompanyProfile;
