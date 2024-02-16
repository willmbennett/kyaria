'use client'

import { useState } from 'react';
import { ResumeClass } from '../../../models/Resume';
import ResumeDropdownMenu from '../ResumeDropdownMenu';
import { PitchGen } from './PitchGen';

export const Pitch = ({
    resumes,
    profileId,
    currentPitch,
    desiredRole,
}: {
    resumes: ResumeClass[],
    profileId: string,
    currentPitch?: string,
    desiredRole?: string // I made this one optional for now
}) => {

    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId) || resumes[0];

    return (
        <>
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
            <p>This resume will be used to help generate your pitch.</p>
            <div className='pt-3'>
                <ResumeDropdownMenu
                    selectedResumeId={selectedResumeId}
                    setSelectedResumeId={setSelectedResumeId}
                    resumes={resumes}
                />
            </div>
            <div className='pt-5'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your pitch</h2>
                <PitchGen
                    selectedResume={selectedResume}
                    profileId={profileId}
                    currentPitch={currentPitch}
                    desiredRole={desiredRole}
                />
            </div>
        </>
    );
}
