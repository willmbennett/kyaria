'use client'

import ChatWithGPT from '../../ChatWithGPT';
import NestedItem from './NestedItem';
import { useState } from 'react';

export default function Resume({
    jobData,
    userProfile,
    userResume,
    setUserResume
}: {
    jobData: any,
    userProfile: profileFormat,
    userResume: profileFormat,
    setUserResume: any
}) {
    const [currentSummary, updateCurrentSummary ] = useState(userProfile.summary);

    const message = [
        {
            "role": "system",
            "content":
                `
                    You are an advanced career coach specialized in helping professionals articulate why they are the perfect fit for a job opportunity, as well as why the company is the perfect fit for them. The goal is to create a compelling, narrative-style story that can be shared in less than 30 seconds. These stories can include the individual's skills, experience, education, and personal aspirations. 
    
                    Here is an example:
                    <ul>
                        <li><strong>Hook:</strong> I've always been drawn to the intersection of technology and business strategy. It was only natural for me to major in both Computer Science and Economics at Dartmouth.</li>
                        <br />
                        <li><strong>Transition 1:</strong> Right out of college, I joined McKinsey because I felt it perfectly married these two disciplines.</li>
                        <br />
                        <li><strong>First Relevant Job:</strong> At McKinsey, my main focus was on SaaS companies, where I honed my skills in creating effective product roadmaps and improving operational efficiency.</li>
                        <br />
                        <li><strong>Transition 2:</strong> Though I was promoted to Senior Consultant, I started yearning for a role that allowed me to be closer to both the product and the customer. I wanted to be in the trenches, so to speak.</li>
                        <br />
                        <li><strong>Previous Job:</strong> So, I moved to Doximity as a Product Manager for their advertising product. There, I fully immersed myself in the nuances of product management: creating vision, understanding customers, and leading a cross-functional team of engineers and stakeholders.</li>
                        <br />
                        <li><strong>Transition 3:</strong> While I loved my time at Doximity, I've realized I want to contribute at an even greater scale. I want to deliver significant impact while collaborating with top-tier talent.</li>
                        <br />
                        <li><strong>Target Job:</strong> This leads me to why I'm interested in the Google Ads PM position. After talking to Jessica Fan, I'm convinced this role offers what I'm looking for. Moreover, I bring a unique combination of scrappiness and structure, thanks to my startup experience and consulting background.</li>
                        <br />
                        <li><strong>Wrap-up:</strong> I'd be happy to go into further details about my experiences and also keen to learn more about what you're looking for in a Product Manager for Google Ads.</li>
                    </ul>
                    `
        },
        {
            "role": "user",
            "content":
                `Based on the following details, help me craft a compelling, narrative-style story:
                    - Job Post: ${JSON.stringify(jobData)} 
                    - My professional experience: ${JSON.stringify(userProfile.professional_experience)} 
                    - My skills: ${JSON.stringify(userProfile.skills)} 
                    - My education: ${JSON.stringify(userProfile.education)}
                    `
        }
    ];



    return (
        <>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                {userResume.name}
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Title:</strong> {userProfile.title}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Email:</strong> {userProfile.email}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Phone:</strong> {userProfile.phone}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Location:</strong> {userProfile.location}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <a href={userProfile.social_links['LinkedIn']} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <a href={userProfile.social_links['Github']} target="_blank" rel="noopener noreferrer">Github</a>
                </p>

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Summary</h2>
                <ChatWithGPT
                    documentID={jobData._id}
                    updateRef={"userResume.summary"}
                    message={message}
                    currentState={currentSummary}
                    updateState={updateCurrentSummary}
                />

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Areas of Expertise</h2>
                <ul className="list-disc list-inside text-left mb-8">
                    {userProfile.areas_of_expertise.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Skills</h2>
                <p className='text-left'>{userProfile.skills.join(', ')}</p>

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Professional Experience</h2>
                {userProfile.professional_experience.map((exp: any, index: number) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                        <p className="text-left text-lg mb-2">{exp.location}</p>
                        <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                        <ul className="list-disc list-inside text-left mb-8">
                            {exp.responsibilities.map((resp: string, i: number) => (
                                <NestedItem
                                    documentID={jobData._id}
                                    jobData={jobData}
                                    parentName={"userResume.professional_experience"}
                                    parentIndex={index}
                                    childName={"responsibilities"}
                                    childContent={resp}
                                    childIndex={i}
                                />
                            ))}
                        </ul>
                    </div>
                ))}

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Education</h2>
                {userProfile.education.map((edu, index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
                        <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
                        <ul className="list-disc list-inside text-left mb-8">
                            {edu.details.map((detail, i) => (
                                <NestedItem
                                    documentID={jobData._id}
                                    jobData={jobData}
                                    parentName={"userResume.education"}
                                    parentIndex={index}
                                    childName={"details"}
                                    childContent={detail}
                                    childIndex={i}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
