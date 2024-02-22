'use client'

import ChatWithGPT from '../../chat/ChatWithGPT';
import { updateJobAppAction } from '../../../board/_action';
import { Message } from 'ai';
import { CoverLetterViewer } from '../../coverletter/CoverLetterViewer';
import { useCallback, useState } from 'react';
import { Button } from '../../Button';
import { CoverLetterPDF } from '../CoverLetterPDF';
import ReactPDF from '@react-pdf/renderer';

interface CoverLetterProps {
    jobAppId: string,
    currentCoverLetter: string,
    userResume: any,
    userResumeStripped: any,
    jobStripped: any,
    job: any
    jobKeyWords: string[]
    activeSubscription: boolean
}

export default function CoverLetter({
    jobAppId,
    currentCoverLetter,
    userResume,
    userResumeStripped,
    jobStripped,
    job,
    jobKeyWords,
    activeSubscription
}: CoverLetterProps) {
    const [editCoverLetter, setEditCoverLetter] = useState(false)
    const message: Message[] = [
        {
            "id": '1',
            "role": "system",
            "content": `You are a professional cover letter writer specialized in creating personalized, compelling cover letters tailored to specific job descriptions. The letter should showcase the individual's experience, skills, and education, and should be organized into an introductory paragraph, a body, and a closing.
            Example:
            I am writing to express my interest in the Senior Software Engineer position at Google's New York City office, as listed on your careers page. With a strong background in backend development and a passion for problem-solving, I am excited about the opportunity to contribute to Google's innovative environment.

            As a graduate in Computer Science with over 6 years of software development experience, I meet all the mandatory requirements for this role. I have a proven track record in developing robust software solutions, primarily using Java and Python. In my current role at [Current Company], I have designed and maintained RESTful APIs, implemented microservices architecture, and managed relational databases like MySQL. This experience, combined with my solid understanding of data structures, algorithms, and system design, makes me confident that I can contribute effectively to your team.

            Beyond technical skills, I pride myself on my excellent communication abilities, which have enabled me to work effectively with cross-functional teams. I am also familiar with Google Cloud Platform and front-end technologies like React, matching your 'nice-to-have' criteria.

            Google's reputation for fostering an open and collaborative work environment resonates with me, and I am particularly attracted to your hybrid remote work model. I am enthusiastic about the chance to bring my unique blend of skills and experience to Google. Thank you for considering my application. I am looking forward to the opportunity to further discuss my suitability for this position in an interview.
            
            Don't include the salutation
            Tone: conversational, spartan, use less corporate jargon
            `
        },
        {
            "id": '2',
            "role": "user",
            "content": `Please write me a tailored cover letter for the following job description:
            - Job description: ${JSON.stringify(jobStripped)}
            Include information from my profile ${JSON.stringify(userResumeStripped)}
            
            Structure the cover letter into an introduction, body, and conclusion.
            `
        }
    ];

    const toggleEdit = () => {
        setEditCoverLetter(!editCoverLetter)
    }

    const downloadPDF = useCallback(async () => {
        const name = userResume.name?.replace(/\s/g, '_') || ''
        const blob = await ReactPDF.pdf(
            <CoverLetterPDF
                name={userResume.name}
                phone={userResume.phone}
                email={userResume.email}
                address={userResume.location}
                company={job.company}
                companyLocation={job.location}
                bodyText={currentCoverLetter}
            />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}_Cover_Letter.pdf`;
        link.click();
    }, [userResume, job, currentCoverLetter]);


    return (
        <div className='w-full flex flex-col items-center gap-4'>
            <h1 className="text-center sm:text-6xl text-4xl font-bold mb-8">
                Stand out with a cover letter
            </h1>
            <div className='flex gap-2'>
                <Button size='sm' onClick={toggleEdit}>{editCoverLetter ? 'Done' : 'Edit'}</Button>
                <Button type='button' size='sm' onClick={downloadPDF}>Download</Button>
            </div>
            {editCoverLetter &&
                <ChatWithGPT
                    documentID={jobAppId}
                    setKey='userCoverLetter'
                    message={message}
                    currentState={currentCoverLetter}
                    saveToDatabase={updateJobAppAction}
                    temp={0.5}
                    jobKeyWords={jobKeyWords}
                    activeSubscription={activeSubscription}
                />
            }
            {!editCoverLetter &&
                <CoverLetterViewer
                    userResume={userResume}
                    job={job}
                    currentCoverLetter={currentCoverLetter}
                />
            }
        </div>
    );
}
