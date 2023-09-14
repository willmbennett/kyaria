'use client'

import React, { createContext, useState, FC } from 'react';
import demoJob from '../../../examples/example_job.json';
import emptyJob from '../../../examples/job_format.json';
import demoProfile from '../../../examples/example_profile.json';
import emptyProfile from '../../../examples/profile_format.json';
import demoCompany from '../../../examples/example_company.json';
import emptyCompany from '../../../examples/company_format.json';
import { jobFormat, UserContextType } from '../../jobs/[job]/types';
import { demoCoverLetter, demoStory, demoSummary, demoStarStories } from '../../jobs/[job]/demoData';

// Get all the potential links for jobs
export function generateStaticParams() {
    return [{ job: 'demo' }];
}

// Get the job data
export function getJob() {
    return demoJob;
}

// Get the user's profile
export function getProfile() {
    return demoProfile;
}

// Get the company
export function getCompanies() {
    return demoCompany;
}

// Set up all the data for the context
const iUserContextState: UserContextType = {
    jobData: emptyJob as jobFormat,  // Assuring TypeScript that this JSON matches our type
    profileData: emptyProfile as profileFormat,  // Assuring TypeScript that this JSON matches our type
    companyData: emptyCompany as companyFormat,  // Assuring TypeScript that this JSON matches our type
    newResume: emptyProfile as profileFormat,
    setNewResume: () => { },
    coverLetter: null,
    setCoverLetter: () => { },
    story: null,
    setStory: () => { },
    starStories: {},
    setStarStories: () => { }
};

export const JobContext = createContext<UserContextType>(iUserContextState);

const JobContextProvider = ({ children }: { children: React.ReactNode }) => {
    const jobData = getJob();
    const profileData = getProfile();
    const companyData = getCompanies();

    const [newResume, setNewResume] = useState<profileFormat>(demoProfile);

    const [coverLetter, setCoverLetter] = useState<string | null>(demoCoverLetter);

    const [story, setStory] = useState<string | null>(demoStory);

    const [starStories, setStarStories] = useState<{ [key: string]: string }>(demoStarStories);

    const exportValue: UserContextType = {
        jobData,
        profileData,
        companyData,
        newResume,
        setNewResume,
        coverLetter,
        setCoverLetter,
        story,
        setStory,
        starStories,
        setStarStories,
    };

    return <JobContext.Provider value={exportValue}>{children}</JobContext.Provider>;
};

export default JobContextProvider;

