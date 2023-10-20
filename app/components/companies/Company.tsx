import React from 'react';

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
        location
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
        <div className="p-6 space-y-4">
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
            <div className="flex justify-center space-x-4">
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
        </div>
    );
};

export default CompanyProfile;
