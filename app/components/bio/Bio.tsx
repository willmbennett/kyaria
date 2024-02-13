'use client'

import { useState } from 'react';
import { ResumeClass } from '../../../models/Resume';
import ResumeDropdownMenu from '../ResumeDropdownMenu';
import { BioGen } from './BioGen';

export const Bio = ({
    resumes,
    profileId,
    currentBio,
    desiredRole,
}: {
    resumes: ResumeClass[],
    profileId: string,
    currentBio?: string,
    desiredRole?: string // I made this one optional for now
}) => {

    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId) || resumes[0];

    return (
        <>
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
            <p>This resume will be used to generate your bio.</p>
            <div>
                <ResumeDropdownMenu
                    selectedResumeId={selectedResumeId}
                    setSelectedResumeId={setSelectedResumeId}
                    resumes={resumes}
                />
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your bio</h2>
            <BioGen
                selectedResume={selectedResume}
                profileId={profileId}
                currentBio={currentBio}
                desiredRole={desiredRole}
            />
        </>
    );
}
