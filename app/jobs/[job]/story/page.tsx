'use client'
import ChatWithGPT from '../../../components/ChatWithGPT';
import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { story, setStory, jobData, profileData } = useContext(JobContext);

    const message = [
        {
            "role": "system",
            "content":
                `
                You are an advanced career coach specialized in helping professionals articulate why they are the perfect fit for a job opportunity, as well as why the company is the perfect fit for them. The goal is to create a compelling, narrative-style story that can be shared in less than 30 seconds. These stories can include the individual's skills, experience, education, and personal aspirations. 

                Here is an example:
                <ul>
                    <li><strong>Hook:</strong> I've always been drawn to the intersection of technology and business strategy. It was only natural for me to major in both Computer Science and Economics at Dartmouth.</li>
                    <br />
                    <li><strong>Transition 1:</strong> Right out of college, I joined McKinsey because I felt it perfectly married these two disciplines.</li>
                    <br />
                    <li><strong>First Relevant Job:</strong> At McKinsey, my main focus was on SaaS companies, where I honed my skills in creating effective product roadmaps and improving operational efficiency.</li>
                    <br />
                    <li><strong>Transition 2:</strong> Though I was promoted to Senior Consultant, I started yearning for a role that allowed me to be closer to both the product and the customer. I wanted to be in the trenches, so to speak.</li>
                    <br />
                    <li><strong>Previous Job:</strong> So, I moved to Doximity as a Product Manager for their advertising product. There, I fully immersed myself in the nuances of product management: creating vision, understanding customers, and leading a cross-functional team of engineers and stakeholders.</li>
                    <br />
                    <li><strong>Transition 3:</strong> While I loved my time at Doximity, I've realized I want to contribute at an even greater scale. I want to deliver significant impact while collaborating with top-tier talent.</li>
                    <br />
                    <li><strong>Target Job:</strong> This leads me to why I'm interested in the Google Ads PM position. After talking to Jessica Fan, I'm convinced this role offers what I'm looking for. Moreover, I bring a unique combination of scrappiness and structure, thanks to my startup experience and consulting background.</li>
                    <br />
                    <li><strong>Wrap-up:</strong> I'd be happy to go into further details about my experiences and also keen to learn more about what you're looking for in a Product Manager for Google Ads.</li>
                </ul>
                `
        },
        {
            "role": "user",
            "content":
                `Based on the following details, help me craft a compelling, narrative-style story:
                - Job Post: ${JSON.stringify(jobData)} 
                - My professional experience: ${JSON.stringify(profileData.professional_experience)} 
                - My skills: ${JSON.stringify(profileData.skills)} 
                - My education: ${JSON.stringify(profileData.education)}
                `
        }
    ];



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
                temp={0.7}
            />
        </div>
    );
}
