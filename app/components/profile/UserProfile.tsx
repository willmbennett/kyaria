import React from 'react';
import { ProfileClass } from '../../../models/Profile';

interface ProfileProps {
  userProfile: ProfileClass;
}

const UserProfile: React.FC<ProfileProps> = ({ userProfile }) => {

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl border-l-4 border-dartmouth-green">
          <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
            {userProfile.name}
          </h1>
        {userProfile.title && (
          <p className="text-left font-medium text-lg mb-4">
            <strong className="text-dartmouth-green ">Title:</strong> {userProfile.title}
          </p>
        )}
        {userProfile.email && (
          <p className="text-left font-medium text-lg mb-4">
            <strong className="text-dartmouth-green ">Email:</strong> {userProfile.email}
          </p>
        )}
        {userProfile.phone && (
          <p className="text-left font-medium text-lg mb-4">
            <strong className="text-dartmouth-green ">Phone:</strong> {userProfile.phone}
          </p>
        )}
        {userProfile.location && (
          <p className="text-left font-medium text-lg mb-4">
            <strong className="text-dartmouth-green ">Location:</strong> {userProfile.location}
          </p>
        )}
        {userProfile.social_links?.LinkedIn && (
          <p className="text-left font-medium text-lg mb-4">
            <a href={userProfile.social_links['LinkedIn']} target="_blank" rel="noopener noreferrer" className="text-dartmouth-green ">LinkedIn</a>
          </p>
        )}
        {userProfile.social_links?.Github && (
          <p className="text-left font-medium text-lg mb-4">
            <a href={userProfile.social_links['Github']} target="_blank" rel="noopener noreferrer" className="text-dartmouth-green ">Github</a>
          </p>
        )}
        {userProfile.summary && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b border-dartmouth-green">Summary</h2>
          <p className="text-left mb-8">{userProfile.summary}</p>
        </>)}
        {userProfile.areas_of_expertise && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b border-dartmouth-green">Areas of Expertise</h2>
          <ul className="list-disc list-inside text-left mb-8">
            {userProfile.areas_of_expertise.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </>)}
        {userProfile.skills && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b border-dartmouth-green">Skills</h2>
          <p className='text-left'>{userProfile.skills.join(', ')}</p>
        </>)}
        {userProfile.professional_experience && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b border-dartmouth-green">Professional Experience</h2>
          {userProfile.professional_experience.map((exp, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
              <p className="text-left text-lg mb-2">{exp.location}</p>
              <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
              {exp.responsibilities && (<>
                <ul className="list-disc list-inside text-left mb-8">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp.content}</li>
                  ))}
                </ul>
              </>)}
            </div>
          ))}
        </>)}
        {userProfile.education && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b border-dartmouth-green">Education</h2>
          {userProfile.education.map((edu, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
              <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
              {edu.details && (<>
                <ul className="list-disc list-inside text-left mb-8">
                  {edu.details.map((detail: any, i: number) => (
                    <li key={i}>{detail.content}</li>
                  ))}
                </ul>
              </>)}
            </div>
          ))}
        </>)}
      </div>
    </>);
}

export default UserProfile;

