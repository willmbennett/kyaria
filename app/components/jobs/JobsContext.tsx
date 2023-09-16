'use client'

import React, { createContext, useState, useEffect } from 'react';
import demoJob from '../../../examples/example_job.json';
import emptyJob from '../../../examples/job_format.json';
import emptyProfile from '../../../examples/profile_format.json';
import demoCompany from '../../../examples/example_company.json';
import { fetchUserProfile } from '../../profile/profile-helper';
import { fetchUserJobs } from '../../jobs/job-helper';
import { useSession } from 'next-auth/react';

// Get all the potential links for jobs
export function generateStaticParams() {
    return [{ job: 'demo' }];
}

// Get the job data
export function getJob() {
    return demoJob;
}

// Get the company
export function getCompanies() {
    return demoCompany;
}

// All the data for the JobContext
export interface JobsContextType {
    userProfile: profileFormat;
    userJobs: jobFormat[];
    setUserJobs: any;
};

// Set up all the data for the context
const iJobsContextState: JobsContextType = {
    userProfile: emptyProfile as profileFormat,  // Assuring TypeScript that this JSON matches our type
    userJobs: [{
        ...emptyJob, 
        _id: "", 
        userId: "",
        userCoverLetter: "",
        userStory: "",
        userResume: emptyProfile as profileFormat,
        userQuestions: [{question: "", answer: ""}]
    }],  // Assuring TypeScript that this JSON matches our type
    setUserJobs: () => { },
};

export const JobsContext = createContext<JobsContextType>(iJobsContextState);

const JobsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const [hasProfile, setHasProfile] = useState(false);
    const [userProfile, setUserProfile] = useState<profileFormat>(emptyProfile);
    const [userJobs, setUserJobs] = useState<jobFormat[]>([{
        ...emptyJob, 
        _id: "", 
        userId: "",
        userCoverLetter: "",
        userStory: "",
        userResume: emptyProfile,
        userQuestions: [{question: "", answer: ""}]
    }]);

    const loadProfile = async (userId?: string) => {
        const userProfile = await fetchUserProfile(session?.user?.id || '');
        if (userProfile) {
            setUserProfile(userProfile);
            setHasProfile(true)
        } else {
            setHasProfile(false)
        }
    };

    // Load the current user's jobs
    const loadJobs = async (userid: string) => {
        console.log(session?.user?.id)
        if (session?.user?.id) {
            const userJobs = await fetchUserJobs(userid)
            console.log(userJobs)
            setUserJobs(userJobs)
        }
    };

    useEffect(() => {
        if (session?.user?.id) {
            loadProfile(session?.user?.id);
            loadJobs(session?.user?.id || '')
        }
    }, [session?.user?.id]); // Empty dependency array ensures this useEffect runs only once when component mounts.

    const exportValue: JobsContextType = {
        userProfile,
        userJobs,
        setUserJobs
    };

    return <JobsContext.Provider value={exportValue}>{children}</JobsContext.Provider>;
};

export default JobsContextProvider;

