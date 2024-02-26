import { useState } from 'react'; // Import useState if not already imported
import { Button } from "../../../Button";
import { Pitch } from '../../../pitch/Pitch';
import { ResumeClass } from '../../../../../models/Resume';
import { Questionnaire } from '../../../../../models/Profile';

const ElevatorPitchDescription = ({
  story,
  activeSubscription,
  resumes,
  profileId,
  questionnaire
}: {
  story: string | undefined;
  activeSubscription: boolean;
  resumes: ResumeClass[] | undefined;
  profileId: string;
  questionnaire: Questionnaire | undefined;
}) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {(story && activeSubscription) || isEditing ? (
        (resumes && questionnaire && (
          <Pitch
            resumes={resumes}
            profileId={profileId}
            currentPitch={story || ''}
            desiredRole={questionnaire.desiredRole}
            activeSubscription={true}
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
