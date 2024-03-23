import { useState } from 'react'; // Import useState if not already imported
import { Button } from "../../../Button";
import { Pitch } from '../../../pitch/Pitch';
import { ResumeClass } from '../../../../../models/Resume';
import { Questionnaire } from '../../../../../models/Profile';

const ElevatorPitchDescription = ({
  userId,
  story,
  resumes,
  profileId,
  questionnaire
}: {
  userId: string
  story: string | undefined;
  resumes: ResumeClass[] | undefined;
  profileId: string;
  questionnaire: Questionnaire | undefined;
}) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {story || isEditing ? (
        (resumes && questionnaire && (
          <Pitch
            userId={userId}
            resumes={resumes}
            profileId={profileId}
            currentPitch={story || ''}
            desiredRole={questionnaire.desiredRole}
          />
        )
        )
      ) : (
        <>
          <ul className="list-disc pl-5 text-left">
            <li><b>Elevator Pitch Construction:</b> Craft a compelling elevator pitch that highlights your key strengths and achievements.</li>
          </ul>
          <Button size="md" className="mt-10" onClick={() => setIsEditing(true)}>
            Create Elevator Pitch
          </Button>
        </>
      )}
    </>
  );
};

export default ElevatorPitchDescription;
