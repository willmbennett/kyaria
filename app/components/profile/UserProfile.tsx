import Link from 'next/link';
import React from 'react';
import { ProfileClass } from '../../../models/Profile';
import { EducationList } from './EducationList';
import { ProfessionalExperienceList } from './ProfessionalExperienceList';
import ProfileTextEdit from './ProfileTextEdit';

interface ProfileProps {
  userProfile: ProfileClass;
}

const UserProfile: React.FC<ProfileProps> = ({ userProfile }) => {
  const profileId = userProfile._id.toString()
  const { name,
    email,
    title,
    phone,
    location,
    social_links,
    summary,
    areas_of_expertise,
    skills,
    professional_experience,
    education
  } = userProfile;

  return (
    <>
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl border-l-4 border-slate-900">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
          <ProfileTextEdit
            profileId={profileId}
            setKey={`name`}
            currentState={name}
          />
        </h1>
        {title && (
          <ProfileTextEdit
            label="Title"
            profileId={profileId}
            setKey={`title`}
            currentState={title}
          />
        )}

        {email && (
          <ProfileTextEdit
            label="Email"
            profileId={profileId}
            setKey={`email`}
            currentState={email}
          />
        )}

        {phone && (
          <ProfileTextEdit
            label="Phone"
            profileId={profileId}
            setKey="phone"
            currentState={phone}
          />
        )}

        {location && (
          <ProfileTextEdit
            label="Location"
            profileId={profileId}
            setKey="location"
            currentState={location}
          />
        )}

        {social_links?.LinkedIn && (
          <p className="text-left font-medium text-lg mb-4">
            <Link href={social_links.LinkedIn} target="_blank" rel="noopener noreferrer" >
              <ProfileTextEdit
                label="LinkedIn"
                profileId={profileId}
                setKey="social_links.LinkedIn"
                currentState={social_links.LinkedIn}
              />
            </Link>
          </p>
        )}
        {social_links?.Github && (
          <p className="text-left font-medium text-lg mb-4">
            <Link href={social_links.Github} target="_blank" rel="noopener noreferrer" >
              <ProfileTextEdit
                label="Github"
                profileId={profileId}
                setKey="social_links.Github"
                currentState={social_links.Github}
              />
            </Link>
          </p>
        )}
        {summary && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Summary</h2>
          <ProfileTextEdit
            profileId={profileId}
            setKey="summary"
            currentState={summary}
          />
        </>)}

        {areas_of_expertise && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Areas of Expertise</h2>
          <ul className="list-disc list-inside text-left mb-8">
            {areas_of_expertise.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </>)}

        {skills && (<>
          <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Skills</h2>
          <p className='text-left'>{skills.join(', ')}</p>
        </>)}

        {professional_experience && (
          <ProfessionalExperienceList experiences={professional_experience} profileId={profileId} />
        )}

        {education && (
          <EducationList educationItems={education} profileId={profileId} />
        )}

      </div>
    </>);
}

export default UserProfile;

