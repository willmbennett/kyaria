'use client'

import { useState } from 'react';
import { ResumeClass } from '../../../models/Resume';
import ResumeDropdownMenu from '../ResumeDropdownMenu';
import { Message } from 'ai';
import { ChatGPTNoEdit } from '../chat/ChatGPTNoEdit';
import PersonCard from '../networking/PersonCard';
import { PersonClass } from '../../../models/Person';

export const Email = ({
    resumes,
    person,
}: {
    resumes: ResumeClass[],
    person: Partial<PersonClass>
}) => {

    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId) || resumes[0];

    const emailMessages: Message[] = [
        {
            id: '1',
            role: "system",
            content: "You are a networking email expert, skilled at crafting personalized networking outreach emails. Your objective is to identify and highlight genuine commonalities between the user and their target connection based solely on explicitly provided information. Ensure each commonality is directly verifiable from the provided data about both individuals. Do not infer or assume additional commonalities. Keep the message between two and three paragraphs, with each paragraph not containing more than three sentences, using a conversational tone and minimizing corporate jargon."
        },
        {
            id: "2",
            role: "user",
            content: `Craft a networking email for me. Recipient details: ${JSON.stringify(person)}. My details: ${JSON.stringify(selectedResume)}. Focus on explicitly verifiable commonalities from the provided information. Tone: conversational, straightforward, minimal corporate jargon.`
        }
    ];

    return (
        <div className='flex flex-col gap-4'>
            <PersonCard person={person} />

            <div>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
                <p>This resume will be used to generate your email.</p>
                <ResumeDropdownMenu
                    selectedResumeId={selectedResumeId}
                    setSelectedResumeId={setSelectedResumeId}
                    resumes={resumes}
                />
            </div>
            <div className='pt-5 flex flex-col gap-4 pb-10'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate your message</h2>
                <ChatGPTNoEdit
                    message={emailMessages}
                />
            </div>
        </div>
    );
}
