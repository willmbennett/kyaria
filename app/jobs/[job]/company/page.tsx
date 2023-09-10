'use client'
import ChatWithGPT from '../../../components/ChatWithGPT';
import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { details, setDetails, jobData } = useContext(JobContext);

    const updateDetails = (index: number, newContent: string) => {
        const newDetails = [...details];
        newDetails[index] = newContent;
        setDetails(newDetails);
    };

    const attributesArray = ["Overview", "Size", "Mission", "Culture", "Core product", "Corporate priorities"];

    return (
        <div>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                Let's do some research
            </h1>
            <br />
            <br />

            {attributesArray.map((attribute, index) => {
                const message = [
                    {
                        role: "system",
                        content: "You are a business intelligence bot that provides detailed information about companies. Style the results using HTML format."
                    },
                    {
                        role: "user",
                        content: `Tell me about the ${attribute} of the company: ${jobData.company}.`
                    }
                ];

                return (
                    <div>
                        <br />
                        <div>
                        {attribute}
                        </div>
                        <br />
                        <ChatWithGPT
                        key={index}
                        message={message}
                        currentState={details[index]}
                        updateState={(newDetails: string) => updateDetails(index, newDetails)}
                        refresh={false}
                        copy={false}
                    />
                    </div>
                    
                );
            })}
        </div>
    );
}
