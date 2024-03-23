'use client'

import { ResumeClass } from '../../../models/Resume';
import ResumeDropdownMenu from '../ResumeDropdownMenu';
import { PitchGen } from './PitchGen';
import { DropResumeBanner } from '../chatbot/DropResumeBanner';
import { useResumeDropDown } from '../../../lib/hooks/use-resume-dropdown';
import { ResumeDropAndSelect } from '../ResumeDropAndSelect';
import { SetStateAction } from 'react';

export const Pitch = ({
    userId,
    resumes,
    profileId,
    currentPitch,
    desiredRole
}: {
    userId: string,
    resumes: ResumeClass[],
    profileId: string,
    currentPitch?: string,
    desiredRole?: string,
}) => {

    const { hasResumes, selectedResumeId, setSelectedResumeId, selectedResume } = useResumeDropDown({ resumes })

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
            <div className='pt-5'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your pitch</h2>
                <PitchGen
                    selectedResume={selectedResume}
                    profileId={profileId}
                    currentPitch={currentPitch}
                    desiredRole={desiredRole}
                    activeSubscription={true}
                />
            </div>
        </>
    );
}
