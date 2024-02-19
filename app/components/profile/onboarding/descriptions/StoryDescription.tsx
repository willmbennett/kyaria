// InterviewStoriesDescription.tsx
import { useRouter } from 'next/navigation';
import { Button } from "../../../Button";

const InterviewStoriesDescription = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/stories');
  };

  return (
    <>
      <ul className="list-disc pl-5 text-left">
        <li>Utilize our AI to craft compelling narratives that showcase your skills and achievements.</li>
        <li>Receive feedback and suggestions to refine your interview stories and ace your behavioral interviews.</li>
      </ul>
      <Button size="md" className="mt-10" onClick={handleButtonClick}>
        Craft Interview Stories
      </Button>
    </>
  );
};

export default InterviewStoriesDescription;
