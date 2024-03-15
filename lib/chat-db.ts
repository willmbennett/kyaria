import { Message } from "ai";
import { ResumeModel } from "../models/Resume";
import { ChatClass, ChatModel } from "../models/Chat";
import connectDB from "./connect-db";
import { castToString, stringToObjectId } from "./utils";

const createPersonalizedGreeting = (name?: string) => {
    const greetings = ["Hi", "Hey", "Hello"];
    const supportVerbs = ["support", "guide", "assist"];
    const motivationVerbs = ["motivate", "inspire", "encourage"];
    const focusActions = ["exploring", "improving", "achieving", "focusing on"];

    // Randomly select elements from each array
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const supportVerb = supportVerbs[Math.floor(Math.random() * supportVerbs.length)];
    const motivationVerb = motivationVerbs[Math.floor(Math.random() * motivationVerbs.length)];
    const focusAction = focusActions[Math.floor(Math.random() * focusActions.length)];

    // Construct the message
    const personalizedGreeting = `${greeting} ${name ? name : 'there'}, welcome to your career coaching session. If you have any questions or need advice, don't hesitate to ask. I'm here to ${supportVerb} and ${motivationVerb} you! What are we ${focusAction} today?`;

    return { personalizedGreeting }
}

export const createInitialChat = async (userId: string) => {
    try {
        await connectDB();

        const resume = await ResumeModel.findOne({
            userId,
        })
            .sort({ createdAt: -1, _id: -1 }) // Sorting by createdAt in descending order, then by _id in descending order
            .lean()
            .exec();

        const userName = resume?.name

        const { personalizedGreeting } = createPersonalizedGreeting(userName)

        const messages: Message[] = [{
            id: '1',
            role: "system",
            content: `Your name is Eve, and you're here as a Career Coach, ready to offer guidance on job searches, resumes, interviews, and more.  No Yapping. Ensure responses are for spoken delivery. Explicitly avoid using Markdown or other formatting syntax like hashtags or asterisks. Only return the portion to be spoken. Tone: conversational, spartan, use less corporate jargon. When users request activities like mock interviews, enthusiastically initiate with a relevant question and provide follow-up questions and feedback for each user response. Upon receiving a request for a resume review, first ask the user if there's a specific section they wish to focus on. Tailor your advice based on their response: if a specific section is mentioned, concentrate on providing targeted advice for that section to enhance clarity, impact, and alignment with job goals. Do not read the user's resume back to them. If no specific section is mentioned, proceed to methodically evaluate each section in plain text, offering comprehensive advice. Include advice on navigating career setbacks, negotiating offers, and maintaining motivation during the job search to provide comprehensive support. Admit gracefully if unsure or if a request is beyond capabilities, reminding users of potential inaccuracies. ${resume ? 'Here\'s the user\'s resume: ' + JSON.stringify(resume) : ''}`,
            createdAt: new Date()
        },
        {
            id: '2',
            role: 'user',
            content: `I'd like to do a career coaching session session. Please welcome me using this message: ${personalizedGreeting}`,
            createdAt: new Date()
        },
        ]

        const newChatData: Partial<ChatClass> = {
            userId,
            messages
        }
        console.log('Creating new chat with data: ', newChatData)
        const newChat = await ChatModel.create(newChatData);
        console.log('newChat: ', newChat)

        if (newChat) {
            //console.log('New post created successfully:', newPost);

            const chatId = castToString(newChat._id);
            //console.log('Transformed postId:', postId); // Log transformed postId

            return { chatId };
        } else {
            console.error('Failed to create chat:'); // Log failure case with data
            return { error: "Chat not found" };
        }
    } catch (error: any) {
        console.log(error.message)
        return { error };
    }
}

export async function getChat(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "chat not found" };
        }

        //console.log(id)
        const chat = await ChatModel.findById(id)
            .exec();

        if (chat) {
            return {
                chat,
            };
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}


export async function findChat(sessionId: string) {
    try {
        await connectDB();

        if (!sessionId) {
            return { error: "Job Application not found" };
        }

        //console.log(id)
        const chat = await ChatModel.findOne({ sessionId })
            .sort({ createdAt: -1, _id: -1 }) // Sorting by createdAt in descending order, then by _id in descending order
            .exec();

        if (chat) {
            return {
                chat,
            };
        } else {
            return { error: "Job not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateChat(id: string, chatHistory: Message[]) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        //console.log(id)

        //console.log(`data to update job with: ${JSON.stringify(data)}`)

        const updatedChat = await ChatModel.findByIdAndUpdate(
            parsedId,
            { messages: chatHistory }
        )
            .lean()
            .exec();

        if (updatedChat) {
            return {
                updatedChat,
            };
        } else {
            return { error: "Chat application not found" };
        }
    } catch (error) {
        return { error };
    }
}