'use client';

import { useRouter } from 'next/navigation';
import { Button } from "../../../Button";
import ResumeBuilderHome from '../../../resumebuilder/ResumeBuilderHome';
import { ResumeClass } from '../../../../../models/Resume';

interface ResumeDescriptionProps {
  resumes: ResumeClass[] | undefined;
  userId: string;
  activeSubscription: boolean;
}

const ResumeDescription = ({ resumes, userId, activeSubscription }: ResumeDescriptionProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/resumebuilder');
  };

  return (
    <>
      {(resumes && resumes.length > 0) ? (
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <ResumeBuilderHome
            userId={userId}
            resumes={resumes}
            activeSubscription={activeSubscription}
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default ResumeDescription;
