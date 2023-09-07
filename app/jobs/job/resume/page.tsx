'use client'
import demoJob from '../../../../examples/example_job.json'
import ChatWithGPT from '../../../components/ChatWithGPT';
import JobMenu from '../../../components/jobs/JobMenu';
import demoProfile from '../../../../examples/example_profile.json'
import { useRef, useState } from 'react';

export default function Page() {
    const [updatedSummary, setUpdatedSummary] = useState('');
    

const message = [
    {
        role: "system",
        content: 
        `You are a professional resume writer.
        `
    },
    {
        role: "user",
        content: `
        Write me a resume summary tailored for this job description ${JSON.stringify(demoJob)} based on:
        1. My experience: ${JSON.stringify(demoProfile.professional_experience)}
        2. My skills: ${JSON.stringify(demoProfile.skills)}
        3. My education: ${JSON.stringify(demoProfile.education)}
        Keep the length under 4 sentances. 
        `
    }
    ]

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
            <div className='flex flex-1 w-full'>
                <div className="w-1/4 bg-white">
                    <JobMenu />
                </div>
                <div className='flex flex-1 w-full flex-col items-center justify-center text-center'>
                    <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                        Let's work on your Resume
                    </h1>
                    <p>
                        {demoProfile.summary}
                    </p>
                    <ChatWithGPT
                        message={message}
                    />
                </div>
            </div>
        </main>
    </div>
  );
}
