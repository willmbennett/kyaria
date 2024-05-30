import { Pitch } from '../../../pitch/Pitch';
import { Questionnaire } from '../../../../../models/Profile';

const ElevatorPitchDescription = ({
  userId,
  story,
  userResume,
  profileId,
  questionnaire
}: {
  userId: string
  story?: string;
  userResume?: string;
  profileId: string;
  questionnaire?: Questionnaire;
}) => {

  const renderPitch = <Pitch
    userId={userId}
    userResume={userResume}
    profileId={profileId}
    currentPitch={story || ''}
    desiredRole={questionnaire?.desiredRole}
  />
  return (
    <>
      {story ? renderPitch :
        <>
          <ul className="list-disc pl-5 text-left">
            <li><b>Elevator Pitch Construction:</b> Craft a compelling elevator pitch that highlights your key strengths and achievements.</li>
          </ul>
          {renderPitch}
        </>
      }
    </>
  );
};

export default ElevatorPitchDescription;
