'use client'

import React, { createContext, useState, FC } from 'react';
import demoJob from '../../../examples/example_job.json';
import emptyJob from '../../../examples/job_format.json';
import demoProfile from '../../../examples/example_profile.json';
import emptyProfile from '../../../examples/profile_format.json';

export function generateStaticParams() {
    return [{ job: 'demo' }];
}

export function getJob() {
    return demoJob;
}

export function getProfile() {
    return demoProfile;
}

type profileFormat = {
    name: string;
    title: string;
    email: string;
    phone: string;
    social_links: Record<string, string>;
    location: string;
    summary: string;
    skills: string[];
    professional_experience: {
      title: string;
      company: string;
      location: string;
      start_date: string;
      end_date: string;
      responsibilities: string[];
    }[];
    education: {
      degree: string;
      institution: string;
      location: string;
      details: string[];
    }[];
  };
  

type jobFormat = {
    jobTitle: string,
    company: string,
    location: string,
    employmentType: string,
    salaryRange: string,
    remote: string,
    aboutCompany: string,
    jobDescription: string,
    mandatoryRequirements: string[],
    niceToHave: string[]
}

type UserContextType = {
    jobData: jobFormat;
    profileData: profileFormat;
    summary: string | null;
    setSummary: (newString: string | null) => void;
    story: string | null;
    setStory: (newString: string | null) => void;
    details: Array<string>;
    setDetails: (newArray: Array<string>) => void;
    starStories: {[key: string]: any};
    setStarStories: (newObject: {[key: string]: any}) => void;
};

const iUserContextState: UserContextType = {
    jobData: emptyJob as jobFormat,  // Assuring TypeScript that this JSON matches our type
    profileData: emptyProfile as profileFormat,  // Assuring TypeScript that this JSON matches our type
    summary: null,
    setSummary: () => {},
    story: null,
    setStory: () => {},
    details: [''],
    setDetails: () => {},
    starStories: {},
    setStarStories: () => {}
};

export const JobContext = createContext<UserContextType>(iUserContextState);

const JobContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [jobData, setJobData] = useState<jobFormat>(getJob());
    const [profileData, setProfileData] = useState<profileFormat>(getProfile());
    const [summary, setSummary] = useState<string | null>(null);
    const [story, setStory] = useState<string | null>(null);
    const [details, setDetails] = useState<Array<string>>(['']);
    const [starStories, setStarStories] = useState({});
    
    const exportValue: UserContextType = {
        jobData,
        profileData,
        summary,
        setSummary,
        story,
        setStory,
        details,
        setDetails,
        starStories,
        setStarStories,
    };

    return <JobContext.Provider value={exportValue}>{children}</JobContext.Provider>;
};

export default JobContextProvider;
