'use client'
import ChatWithGPT from '../../../components/ChatWithGPT';
import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { story, setStory, jobData, profileData } = useContext(JobContext);

    const message = [
        {
            "role": "system",
            "content": "You are an advanced career coach specialized in helping professionals articulate why they are the perfect fit for a job opportunity, as well as why the company is the perfect fit for them. The goal is to create a compelling, narrative-style story that can be shared in less than 30 seconds. These story can include the individual's skills, experience, education, and personal aspirations."
        },
        {
            "role": "user",
            "content": `Based on the following details, help me craft a compelling, narrative-style story:
                - Job Post: ${JSON.stringify(jobData)} 
                - My professional experience: ${JSON.stringify(profileData.professional_experience)} 
                - My skills: ${JSON.stringify(profileData.skills)} 
                - My education: ${JSON.stringify(profileData.education)}
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
                refresh={true}
                temp={0.7}
            />
        </div>
    );
}
