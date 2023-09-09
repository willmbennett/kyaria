'use client'

import React, { createContext, useState } from 'react';
import demoJob from '../../../examples/example_job.json'
import emptyJob from '../../../examples/job_format.json'

export function generateStaticParams() {
    return [{ job: 'demo' }]
}

export function getJob() {
    return demoJob
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
    jobData: jobFormat,
    summary: string | null,
    setSummary: (newString: any) => void,
    story: string | null,
    setStory: (newString: any) => void
}

const iUserContextState = {
    jobData: emptyJob,
    summary: null,
    setSummary: () => { },
    story: null,
    setStory: () => { },
    context: null,
    setContext: () => { }
}

export const JobContext = createContext<UserContextType>(iUserContextState);

export default function JobContextProvider({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    // Data on the job
    const [jobData, setJobData] = useState(getJob());

    // The summary created by ChatGPT for the user
    //const demoSummary = "Results-driven Senior Software Engineer with 5+ years of experience in full-stack development, specializing in backend systems. Proficient in Java, Python, and JavaScript, with expertise in RESTful APIs and microservices architecture. Skilled in optimizing performance, implementing CI/CD pipelines, and migrating monolithic applications to scalable, modular systems. Strong problem-solving abilities and a collaborative mindset, combined with a Bachelor's Degree in Computer Science and a track record of delivering high-quality software solutions. Excited to leverage skills in Java, Spring, Docker, AWS, and Kubernetes to contribute to TechSolutions Inc.'s innovative software products.";
    const demoSummary = "";
    const [summary, setSummary] = useState(demoSummary);

    // The story created by ChatGPT for the user
    //const demoStory = "Results-driven Senior Software Engineer with 5+ years of experience in full-stack development, specializing in backend systems. Proficient in Java, Python, and JavaScript, with expertise in RESTful APIs and microservices architecture. Skilled in optimizing performance, implementing CI/CD pipelines, and migrating monolithic applications to scalable, modular systems. Strong problem-solving abilities and a collaborative mindset, combined with a Bachelor's Degree in Computer Science and a track record of delivering high-quality software solutions. Excited to leverage skills in Java, Spring, Docker, AWS, and Kubernetes to contribute to TechSolutions Inc.'s innovative software products.";
    const demoStory = "";
    const [story, setStory] = useState(demoStory);

    const exportValue = {
        jobData, setJobData,
        summary, setSummary,
        story, setStory
    }

    return <JobContext.Provider value={exportValue}>{children}</JobContext.Provider>
}