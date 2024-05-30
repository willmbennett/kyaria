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
    userResume,
    profileId,
    currentPitch,
    desiredRole
}: {
    userId: string,
    userResume?: string,
    profileId: string,
    currentPitch?: string,
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
                    <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your pitch</h2>
                    <PitchGen
                        selectedResume={resume}
                        profileId={profileId}
                        currentPitch={currentPitch}
                        desiredRole={desiredRole}
                        activeSubscription={true}
                    />
                </div>
            }
        </>
    );
}
