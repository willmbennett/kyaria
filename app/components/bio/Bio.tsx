'use client'
import { BioGen } from './BioGen';
import { useResumeDropDown } from '../../../lib/hooks/use-resume-dropdown';
import { ResumeDropAndSelect } from '../ResumeDropAndSelect';

export const Bio = ({
    userId,
    userResume,
    profileId,
    currentBio,
    desiredRole,
}: {
    userId: string,
    userResume?: string,
    profileId: string,
    currentBio?: string,
    desiredRole?: string,
}) => {

    const { hasResumes, selectedResumeId, setSelectedResumeId, resumes, resume } = useResumeDropDown({ userId, userResume })

    return (
        <>
            <div className='pt-3'>
                <ResumeDropAndSelect
                    userId={userId}
                    resumes={resumes}
                    hasResumes={hasResumes}
                    selectedResumeId={selectedResumeId}
                    setSelectedResumeId={setSelectedResumeId}
                />
            </div>
            {resume &&
                <div className='pt-5'>
                    <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your bio</h2>
                    <BioGen
                        selectedResume={resume}
                        profileId={profileId}
                        currentBio={currentBio}
                        desiredRole={desiredRole}
                        activeSubscription={true}
                    />
                </div>
            }
        </>
    );
}
