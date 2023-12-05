

import { Chat } from '../../chat/Chat';
import { type Message } from 'ai/react'

interface MockInterviewProps {
    userName?: string;
    jobStripped: any;
    jobTitle: string;
    company: string;
}

export default function MockInterview({userName, jobStripped, jobTitle, company}: MockInterviewProps) {

    const initialMessages: Message[] = [
        {
          "id": "1",
          "role": "system",
          "content": `You are a career coach that is helping ${userName} do a mock interview
                      They are applying for this job ${JSON.stringify(jobStripped)}
                      Act only in your capacity as a career coach and do not discuss any other topic.
                      `
        },
        {
          "id": "2",
          "role": "assistant",
          "content": `Hi ${userName} are you ready to do a mock interview for the ${jobTitle} position at ${company}?`
        }
      ];

    return (

        <>
            <Chat initialMessages={initialMessages} />
        </>
    );
}
