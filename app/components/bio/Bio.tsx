'use client'

import { useState } from 'react';
import { ResumeClass } from '../../../models/Resume';
import ResumeDropdownMenu from '../ResumeDropdownMenu';
import { BioGen } from './BioGen';
import { useResumeDropDown } from '../../../lib/hooks/use-resume-dropdown';
import { ResumeDropAndSelect } from '../ResumeDropAndSelect';

export const Bio = ({
    userId,
    resumes,
    profileId,
    currentBio,
    desiredRole,
}: {
    userId: string,
    resumes: ResumeClass[],
    profileId: string,
    currentBio?: string,
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
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your bio</h2>
                <BioGen
                    selectedResume={selectedResume}
                    profileId={profileId}
                    currentBio={currentBio}
                    desiredRole={desiredRole}
                    activeSubscription={true}
                />
            </div>
        </>
    );
}
