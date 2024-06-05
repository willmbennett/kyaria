import { Message } from "ai";
import { ResumeModel } from "../models/Resume";
import { ChatClass, ChatModel } from "../models/Chat";
import connectDB from "./connect-db";
import { castToString, dateToString, stringToObjectId } from "./utils";
import { getJob } from "./job-db";
var transformProps = require('transform-props');

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

const logging = false;

export const createInitialChat = async (userId: string, threadId: string) => {
    try {
        await connectDB();

        if (logging) console.log(JSON.stringify({ userId }))

        const newChatData: Partial<ChatClass> = {
            userId,
            threadId,
        }
        if (logging) console.log('Creating new chat with data: ', newChatData)
        const newChat = await ChatModel.create(newChatData);
        if (logging) console.log('newChat: ', newChat)

        if (newChat) {
            if (logging) console.log('New chat created successfully:', newChat);

            const chatId = castToString(newChat._id);
            if (logging) console.log('Transformed chatId:', chatId); // Log transformed postId

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

const userIdList = [
    "650f813286f63a9d8c0080ee",
    "6510aadf255eb1d64f9cc272",
    "651146ab26d83e7a6daac978",
    "6513c2cd8063290ee8e8515e",
    "65145be92f9b5cae6bf71f09",
    "6517481adbbff5b2580b0783",
    "659c57bbbcaf1a18cdc1bcab",
    "65cd21c5e03b4c037573216d",
    "6538286f7d90de2a9a045b95"
]

export async function getChatCounts() {
    try {
        await connectDB();

        //console.log(id)
        const chats = await ChatModel.find({
            userId: { $nin: userIdList }
        })
            .exec();

        const numChats = chats.length
        const numChatUsers = new Set(chats.map(chat => chat.userId)).size
        if (chats) {
            return {
                numChats,
                numChatUsers
            };
        } else {
            return { error: "Chats not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function getChats(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "userId not found" };
        }

        //console.log(id)
        const chats = await ChatModel.find({ userId })
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        if (chats) {
            transformProps(chats, castToString, '_id');
            transformProps(chats, dateToString, ["createdAt", "updatedAt"]);
            return {
                chats,
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

export async function updateChat(id: string, newMessages: Message) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        //console.log(id)

        //console.log(`data to update job with: ${JSON.stringify(data)}`)

        const chat = await ChatModel.findById(
            parsedId,
        )

        if (!chat) return { error: "Chat application not found" };

        const updatedMessages = chat?.messages ? [...chat?.messages, newMessages] : [newMessages]
        chat.messages = updatedMessages
        chat.save()

        return {};
    } catch (error) {
        return { error };
    }
}

export async function deleteChat(id: string) {
    try {
        await connectDB();

        if (logging) console.log(id)

        const parsedId = stringToObjectId(id);

        if (logging) console.log(parsedId)

        if (!parsedId) {
            return { error: "Chat not found" };
        }
        await ChatModel.findByIdAndDelete(parsedId).exec();

        return {}
    } catch (error: any) {
        return { error };
    }
}