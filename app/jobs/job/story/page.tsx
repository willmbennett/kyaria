'use client'
import demoJob from '../../../../examples/example_job.json'
import ChatWithGPT from '../../../components/ChatWithGPT';
import demoProfile from '../../../../examples/example_profile.json'
import { useState } from 'react';

export default function Page() {
    //const demoStory = "Results-driven Senior Software Engineer with 5+ years of experience in full-stack development, specializing in backend systems. Proficient in Java, Python, and JavaScript, with expertise in RESTful APIs and microservices architecture. Skilled in optimizing performance, implementing CI/CD pipelines, and migrating monolithic applications to scalable, modular systems. Strong problem-solving abilities and a collaborative mindset, combined with a Bachelor's Degree in Computer Science and a track record of delivering high-quality software solutions. Excited to leverage skills in Java, Spring, Docker, AWS, and Kubernetes to contribute to TechSolutions Inc.'s innovative software products.";
    const demoStory = ''
    const [story, setStory] = useState(demoStory);

    

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
            response={story}
        />
    </div>
  );
}
