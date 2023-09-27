'use client'

import { useState } from 'react';
import CoverLetter from './pages/CoverLetter';
import JobMenu from './JobMenu';
import UserStory from './pages/Story';
import Resume from './pages/Resume';
import Experience from './pages/Experience';
import JobDescription from './pages/JobDescription';
import Emails from './pages/Emails';

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

    const updateEmail = (
        {
            newContent,
            parentIndex
        }: {
            newContent: string,
            parentIndex: number
        }) => {
        console.log(newContent, parentIndex)

        const newApplication = application;
        newApplication.emails[parentIndex].content = newContent
        setApplication(newApplication)
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
        console.log(newContent, parentIndex, childIndex)

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
        console.log(newContent, parentIndex, childIndex)

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
        <div className="flex h-auto min-h-screen w-full lg:px-4 lg:mt-6">
            <div className="lg:w-1/4 hidden lg:flex lg:flex-col">
                <JobMenu
                    section={section}
                    setSection={setSection}
                />
            </div>
            <div className="lg:w-3/4 lg:w-full inline lg:flex lg:flex-col">
                <div className="bg-white p-6 rounded-lg shadow-md lg:w-full mx-2 lg:mx-3">
                    {jobApp && (
                        <>
                            {section == "jobDescription" && (
                                <JobDescription
                                    jobData={application.job}
                                />
                            )}
                            {section == "userResume" && (<>
                                <Resume
                                    application={application}
                                    updateResumeSummary={updateResumeSummary}
                                    updateResumeExperienceResponsibilities={updateResumeExperienceResponsibilities}
                                    updateResumeEductionDetails={updateResumeEductionDetails}
                                />
                            </>)}
                            {section == "userCoverLetter" && (<>
                                <CoverLetter
                                    jobApp={application}
                                    setCoverLetter={updateCoverLetter}
                                />
                            </>)}
                            {section == "emails" && jobApp.emails && (<>
                                <Emails
                                    jobApp={application}
                                    updateEmail={updateEmail}
                                />
                            </>)}
                            {section == "userStory" && (<>
                                <UserStory
                                    jobApp={application}
                                    setUserStory={updateStory}
                                />
                            </>)}
                            {section == "userExperience" && (<>
                                <Experience
                                    jobApp={application}
                                    updateExperienceStarStory={updateExperienceStarStory}
                                    updateEductionStarStory={updateEductionStarStory}
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
