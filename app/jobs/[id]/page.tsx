'use client'

import { useContext, useState, useEffect } from 'react';
import CoverLetter from '../../components/jobs/job/CoverLetter';
import JobMenu from '../../components/jobs/job/JobMenu';
import { JobsContext } from '../../components/jobs/JobsContext';
import UserStory from '../../components/jobs/job/Story';
import Resume from '../../components/jobs/job/Resume';

export default function JobPage({ params }: { params: { id: number } }) {
    let { userJobs, userProfile } = useContext(JobsContext);
    const jobData = userJobs.find(job => job._id === params.id)
    const [coverLetter, setCoverLetter] = useState('')
    const [userStory, setUserStory] = useState('')
    const [userResume, setUserResume] = useState(userProfile)
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
            {jobData && (
                <>
                    {section == "jobDescription" && (<>
                        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                            {jobData["jobTitle"]}
                        </h1>
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                            <p className="text-left font-medium text-lg mb-4">
                                <strong>Company:</strong> {jobData["company"]}
                            </p>
                            <p className="text-left font-medium text-lg mb-4">
                                <strong>Location:</strong> {jobData["location"]}
                            </p>
                            <p className="text-left font-medium text-lg mb-4">
                                <strong>Employment Type:</strong> {jobData["employmentType"]}
                            </p>
                            <p className="text-left font-medium text-lg mb-4">
                                <strong>Salary Range:</strong> {jobData["salaryRange"]}
                            </p>
                            <p className="text-left font-medium text-lg mb-4">
                                <strong>Remote:</strong> {jobData["remote"]}
                            </p>
                            <h2 className="text-left font-bold text-2xl mb-4">About the Company</h2>
                            <p className="text-left mb-8">
                                {jobData["aboutCompany"]}
                            </p>
                            <h2 className="text-left font-bold text-2xl mb-4">Job Description</h2>
                            <p className="text-left mb-8">
                                {jobData["jobDescription"]}
                            </p>
                            <h2 className="text-left font-bold text-2xl mb-4">Qualifications</h2>
                            <ul className="list-disc list-inside text-left mb-8">
                                {jobData["qualifications"].map((qualification: any, index: any) => (
                                    <li key={index}>{qualification}</li>
                                ))}
                            </ul>
                            <h2 className="text-left font-bold text-2xl mb-4">Responsibilities</h2>
                            <ul className="list-disc list-inside text-left">
                                {jobData["responsibilities"].map((responsibility: any, index: any) => (
                                    <li key={index}>{responsibility}</li>
                                ))}
                            </ul>
                        </div>
                    </>)}
                    {section == "userCoverLetter" && jobData?.userCoverLetter && (<>
                        <CoverLetter
                            jobData={jobData}
                            userProfile={userProfile}
                            coverLetter={jobData?.userCoverLetter}
                            setCoverLetter={setCoverLetter}
                        />
                    </>)}
                    {section == "userResume" && jobData?.userResume && (<>
                        <Resume
                            jobData={jobData}
                            userProfile={userProfile}
                            userResume={jobData?.userResume}
                            setUserResume={setUserResume}
                        />
                    </>)}
                    {section == "userStory" && jobData?.userStory && (<>
                        <UserStory
                            jobData={jobData}
                            userProfile={userProfile}
                            userStory={jobData?.userStory}
                            setUserStory={setUserStory}
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
