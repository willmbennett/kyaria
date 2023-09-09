'use client'
import demoJob from '../../../../examples/example_job.json'
import ChatWithGPT from '../../../components/ChatWithGPT';
import demoProfile from '../../../../examples/example_profile.json'
import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { summary, setSummary } = useContext(JobContext);

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
    <div>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
            Let's work on your Resume
        </h1>
        <br/>
        <h2>Your current summary: </h2>
        <br/>
        <div className="bg-white rounded-xl shadow-md p-4 transition border">
            {demoProfile.summary}
        </div>
        <br/>
        <h2>Your new summary: </h2>
        <br/>
        <ChatWithGPT
            message={message}
            currentState={summary}
            updateState={setSummary}
        />
    </div>
  );
}
