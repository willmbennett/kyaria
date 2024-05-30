'use client';
import { Questionnaire } from '../../../../../models/Profile';
import { Bio } from '../../../bio/Bio';

const LinkedInBioDescription = ({ userId, bio, userResume, profileId, questionnaire }: {
  userId: string;
  bio: string | undefined;
  userResume?: string;
  profileId: string;
  questionnaire: Questionnaire | undefined;
}) => {
  const renderBio = <Bio
    userId={userId}
    userResume={userResume}
    profileId={profileId}
    currentBio={bio}
    desiredRole={questionnaire?.desiredRole}
  />
  return (
    <>
      {bio ? renderBio
        :
        <>
          <ul className="list-disc pl-5 text-left">
            <li><b>LinkedIn Bio Optimization:</b> Utilize AI technology to optimize your LinkedIn bio, showcasing your achievements and skills effectively.</li>
            <li><b>Networking Opportunities:</b> Leverage your LinkedIn bio to connect with industry professionals and explore new career prospects.</li>
          </ul>
          {renderBio}
        </>
      }
    </>
  );
};

export default LinkedInBioDescription;
