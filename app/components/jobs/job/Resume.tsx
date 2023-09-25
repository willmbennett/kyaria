'use client'

import ChatWithGPT from '../ChatWithGPT';
import Responsibility from './Responsibility';
import { updateResumeAction } from '../../../jobs/apps/[id]/_action';

export default function Resume({
    userProfile,
    job,
    application,
    updateResumeSummary,
    updateResumeExperienceResponsibilities,
    updateResumeEductionDetails

}: {
    userProfile: any,
    job: any,
    application: any,
    updateResumeSummary: any,
    updateResumeExperienceResponsibilities: any,
    updateResumeEductionDetails: any
}) {

    const userResume = application.userResume;

    const message = [
        {
            "role": "system",
            "content":
                `You are an advanced career coach specialized in writing resume professional resume summaries. Limit the output to two sentances.
                `
        },
        {
            "role": "user",
            "content":
                `I'm applying for this job: ${JSON.stringify(job)}. Help me improve this resume summary ${userProfile.summary} based on details from my profile: ${userProfile.summary}`
        }
    ];

    return (
        <>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                {userResume.name}
            </h1>
            <div>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Title:</strong> {userResume.title}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Email:</strong> {userResume.email}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Phone:</strong> {userResume.phone}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Location:</strong> {userResume.location}
                </p>
                {userResume.social_links && (
                    <p className="text-left font-medium text-lg mb-4">
                        <a href={userResume.social_links['LinkedIn']} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </p>
                )}
                {userResume.social_links && (
                    <p className="text-left font-medium text-lg mb-4">
                        <a href={userResume.social_links['Github']} target="_blank" rel="noopener noreferrer">Github</a>
                    </p>
                )}

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Summary</h2>
                <ChatWithGPT
                    documentID={application.userResume._id}
                    message={message}
                    setKey={"summary"}
                    currentState={application.userResume.summary}
                    updateState={updateResumeSummary}
                    saveToDatabase={updateResumeAction}
                />

                {userResume.areas_of_expertise && (<>
                    <h2 className="text-left font-bold text-2xl py-4 mb-4">Areas of Expertise</h2>
                    <ul className="list-disc list-inside text-left mb-8">
                        {userResume.areas_of_expertise.map((area: any, index: number) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </>)}
                {userResume?.skills && (<>
                    <h2 className="text-left font-bold text-2xl py-4 mb-4">Skills</h2>
                    <p className='text-left'>{userResume.skills.join(', ')}</p>
                </>)}
                {userResume.professional_experience && (<>
                    <h2 className="text-left font-bold text-2xl py-4 mb-4">Professional Experience</h2>
                    {userResume.professional_experience.map((exp: any, index: number) => (
                        <div key={index} className="mb-8">
                            <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                            <p className="text-left text-lg mb-2">{exp.location}</p>
                            <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                            <ul className="list-disc list-inside text-left mb-8">
                                {exp.responsibilities.map((resp: any, i: number) => (
                                    <div key={i}>
                                        <Responsibility
                                            documentID={application.userResume._id}
                                            setKey={`professional_experience.${index}.responsibilities.${i}.content`}
                                            content={resp.content}
                                            message={[
                                                {
                                                    "role": "system",
                                                    "content":
                                                        `You are an advanced career coach specialized in writing resume professional experience bullet points. 
                                                        Examples:
                                                        1. Maintained a 97% customer satisfaction rating as a customer care representative.
                                                        2. Exceeded department sales goals by an average of 15% quarter-on-quarter in 2016.
                                                        3. Cut page loading time by 50% by building a new cloud infrastructure, leading to a better customer experience.
                                                        `
                                                },
                                                {
                                                    "role": "user",
                                                    "content":
                                                        `I'm applying for this job: ${JSON.stringify(job)}. Help me improve this resume bullet point ${resp.content}. Keep the output under 132 characters.`
                                                }
                                            ]}
                                            updateResumeExperienceResponsibilities={updateResumeExperienceResponsibilities}
                                            saveToDatabase={updateResumeAction}
                                            parentIndex={index}
                                            childIndex={i}
                                        />
                                    </div>))}
                            </ul>
                        </div>
                    ))}
                </>)}

                {userResume.education && (<>
                    <h2 className="text-left font-bold text-2xl py-4 mb-4">Education</h2>
                    {userResume.education.map((edu: any, index: number) => (
                        <div key={index} className="mb-8">
                            <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
                            <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
                            <ul className="list-disc list-inside text-left mb-8">
                                {edu.details && (<>
                                    {edu.details.map((detail: any, i: number) => (
                                        <div key={i}>
                                            <Responsibility
                                                documentID={job.id}
                                                setKey={`education.${index}.details.${i}.content`}
                                                content={detail.content}
                                                message={[
                                                    {
                                                        "role": "system",
                                                        "content":
                                                            `You are an advanced career coach specialized in writing resume professional experience bullet points. 
                                                        Examples:
                                                        1. Maintained a 97% customer satisfaction rating as a customer care representative.
                                                        2. Exceeded department sales goals by an average of 15% quarter-on-quarter in 2016.
                                                        3. Cut page loading time by 50% by building a new cloud infrastructure, leading to a better customer experience.
                                                        `
                                                    },
                                                    {
                                                        "role": "user",
                                                        "content":
                                                            `I'm applying for this job: ${JSON.stringify(job)}. Help me improve this resume bullet point ${detail.content}. Keep the output under 132 characters.`
                                                    }
                                                ]}
                                                updateResumeExperienceResponsibilities={updateResumeEductionDetails}
                                                saveToDatabase={updateResumeAction}
                                                parentIndex={index}
                                                childIndex={i}
                                            />
                                        </div>
                                    ))}
                                </>)}
                            </ul>
                        </div>
                    ))}
                </>)}
            </div>
        </>
    );
}
