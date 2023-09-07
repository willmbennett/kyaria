'use client'
import demoJob from '../../../../examples/example_job.json'
import ChatWithGPT from '../../../components/ChatWithGPT';
import demoProfile from '../../../../examples/example_profile.json'
import { useState } from 'react';

export default function Page() {
    const demoSummary = "Results-driven Senior Software Engineer with 5+ years of experience in full-stack development, specializing in backend systems. Proficient in Java, Python, and JavaScript, with expertise in RESTful APIs and microservices architecture. Skilled in optimizing performance, implementing CI/CD pipelines, and migrating monolithic applications to scalable, modular systems. Strong problem-solving abilities and a collaborative mindset, combined with a Bachelor's Degree in Computer Science and a track record of delivering high-quality software solutions. Excited to leverage skills in Java, Spring, Docker, AWS, and Kubernetes to contribute to TechSolutions Inc.'s innovative software products.";
    //const demoSummary = ''
    const [summary, setSummary] = useState(demoSummary);

    

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
            response={summary}
        />
    </div>
  );
}
