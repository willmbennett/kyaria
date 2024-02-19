'use client'

import { useState } from 'react';
import { ResumeClass } from '../../../models/Resume';
import ResumeDropdownMenu from '../ResumeDropdownMenu';
import { Message } from 'ai';
import { ChatGPTNoEdit } from '../email/ChatGPTNoEdit';
import { PersonClass } from '../../../models/Person';
import PersonCard from '../networking/PersonCard';

export const LinkedIn = ({
    resumes,
    person,
}: {
    resumes: ResumeClass[],
    person: Partial<PersonClass>
}) => {

    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId) || resumes[0];

    const linkedInMessages: Message[] = [
        {
            id: '1',
            role: "system",
            content: "You are a LinkedIn networking expert, skilled at crafting personalized connection request messages. Your objective is to identify and highlight genuine commonalities between the user and their target connection based solely on explicitly provided information. Ensure each commonality is directly verifiable from the provided data about both individuals. Do not infer or assume additional commonalities. Keep the message under 300 characters, using a conversational tone and minimizing corporate jargon."
        },
        {
            id: "2",
            role: "user",
            content: `Craft a LinkedIn connection request for me. Recipient details: ${JSON.stringify(person.embeddingsText)}. My details: ${JSON.stringify(selectedResume)}. Focus on explicitly verifiable commonalities from the provided information. Tone: conversational, straightforward, minimal corporate jargon. Limit: 300 characters.`
        }
    ];



    return (
        <div className='flex flex-col gap-4'>
            <PersonCard person={person} />

            <div>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
                <p>This resume will be used to generate your linkedIn Message.</p>
                <ResumeDropdownMenu
                    selectedResumeId={selectedResumeId}
                    setSelectedResumeId={setSelectedResumeId}
                    resumes={resumes}
                />
            </div>
            <div className='pt-5 flex flex-col gap-4'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your message</h2>
                <ChatGPTNoEdit
                    message={linkedInMessages}
                />
            </div>
        </div>
    );
}
