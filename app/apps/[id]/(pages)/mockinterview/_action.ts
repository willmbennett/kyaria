"use server";
import { ChatCompletionMessageParam } from "openai/resources";
import { openai } from "../../../../openai";
import { JobClass } from "../../../../../models/Job";
import { ResumeClass } from "../../../../../models/Resume";

export async function createInterviewQuestions(job: Partial<JobClass>, userResume: Partial<ResumeClass>) {
    'use server';

    const chatMessages: ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: `You are an expert at giving job interviews. Please create a list of 10 hyper-targeted questions for a mock interview based on the provided job description and resume. The first two should be introductory questions, and the final one should be a conclusion question. Focus on aligning the questions with the candidate's skills, experiences, and the specific requirements of the job position. Return the questions in JSON format as an array with the key "questions".`
        },
        {
            role: 'user',
            content: `I'm about to do a Behavioral mock interview for this job position: ${JSON.stringify(job)}. Here is my resume: ${JSON.stringify(userResume)}. Please generate a list of at least 10 questions to ask me based on the job description and my resume.`
        }
    ];


    //console.log('About to grade this interview: ', chatMessages)
    const completion = await openai.chat.completions.create({
        messages: chatMessages,
        model: "gpt-4o",
        response_format: { type: "json_object" }
    });

    // Process the response from OpenAI and format it as needed
    const optimizedData = completion.choices[0].message.content;
    //console.log("optimizedData", optimizedData)
    if (optimizedData) {
        const data = JSON.parse(optimizedData);
        const questions: string[] = data.questions.map((q: { question: string }) => q.question)
        if (data) {
            return { questions }
        }
    } else {
        console.log('No questions provided')
    }
}