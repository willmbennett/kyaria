import connectDB from "./connect-db";
import { castToString, dateToString, stringToObjectId } from "./utils";
import { MockInterviewClass, MockInterviewModel, Recording } from "../models/MockInterview";
import { Message } from "ai";
var transformProps = require('transform-props');

const logging = false;

export const createMockInterview = async (userId: string, chatId: string, name: string) => {
    try {
        await connectDB();

        if (logging) console.log(JSON.stringify({ userId }))

        const newMockInterviewData: Partial<MockInterviewClass> = {
            userId,
            chatId,
            name
        }
        if (logging) console.log('Creating new Mock Interview with data: ', newMockInterviewData)
        const newMockInterview = await MockInterviewModel.create(newMockInterviewData);

        if (newMockInterview) {
            if (logging) console.log('New chat created successfully:', newMockInterview);

            const newMockInterviewId = castToString(newMockInterview._id);
            if (logging) console.log('Transformed chatId:', chatId); // Log transformed postId

            return { newMockInterviewId };
        } else {
            console.error('Failed to create Mock Interview:'); // Log failure case with data
            return { error: "Failed to create Mock Interview" };
        }
    } catch (error: any) {
        console.log(error.message)
        return { error };
    }
}

export async function getMockInterview(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "chat not found" };
        }

        //console.log(id)
        const MockInterview = await MockInterviewModel.findById(id)
            .exec();

        if (MockInterview) {
            return {
                MockInterview,
            };
        } else {
            return { error: "MockInterview not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function getMockInterviews(userId: string) {
    try {
        await connectDB();

        if (!userId) {
            return { error: "userId not found" };
        }

        //console.log(id)
        const MockInterviews = await MockInterviewModel.find({ userId })
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        if (MockInterviews) {
            transformProps(MockInterviews, castToString, '_id');
            transformProps(MockInterviews, dateToString, ["createdAt", "updatedAt"]);
            return {
                MockInterviews,
            };
        } else {
            return { error: "MockInterviews not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateMockInterview(id: string, data: Partial<MockInterviewClass>) {
    try {
        await connectDB();

        //console.log(id)

        //console.log(`data to update job with: ${JSON.stringify(data)}`)

        const mockInterview = await MockInterviewModel.findByIdAndUpdate(
            id,
            data
        )
            .lean()
            .exec();

        if (mockInterview) {
            return {
                mockInterview,
            };
        } else {
            return { error: "Mock Interview not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function addMockInterviewMessage(id: string, newMessages: Message) {
    try {
        await connectDB();
        //console.log('newMessages ', newMessages)

        //console.log(id)

        //console.log(`data to update job with: ${JSON.stringify(data)}`)

        const MockInterview = await MockInterviewModel.findById(
            id,
        )

        //console.log('Found Mock interview ', MockInterview)

        if (!MockInterview) return { error: "MockInterview not found" };

        const updatedMessages = MockInterview.messages ? [...MockInterview?.messages, newMessages] : [newMessages]
        MockInterview.messages = updatedMessages
        //console.log('Updated mock interview with messages:', MockInterview.messages)
        MockInterview.save()

        return {};
    } catch (error) {
        return { error };
    }
}

export async function addMockInterviewRecording(id: string, newRecording: Recording) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        //console.log(id)

        //console.log(`data to update job with: ${JSON.stringify(data)}`)

        const MockInterview = await MockInterviewModel.findById(
            parsedId,
        )

        if (!MockInterview) return { error: "MockInterview not found" };

        const updatedMessages = MockInterview?.recordings ? [...MockInterview?.recordings, newRecording] : [newRecording]
        MockInterview.recordings = updatedMessages
        MockInterview.save()

        return {};
    } catch (error) {
        return { error };
    }
}

export async function deleteMockInterview(id: string) {
    try {
        await connectDB();

        if (logging) console.log(id)

        const parsedId = stringToObjectId(id);

        if (logging) console.log(parsedId)

        if (!parsedId) {
            return { error: "Chat not found" };
        }
        await MockInterviewModel.findByIdAndDelete(parsedId).exec();

        return {}
    } catch (error: any) {
        return { error };
    }
}