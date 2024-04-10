'use client';

import ResumeBuilderHome from '../../../resumebuilder/ResumeBuilderHome';
import { ResumeClass } from '../../../../../models/Resume';
import { ResumeUploadForm } from '../../../resumebuilder/new/ResumeUploadForm';

interface ResumeDescriptionProps {
  resumes: ResumeClass[] | undefined;
  userId: string;
}

const ResumeDescription = ({ resumes, userId }: ResumeDescriptionProps) => {

  return (
    <>
      {(resumes && resumes.length > 0) ? (
      // {(resumes && resumes.length < 0) ? (
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <ResumeBuilderHome
            userId={userId}
            resumes={resumes}
          />
        </div>
      ) : (
        <>
          <ul className="list-disc pl-5 text-left mb-10">
            <li><b>AI-Enhanced Summaries:</b> Benefit from advanced AI that generates expertly crafted summaries, skill sets, and bullet points uniquely tailored to your professional background.</li>
            <li><b>Real-Time Feedback:</b> Receive immediate, in-depth feedback on your resume's content, allowing for swift improvements and enhancements.</li>
            <li><b>ATS-Optimized Formatting:</b> Ensure your resume stands out with formatting that's optimized for Applicant Tracking Systems (ATS), increasing your chances of making a memorable impact on potential employers.</li>
          </ul>
          <div className='mt-4 mb-10'>
            <ResumeUploadForm
              userId={userId}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ResumeDescription;
