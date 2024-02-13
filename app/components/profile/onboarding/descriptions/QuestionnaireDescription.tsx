'use client'

import { useRouter } from 'next/navigation';
import { Button } from "../../../Button";

const QuestionnaireDescription = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/questionnaire');
  };

  return (
    <>
      <ul className="list-disc pl-5 text-left">
        <li>Answer a series of questions to provide detailed information about your skills and experience.</li>
        <li>Receive personalized recommendations based on your questionnaire responses.</li>
        <li>Get insights into areas where you can improve your profile for better job opportunities.</li>
      </ul>
      <Button size="md" className="mt-10" onClick={handleButtonClick}>
        Start Questionnaire
      </Button>
    </>
  );
};

export default QuestionnaireDescription;
