import React from 'react';

export default function UserProfile({
    userProfile
}: {
    userProfile: profileFormat
}) {

    return (
        <>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
              {userProfile.name}
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
              <p className="text-left font-medium text-lg mb-4">
                <strong>Title:</strong> {userProfile.title}
              </p>
              <p className="text-left font-medium text-lg mb-4">
                <strong>Email:</strong> {userProfile.email}
              </p>
              <p className="text-left font-medium text-lg mb-4">
                <strong>Phone:</strong> {userProfile.phone}
              </p>
              <p className="text-left font-medium text-lg mb-4">
                <strong>Location:</strong> {userProfile.location}
              </p>

              <h2 className="text-left font-bold text-2xl mb-4">Social Links</h2>
              <ul className="list-disc list-inside text-left mb-8">
                {Object.keys(userProfile.social_links).map((key, index) => (
                  <li key={index}><a href={userProfile.social_links[key]} target="_blank" rel="noopener noreferrer">{key}</a></li>
                ))}
              </ul>

              <h2 className="text-left font-bold text-2xl mb-4">Summary</h2>
              <p className="text-left mb-8">{userProfile.summary}</p>

              <h2 className="text-left font-bold text-2xl mb-4">Areas of Expertise</h2>
              <ul className="list-disc list-inside text-left mb-8">
                {userProfile.areas_of_expertise.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>

              <h2 className="text-left font-bold text-2xl mb-4">Skills</h2>
              <ul className="list-disc list-inside text-left mb-8">
                {userProfile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <h2 className="text-left font-bold text-2xl mb-4">Professional Experience</h2>
              {userProfile.professional_experience.map((exp, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                  <p className="text-left text-lg mb-2">{exp.location}</p>
                  <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                  <ul className="list-disc list-inside text-left mb-8">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <h2 className="text-left font-bold text-2xl mb-4">Education</h2>
              {userProfile.education.map((edu, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
                  <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
                  <ul className="list-disc list-inside text-left mb-8">
                    {edu.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
    );
}
