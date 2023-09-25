'use client'

import { useState } from 'react';
import CoverLetter from './CoverLetter';
import JobMenu from './JobMenu';
import UserStory from './Story';
import Resume from './Resume';
import Experience from './Experience';
import JobDescription from './JobDescription';

export default function Job(
    { jobApp
    }: {
        jobApp: any
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
        <div className="flex h-auto min-h-screen min-w-full lg:px-4 lg:mt-6">
                <div className="w-1/4 hidden lg:flex lg:flex-col">
                    <JobMenu
                        section={section}
                        setSection={setSection}
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md lg:w-3/4 mx-2 lg:mx-3">
                    {jobApp && (
                        <>
                            {section == "jobDescription" && (
                                <JobDescription
                                    jobData={jobApp.job}
                                />
                            )}
                            {section == "userResume" && (<>
                                <Resume
                                    userProfile={jobApp.profile}
                                    job={jobApp.job}
                                    application={application}
                                    updateResumeSummary={updateResumeSummary}
                                    updateResumeExperienceResponsibilities={updateResumeExperienceResponsibilities}
                                    updateResumeEductionDetails={updateResumeEductionDetails}
                                />
                            </>)}
                            {section == "userCoverLetter" && (<>
                                <CoverLetter
                                    jobApp={jobApp}
                                    setCoverLetter={updateCoverLetter}
                                />
                            </>)}
                            {section == "userStory" && (<>
                                <UserStory
                                    jobApp={jobApp}
                                    setUserStory={updateStory}
                                />
                            </>)}
                            {section == "userExperience" && (<>
                                <Experience
                                    jobApp={jobApp}
                                    updateExperienceStarStory={updateExperienceStarStory}
                                    updateEductionStarStory={updateEductionStarStory}
                                />
                            </>)}
                        </>)}
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
