'use client';

import { useEffect, useState } from 'react';
import { Button } from "../../../Button";
import { Questionnaire } from '../../../../../models/Profile';
import { ResumeClass } from '../../../../../models/Resume';
import { Bio } from '../../../bio/Bio';

const LinkedInBioDescription = ({ userId, bio, resumes, profileId, questionnaire }: {
  userId: string;
  bio: string | undefined;
  resumes: ResumeClass[] | undefined;
  profileId: string;
  questionnaire: Questionnaire | undefined;
}) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {bio || isEditing ? (resumes && questionnaire && (
        <Bio
          userId={userId}
          resumes={resumes}
          profileId={profileId}
          currentBio={bio}
          desiredRole={questionnaire.desiredRole}
        />
      )
      ) : (
        <>
          <ul className="list-disc pl-5 text-left">
            <li><b>LinkedIn Bio Optimization:</b> Utilize AI technology to optimize your LinkedIn bio, showcasing your achievements and skills effectively.</li>
            <li><b>Networking Opportunities:</b> Leverage your LinkedIn bio to connect with industry professionals and explore new career prospects.</li>
          </ul>
          <Button size="md" className="mt-10" onClick={() => setIsEditing(true)}>
            Create LinkedIn Bio
          </Button>
        </>
      )}
    </>
  );
};

export default LinkedInBioDescription;
