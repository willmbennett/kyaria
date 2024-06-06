import { QuestionClass, QuestionModel } from "../models/Question";
import connectDB from "./connect-db";
import { stringToObjectId, castToString } from "./utils";
var transformProps = require('transform-props');

export async function getUserQuestions(userId: string) {
    try {
        await connectDB();

        const questions = await QuestionModel.find({ userId: userId, appId: { $exists: false } }).lean().exec();

        return {
            questions
        };
    } catch (error) {
        return { error };
    }
}

export async function createQuestion(data: Partial<QuestionClass>) {
    try {
        console.log(`Question to create: ${JSON.stringify(data)}`);

        const question = await QuestionModel.create(data);
        //console.log(`Created Profile: ${JSON.stringify(profile)}`);

        return { newQuestionId: question._id.toString() };
    } catch (error) {
        console.error("Error creating Question:", error); // Log the error for debugging purposes
        return { error: 'Failed to create Question' }; // Generic error message to user
    }
}

export async function getQuestion(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Question not found" };
        }

        //console.log(userId)
        const question = await QuestionModel.findById(id).lean().exec();

        //console.log(profile)
        if (question) {
            //console.log('about to transform props')
            transformProps(question, castToString, '_id');
            //console.log(profile)
            return {
                question
            };

        } else {
            return { error: "Question not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function updateQuestion(id: string, data: Partial<QuestionClass>) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        //console.log(id)

        console.log(`data to update question with: ${JSON.stringify(data)}`)

        const question = await QuestionModel.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (question) {
            return {
                question,
            };
        } else {
            return { error: "Issue updating question" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteQuestion(id: string) {
    try {
        await connectDB();

        //console.log(id)

        if (!id) {
            return { error: "Question not found" };
        }

        await QuestionModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
        return { error };
    }
}