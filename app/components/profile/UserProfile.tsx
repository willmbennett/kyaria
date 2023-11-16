import Link from 'next/link';
import React from 'react';
import { ProfileClass } from '../../../models/Profile';
import { EducationList } from './EducationList';
import { ProfessionalExperienceList } from './ProfessionalExperienceList';
import ProfileTextEdit from './ProfileTextEdit';
import ListItem from './ListItem';
import Section from '../resumetest/ui/Section';

interface ProfileProps {
  userProfile: ProfileClass;
  edit: boolean;
}

const UserProfile: React.FC<ProfileProps> = ({ userProfile, edit }) => {
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
    education,
    story,
    bio
  } = userProfile;

  return (
    <>
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl border-l-4 border-slate-900">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
          <ProfileTextEdit
            profileId={profileId}
            setKey={`name`}
            currentState={name}
            userCanEdit={edit}
          />
        </h1>
        <ProfileTextEdit
          label="Title"
          profileId={profileId}
          setKey={`title`}
          currentState={title || ''}
          userCanEdit={edit}
        />

        <ProfileTextEdit
          label="Email"
          profileId={profileId}
          setKey={`email`}
          currentState={email || ''}
          userCanEdit={edit}
        />

        <ProfileTextEdit
          label="Phone"
          profileId={profileId}
          setKey="phone"
          currentState={phone || ''}
          userCanEdit={edit}
        />

        <ProfileTextEdit
          label="Location"
          profileId={profileId}
          setKey="location"
          currentState={location || ''}
          userCanEdit={edit}
        />

        <div className="text-left font-medium text-lg mb-4">
          <Link href={social_links?.LinkedIn || 'https://www.linkedin.com/feed/'} target="_blank" rel="noopener noreferrer" >
            <ProfileTextEdit
              label="LinkedIn"
              profileId={profileId}
              setKey="social_links.LinkedIn"
              currentState={social_links?.LinkedIn || ''}
              userCanEdit={edit}
            />
          </Link>
        </div>
        <div className="text-left font-medium text-lg mb-4">
          <Link href={social_links?.Github || 'https://github.com/'} target="_blank" rel="noopener noreferrer" >
            <ProfileTextEdit
              label="Github"
              profileId={profileId}
              setKey="social_links.Github"
              currentState={social_links?.Github || ''}
              userCanEdit={edit}
            />
          </Link>
        </div>
        <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Bio</h2>
        <ProfileTextEdit
          profileId={profileId}
          setKey="bio"
          currentState={bio || ''}
          userCanEdit={edit}
        />

        <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Story</h2>
        <Section>
          <ProfileTextEdit
            profileId={profileId}
            setKey="story"
            currentState={story || ''}
            userCanEdit={edit}
          />
        </Section>

        <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Resume Summary</h2>
        <Section>
          <ProfileTextEdit
            profileId={profileId}
            setKey="summary"
            currentState={summary || ''}
            userCanEdit={edit}
          />
        </Section>

        {/*
        <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Areas of Expertise</h2>
        <ListItem
          skills={areas_of_expertise || []}
          profileId={profileId}
          setKey="areas_of_expertise"
          userCanEdit={edit}
        />
  */}

        <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b ">Skills</h2>
        <ListItem
          skills={skills || []}
          profileId={profileId}
          setKey="skills"
          userCanEdit={edit}
        />

        {professional_experience && (
          <ProfessionalExperienceList experiences={professional_experience} profileId={profileId} userCanEdit={edit} />
        )}

        {education && (
          <EducationList educationItems={education} profileId={profileId} userCanEdit={edit} />
        )}

      </div>
    </>);
}

export default UserProfile;

