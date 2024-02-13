'use client'

import { useRouter } from 'next/navigation';
import { Button } from "../../../Button";

const LinkedInBioDescription = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('bio');
  };

  return (
    <>
      <ul className="list-disc pl-5 text-left">
        <li><b>LinkedIn Bio Optimization:</b> Utilize AI technology to optimize your LinkedIn bio, showcasing your achievements and skills effectively.</li>
        <li><b>Networking Opportunities:</b> Leverage your LinkedIn bio to connect with industry professionals and explore new career prospects.</li>
      </ul>
      <Button size="md" className="mt-10" onClick={handleButtonClick}>
        Create LinkedIn Bio
      </Button>
    </>
  );
};

export default LinkedInBioDescription;
