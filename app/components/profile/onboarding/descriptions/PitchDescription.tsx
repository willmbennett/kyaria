'use client'

import { useRouter } from 'next/navigation';
import { Button } from "../../../Button";

const ElevatorPitchDescription = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('pitch');
  };

  return (
    <>
      <ul className="list-disc pl-5 text-left">
        <li><b>Elevator Pitch Construction:</b> Craft a compelling elevator pitch that highlights your key strengths and achievements.</li>
      </ul>
      <Button size="md" className="mt-10" onClick={handleButtonClick}>
        Start Elevator Pitch
      </Button>
    </>
  );
};

export default ElevatorPitchDescription;