'use client'

import { useContext, useState, useEffect } from 'react';
import CoverLetter from '../../components/jobs/job/CoverLetter';
import JobMenu from '../../components/jobs/job/JobMenu';
import { JobsContext } from '../../components/jobs/JobsContext';
import UserStory from '../../components/jobs/job/Story';
import Resume from '../../components/jobs/job/Resume';
import Experience from '../../components/jobs/job/Experience';
import emptyProfile from '../../../examples/profile_format.json';
import JobDescription from '../../components/jobs/job/JobDescription';

export default function JobPage({ params }: { params: { id: number } }) {
    let { userJobs, userProfile } = useContext(JobsContext);
    const [jobData, setJobData] = useState<jobFormat>()
    const [coverLetter, setCoverLetter] = useState('')
    const [userStory, setUserStory] = useState('')
    const [userResume, setUserResume] = useState<profileFormat>(emptyProfile)
    const [section, setSection] = useState('jobDescription')

    useEffect(() => {
        const recievedJob = userJobs.find(job => job._id === params.id)
        setJobData(recievedJob)
        if(recievedJob) {
            setUserResume(recievedJob.userResume)
            setCoverLetter(recievedJob.userCoverLetter)
            setUserStory(recievedJob.userStory)
        }
    }, [userJobs]);

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
            {jobData && (
                <>
                    {section == "jobDescription" && (
                        <JobDescription
                        jobData={jobData}
                    />
                    )}
                    {section == "userCoverLetter" && jobData && (<>
                        <CoverLetter
                            jobData={jobData}
                            userProfile={userProfile}
                            coverLetter={coverLetter}
                            setCoverLetter={setCoverLetter}
                        />
                    </>)}
                    {section == "userResume" && jobData && (<>
                        <Resume
                            jobData={jobData}
                            userProfile={userProfile}
                            userResume={userResume}
                            setUserResume={setUserResume}
                        />
                    </>)}
                    {section == "userStory" && jobData && (<>
                        <UserStory
                            jobData={jobData}
                            userProfile={userProfile}
                            userStory={userStory}
                            setUserStory={setUserStory}
                        />
                    </>)}
                    {section == "userExperience" && jobData && (<>
                        <Experience
                            jobData={jobData}
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
