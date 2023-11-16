import React from 'react';
import { ContactInformation } from '../../../resumetest/resumetest-helper';

interface ContactInformationProps {
    data: ContactInformation
}

const CARD = "mb-6 p-2 bg-gray-50 rounded-lg border-b border-gray-200"

const ContactInformationDisplay: React.FC<ContactInformationProps> = ({ data }) => {
    return (
        <div className="contactInfo p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {data.CandidateName && (
                <div className={CARD}>
                    <h3 className="text-xl font-medium mb-2">{data.CandidateName.FormattedName}</h3>
                    <p>Prefix: {data.CandidateName.Prefix}</p>
                    <p>Given Name: {data.CandidateName.GivenName}</p>
                    <p>Moniker: {data.CandidateName.Moniker}</p>
                    <p>Middle Name: {data.CandidateName.MiddleName}</p>
                    <p>Family Name: {data.CandidateName.FamilyName}</p>
                    <p>Suffix: {data.CandidateName.Suffix}</p>
                </div>
            )}

            {data.Telephones && (
                <div className={CARD}>
                    <h3 className="text-xl font-medium mb-2">Telephones</h3>
                    {data.Telephones.map((tel, index) => (
                        <div key={index} className="mb-2">
                            <p><span className="font-medium">Raw:</span> {tel.Raw}</p>
                            <p><span className="font-medium">Normalized:</span> {tel.Normalized}</p>
                            <p><span className="font-medium">Country Code:</span> {tel.InternationalCountryCode}</p>
                            <p><span className="font-medium">Area City Code:</span> {tel.AreaCityCode}</p>
                            <p><span className="font-medium">Subscriber:</span> {tel.SubscriberNumber}</p>
                        </div>
                    ))}
                </div>
            )}

            {data.EmailAddresses && (
                <div className={CARD}>
                    <h3 className="text-xl font-medium mb-2">Email Addresses</h3>
                    <ul className="list-disc list-inside">
                        {data.EmailAddresses.map((email, index) => (
                            <li key={index}>{email}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Location Section */}
            {data.Location && (
                <div className={CARD}>
                    <h3 className="text-xl font-medium mb-2">Location</h3>
                    <p><span className="font-medium">Country:</span> {data.Location.CountryCode}</p>
                    <p><span className="font-medium">Postal Code:</span> {data.Location.PostalCode}</p>
                    <p><span className="font-medium">Municipality:</span> {data.Location.Municipality}</p>
                    {data.Location.Regions && (
                        <div className="mb-2">
                            <p className="font-medium">Regions:</p>
                            <ul className="list-disc list-inside">
                                {data.Location.Regions.map((region, index) => (
                                    <li key={index}>{region}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {data.Location.StreetAddressLines && (
                        <div className="mb-2">
                            <p className="font-medium">Street Addresses:</p>
                            <ul className="list-disc list-inside">
                                {data.Location.StreetAddressLines.map((address, index) => (
                                    <li key={index}>{address}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {data.Location.GeoCoordinates && (
                        <div>
                            <p><span className="font-medium">Latitude:</span> {data.Location.GeoCoordinates.Latitude}</p>
                            <p><span className="font-medium">Longitude:</span> {data.Location.GeoCoordinates.Longitude}</p>
                            <p><span className="font-medium">Source:</span> {data.Location.GeoCoordinates.Source}</p>
                        </div>
                    )}
                </div>
            )}

            {/* WebAddresses Section */}
            {data.WebAddresses && (
                <div className={CARD}>
                    <h3 className="text-xl font-medium mb-2">Web Addresses</h3>
                    {data.WebAddresses.map((webAddress, index) => (
                        <div key={index} className="mb-2">
                            <p><span className="font-medium">Address:</span> <a href={webAddress.Address} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{webAddress.Address}</a></p>
                            <p><span className="font-medium">Type:</span> {webAddress.Type}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContactInformationDisplay;


