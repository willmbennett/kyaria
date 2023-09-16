'use client'
import "./resume.css";
import { useState } from 'react';
import GPT from './GPT';
//import { jobFormat } from "../../jobs/[id]/types";

export const Resume = (
    { jobData,
        profileData,
        newResume,
        setNewResume
    }:
        {
            jobData: jobFormat,
            profileData: profileFormat,
            newResume: profileFormat,
            setNewResume: any
        }) => {
    const [summary, setSummary] = useState(profileData.summary)

    function Bullet(
        {
            item,
            parentIndex,
            index
        }: {
            item: string,
            parentIndex: number,
            index: number
        }) {
        const currentBullet = profileData.professional_experience[parentIndex].responsibilities[index]
        const [bulletPoint, setBulletPoint] = useState(currentBullet)
        return (
            <li className="group">
                <GPT
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
                                `I'm applying for this job: ${JSON.stringify(jobData)}. Help me improve this resume bullet point ${item}. Keep the output under 132 characters.`
                        }
                    ]}
                    currentState={bulletPoint}
                    updateState={setBulletPoint}
                />
            </li>
        )
    }

    function BulletList({ list, parentIndex }: { list: any, parentIndex: number }) {
        return (
            <>
                {list.responsibilities.map((resp: any, index: number) => (
                    <div key={`job-${parentIndex}-${index}`}>
                        <Bullet
                            item={resp}
                            parentIndex={parentIndex}
                            index={index}
                        />
                    </div>
                ))}
            </>
        )
    }

    function ListSection({ list }: { list: any }) {

        return (
            <>
                {list.map((exp: any, parentIndex: number) => (
                    <div className="work-education" key={`job-${parentIndex}`}>
                        <div className="header">
                            <div className="place-title">
                                <div className="place-name">{exp.title}</div>
                                <div className="place-name-2"> - </div>
                                <div className="title-3">{exp.company}</div>
                            </div>
                            <div className="timeline">JAN 2023 - PRESENT</div>
                        </div>
                        <div className="desc">
                            <BulletList
                                list={exp}
                                parentIndex={parentIndex}
                            />
                        </div>
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className="template text-left">
            <div className="div">
                <div className="title">
                    <div className="text-wrapper">{profileData.name}</div>
                    <div className="text-wrapper-2">{profileData.title}</div>
                </div>
                <div className="auto-layout-left">
                    <div className="p group">
                        <GPT
                            message={[
                                {
                                    "role": "system",
                                    "content":
                                        `You are an advanced career coach specialized in writing resume professional resume summaries. Limit the output to two sentances.
                                        `
                                },
                                {
                                    "role": "user",
                                    "content":
                                        `I'm applying for this job: ${JSON.stringify(jobData)}. Help me improve this resume summary ${profileData.summary}.`
                                }
                            ]}
                            currentState={summary}
                            updateState={setSummary}
                        />
                    </div>
                    <div className="div-2">
                        <div className="title-2">Work Experience</div>
                        <ListSection
                            list={profileData.professional_experience}
                        />
                    </div>
                    <div className="education">
                        <div className="title-2">Education</div>
                        {profileData.education.map((edu: any, parentIndex: any) => (
                            <div className="work-education" key={`edu-${parentIndex}`}>
                                <div className="header">
                                    <div className="place-title">
                                        <div className="place-name">{edu.degree}</div>
                                        <div className="place-name-2"> - </div>
                                        <div className="title-3">{edu.institution}</div>
                                    </div>
                                </div>
                                <div className="desc">
                                    <ul>
                                        {edu.details.map((deets: any, index: any) => (
                                            <li key={`edu-${parentIndex}-${index}`}>
                                                {deets}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="auto-layout-right">
                    <div className="div-3">
                        <div className="title-2">Contact</div>
                        <div className="contact">
                            <a
                                className="portfolio-link"
                                href="https://www.linkedin.com/in/reyhan-space/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                ninapatel.design
                            </a>
                            <a
                                className="mail-to-link"
                                href="https://www.linkedin.com/in/reyhan-space/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                ninapatel@gmail.com
                            </a>
                            <div className="phone-number">+91 432 2222 322</div>
                        </div>
                    </div>
                    <div className="div-3">
                        <div className="title-2">Areas of Expertise</div>
                        <div className="div-wrapper">
                            <div className="text-wrapper-3">
                                <ul>
                                    {profileData.areas_of_expertise.map((deets: any, index: any) => (
                                        <li key={`AOE-${index}`}>
                                            {deets}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="div-3">
                        <div className="title-2">Skills</div>
                        <div className="div-wrapper">
                            <p className="text-wrapper-3">
                                {profileData.skills.join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
