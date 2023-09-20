'use client'

import { useState, useEffect } from 'react';
import CoverLetter from './CoverLetter';
import JobMenu from './JobMenu';
import UserStory from './Story';
import Resume from './Resume';
import Experience from './Experience';
import JobDescription from './JobDescription';
import { JobClass } from '../../../../models/Job';
import { ProfileClass } from '../../../../models/Profile';

export default function Job(
    { job,
        profile 
    }: { 
        job?: JobClass,
        profile?: ProfileClass
    }) {
    const [coverLetter, setCoverLetter] = useState(job?.userCoverLetter)
    const [userStory, setUserStory] = useState(job?.userStory)
    const [userResume, setUserResume] = useState(job?.userResume)
    const [section, setSection] = useState('jobDescription')

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
            {job && profile && userResume && (
                <>
                    {section == "jobDescription" && (
                        <JobDescription
                        jobData={job}
                    />
                    )}
                    {section == "userCoverLetter" && job && (<>
                        <CoverLetter
                            jobData={job}
                            userProfile={profile}
                            coverLetter={coverLetter}
                            setCoverLetter={setCoverLetter}
                        />
                    </>)}
                    {section == "userResume" && job && (<>
                        <Resume
                            jobData={job}
                            userProfile={profile}
                            userResume={userResume}
                            setUserResume={setUserResume}
                        />
                    </>)}
                    {section == "userStory" && job && (<>
                        <UserStory
                            jobData={job}
                            userProfile={profile}
                            userStory={userStory}
                            setUserStory={setUserStory}
                        />
                    </>)}
                    {section == "userExperience" && job && (<>
                        <Experience
                            jobData={job}
                            userResume={userResume}
                        />
                    </>)}
                </>)}
        </div>
        </div>
        </div>
        <div className='lg:hidden sticky bottom-0'>
            <JobMenu
                section={section}
                setSection={setSection}
            />
        </div>
    </>);
}
