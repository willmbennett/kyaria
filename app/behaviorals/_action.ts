"use server";
import { revalidatePath } from "next/cache";
import { QuestionClass } from "../../models/Question";
import { createQuestion, deleteQuestion, updateQuestion } from "../../lib/question-db";
import { ChatCompletionMessageParam } from "openai/resources";
import { ResumeClass } from "../../models/Resume";
import { openai } from "../openai";


export async function updateQuestionAction(
    id: string,
    data: Partial<QuestionClass>,
    path: string
) {
    await updateQuestion(id, data);
    revalidatePath(path);
}

export async function deleteQuestionAction({
    id,
    path,
}: {
    id: string;
    path: string;
}) {
    await deleteQuestion(id);
    revalidatePath(path);
}

export async function createQuestionAction(data: Partial<QuestionClass>) {
    const { newQuestionId } = await createQuestion(data);

    if (newQuestionId) {
        // Log the successful creation of chat
        const url = `/behaviorals/${newQuestionId}`;
        return { newQuestionId, url };
    } else {
        // Log an error if chat creation failed
        const error = 'There was a problem creating a new chat';
        return { error };
    }
}

export async function suggestOptions(id: string, question: string, resume: ResumeClass, path: string) {
    'use server';

    const chatMessages: ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: `You are an expert interviewer. I'll provide an interview question and my resume. Please use my resume to suggest a few stories I could discuss to answer the interview question. 
            For each suggested story, provide the accomplishment and an explanation as to why it is a good option to use for the given question. 
            Return the options in an array with each element containing the accomplishment and explanation in JSON format. 
            Use this format: 
            {
                "options": [
                    {
                        "accomplishment": "Your accomplishment here",
                        "explanation": "Your explanation here"
                    },
                    {
                        "accomplishment": "Your accomplishment here",
                        "explanation": "Your explanation here"
                    }
                ]
            }`
        },
        {
            role: 'user',
            content: `Here is the interview question I am trying to answer: ${JSON.stringify(question)}. Here is my resume: ${JSON.stringify(resume)}. Suggest a few options for situations I could use to answer the question.`
        }
    ];

    //console.log('About to grade this interview: ', chatMessages)
    const completion = await openai.chat.completions.create({
        messages: chatMessages,
        model: "gpt-4o",
        response_format: { type: "json_object" }
    });

    // Process the response from OpenAI and format it as needed
    const res = completion.choices[0].message.content;
    //console.log("optimizedData", optimizedData)
    if (res) {
        const data = JSON.parse(res);
        //console.log('interviewScores: ', data)
        if (data) {
            return data
        }
    } else {
        console.log('No interviewScores provided')
    }
}