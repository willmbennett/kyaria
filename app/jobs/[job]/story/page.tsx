'use client'
import ChatWithGPT from '../../../components/ChatWithGPT';
import demoProfile from '../../../../examples/example_profile.json'
import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { story, setStory, jobData } = useContext(JobContext);

    const message = [
        {
            "role": "system",
            "content": "You are an advanced career coach specialized in helping professionals articulate why they are the perfect fit for a job opportunity, as well as why the company is the perfect fit for them. The goal is to create two compelling stories that can each be shared in less than 30 seconds. These stories will be crafted based on the individual's skills, experience, education, and personal aspirations."
        },
        {
            "role": "user",
            "content": `Based on the following details, help me craft a compelling story:
                - Job Post: ${JSON.stringify(jobData)} 
                - My professional experience: ${JSON.stringify(demoProfile.professional_experience)} 
                - My skills: ${JSON.stringify(demoProfile.skills)} 
                - My education: ${JSON.stringify(demoProfile.education)}
            `
        }
    ]
    


    return (
        <div>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                Let's write you a story
            </h1>
            <br />
            <br />
            <ChatWithGPT
                message={message}
                currentState={story}
                updateState={setStory}
            />
        </div>
    );
}
