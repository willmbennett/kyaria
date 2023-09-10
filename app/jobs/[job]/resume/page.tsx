'use client'

import ChatWithGPT from '../../../components/ChatWithGPT';
import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { summary, setSummary, jobData, profileData } = useContext(JobContext);

    const message = [
        {
            "role": "system",
            "content": "You are a professional resume writer specialized in crafting personalized resume summaries. The goal is to write a summary tailored to a specific job description. The summary should capture the individual's experience, skills, and education and should not exceed four sentences."
        },
        {
            "role": "user",
            "content": `Please write me a tailored resume summary for the following job description: 
            - Job description: ${JSON.stringify(jobData)} 
            Based on the following details: 
            1. My professional experience: ${JSON.stringify(profileData.professional_experience)} 
            2. My skills: ${JSON.stringify(profileData.skills)} 
            3. My education: ${JSON.stringify(profileData.education)} 
    
            Remember to keep the summary under four sentences.`
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
            {profileData.summary}
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
