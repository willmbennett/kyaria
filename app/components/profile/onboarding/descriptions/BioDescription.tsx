'use client';

import { useEffect, useState } from 'react';
import { Button } from "../../../Button";
import { Questionnaire } from '../../../../../models/Profile';
import { ResumeClass } from '../../../../../models/Resume';
import { Bio } from '../../../bio/Bio';

const LinkedInBioDescription = ({ bio, activeSubscription, resumes, profileId, questionnaire }: { 
  bio: string | undefined;
  activeSubscription: boolean;
  resumes: ResumeClass[] | undefined;
  profileId: string;
  questionnaire: Questionnaire | undefined;
}) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {(bio && activeSubscription) || isEditing ? ( resumes && questionnaire && (
        <Bio
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
