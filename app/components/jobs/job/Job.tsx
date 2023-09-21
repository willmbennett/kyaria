'use client'

import { useState, useEffect } from 'react';
import CoverLetter from './CoverLetter';
import JobMenu from './JobMenu';
import UserStory from './Story';
import Resume from './Resume';
import Experience from './Experience';
import JobDescription from './JobDescription';
import { JobApplicationClass } from '../../../../models/JobApplication';

export default function Job(
    { jobApp
    }: {
        jobApp: JobApplicationClass
    }) {
    const [section, setSection] = useState('jobDescription')
    const [application, setApplication] = useState(jobApp)

    // Reload the last call
    const updateResumeSummary = ({ newContent }: { newContent: string }) => {
        if (application) {
            const newApplication = application;
            newApplication.userResume.summary = newContent
            setApplication(newApplication)
        }
    };

    const updateCoverLetter = ({ newContent }: { newContent: string }) => {
        if (application) {
            const newApplication = application;
            newApplication.userCoverLetter = newContent
            setApplication(newApplication)
        }
    };

    const updateStory = ({ newContent }: { newContent: string }) => {
        if (application) {
            const newApplication = application;
            newApplication.userCoverLetter = newContent
            setApplication(newApplication)
        }
    };

    const updateExperienceStarStory = (
        {
            newContent,
            parentIndex,
            childIndex
        }: {
            newContent: string,
            parentIndex: number,
            childIndex: number
        }) => {
        //console.log(newContent, experienceIndex, responsibilityIndex)

        const newApplication = application;
        newApplication.userResume.professional_experience[parentIndex].responsibilities[childIndex].starStory = newContent
        setApplication(newApplication)
    };

    const updateEductionStarStory = (
        {
            newContent,
            parentIndex,
            childIndex
        }: {
            newContent: string,
            parentIndex: number,
            childIndex: number
        }) => {
        //console.log(newContent, experienceIndex, responsibilityIndex)

        const newApplication = application;
        newApplication.userResume.education[parentIndex].details[childIndex].starStory = newContent
        setApplication(newApplication)
    };

    const updateResumeExperienceResponsibilities = (
        {
            newContent,
            parentIndex,
            childIndex
        }: {
            newContent: string,
            parentIndex: number,
            childIndex: number
        }) => {
        //console.log(newContent, experienceIndex, responsibilityIndex)

        const newApplication = application;
        newApplication.userResume.professional_experience[parentIndex].responsibilities[childIndex].content = newContent
        setApplication(newApplication)
    };

    const updateResumeEductionDetails = (
        {
            newContent,
            parentIndex,
            childIndex
        }: {
            newContent: string,
            parentIndex: number,
            childIndex: number
        }) => {
        //console.log(newContent, experienceIndex, responsibilityIndex)

        const newApplication = application;
        newApplication.userResume.education[parentIndex].details[childIndex].content = newContent
        setApplication(newApplication)
    };

    return (<>
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
            <div className="flex flex-1 w-full">
                <div className="w-1/4 hidden lg:flex lg:flex-col">
                    <JobMenu
                        section={section}
                        setSection={setSection}
                    />
                </div>
                <div className="flex flex-1 w-full flex-col items-center text-center p-1 lg:p-8">
                    {jobApp && (
                        <>
                            {section == "jobDescription" && (
                                <JobDescription
                                    jobData={jobApp.job}
                                />
                            )}
                            {section == "userResume" && jobApp && (<>
                                <Resume
                                    userProfile={jobApp.profile}
                                    job={jobApp.job}
                                    application={application}
                                    updateResumeSummary={updateResumeSummary}
                                    updateResumeExperienceResponsibilities={updateResumeExperienceResponsibilities}
                                    updateResumeEductionDetails={updateResumeEductionDetails}
                                />
                            </>)}
                            {section == "userCoverLetter" && jobApp && (<>
                                <CoverLetter
                                    jobData={jobApp.job}
                                    userProfile={jobApp.profile}
                                    coverLetter={jobApp.userCoverLetter}
                                    setCoverLetter={updateCoverLetter}
                                />
                            </>)}
                            {section == "userStory" && jobApp && (<>
                                <UserStory
                                    jobData={jobApp}
                                    userProfile={jobApp.profile}
                                    userStory={jobApp.userStory}
                                    setUserStory={updateStory}
                                />
                            </>)}
                            {section == "userExperience" && jobApp && (<>
                                <Experience
                                    job={jobApp}
                                    userResume={jobApp.userResume}
                                    updateExperienceStarStory={updateExperienceStarStory}
                                    updateEductionStarStory={updateEductionStarStory}
                                    application={application}
                                />
                            </>)}
                        </>)}
                </div>
            </div>
        </div>
        <div className='lg:hidden sticky bottom-0 w-full'>
            <JobMenu
                section={section}
                setSection={setSection}
            />
        </div>
    </>);
}
