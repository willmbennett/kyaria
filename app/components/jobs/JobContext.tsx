'use client'

import React, { createContext, useState, FC } from 'react';
import demoJob from '../../../examples/example_job.json';
import emptyJob from '../../../examples/job_format.json';

export function generateStaticParams() {
    return [{ job: 'demo' }];
}

export function getJob() {
    return demoJob as jobFormat;
}

type jobFormat = {
    jobTitle: string,
    company: string,
    location: string,
    employmentType: string,
    salaryRange: string,
    remote: string,
    aboutCompany: string,
    jobDescription: string,
    mandatoryRequirements: Array<string>,
    niceToHave: Array<string>
}

type UserContextType = {
    jobData: jobFormat;
    summary: string | null;
    setSummary: (newString: string | null) => void;
    story: string | null;
    setStory: (newString: string | null) => void;
    details: Array<string>;
    setDetails: (newArray: Array<string>) => void;
};

const iUserContextState: UserContextType = {
    jobData: emptyJob as jobFormat,  // Assuring TypeScript that this JSON matches our type
    summary: null,
    setSummary: () => {},
    story: null,
    setStory: () => {},
    details: [''],
    setDetails: () => {}
};

export const JobContext = createContext<UserContextType>(iUserContextState);

const JobContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [jobData, setJobData] = useState<jobFormat>(getJob());
    const [summary, setSummary] = useState<string | null>(null);
    const [story, setStory] = useState<string | null>(null);
    const [details, setDetails] = useState<Array<string>>(['']);
    
    const exportValue: UserContextType = {
        jobData,
        summary,
        setSummary,
        story,
        setStory,
        details,
        setDetails,
    };

    return <JobContext.Provider value={exportValue}>{children}</JobContext.Provider>;
};

export default JobContextProvider;
