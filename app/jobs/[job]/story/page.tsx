'use client'
import demoJob from '../../../../examples/example_job.json'
import ChatWithGPT from '../../../components/ChatWithGPT';
import demoProfile from '../../../../examples/example_profile.json'
import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { story, setStory } = useContext(JobContext);

const message = [
    {
        role: "system",
        content: 
        `You are a professional career coach. You will help me craft a story for why I want this job. I should be able to say it in less than 30 seconds.
        `
    },
    {
        role: "user",
        content: `
        Help me craft a story for why I want this job ${JSON.stringify(demoJob)} based on:
        1. My experience: ${JSON.stringify(demoProfile.professional_experience)}
        2. My skills: ${JSON.stringify(demoProfile.skills)}
        3. My education: ${JSON.stringify(demoProfile.education)}
        `
    }
    ]

  return (
    <div>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
            Let's write you a story
        </h1>
        <br/>
        <br/>
        <ChatWithGPT
            message={message}
            currentState={story}
            updateState={setStory}
        />
    </div>
  );
}
