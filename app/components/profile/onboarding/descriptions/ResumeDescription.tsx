'use client'
 
import { useRouter } from 'next/navigation'
import { Button } from "../../../Button";

const ResumeDescription = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/resumebuilder');
  };

  return (
    <>
      <ul className="list-disc pl-5 text-left">
        <li><b>AI-Enhanced Summaries:</b> Benefit from advanced AI that generates expertly crafted summaries, skill sets, and bullet points uniquely tailored to your professional background.</li>
        <li><b>Real-Time Feedback:</b> Receive immediate, in-depth feedback on your resume's content, allowing for swift improvements and enhancements.</li>
        <li><b>ATS-Optimized Formatting:</b> Ensure your resume stands out with formatting that's optimized for Applicant Tracking Systems (ATS), increasing your chances of making a memorable impact on potential employers.</li>
      </ul>
      <Button size="md" className="mt-10" onClick={handleButtonClick}>
        Upload Resume
      </Button>
    </>
  );
};

export default ResumeDescription;
