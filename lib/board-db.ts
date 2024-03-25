import { ObjectId } from "mongodb";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, dateToString } from "./utils";
import { BoardClass, BoardModel } from "../models/Board";
var transformProps = require('transform-props');

const logging = true

export async function getBoards(userId: string) {
    try {
        await connectDB();

        const boards = await BoardModel.find({ userId }).sort('-updatedAt').lean().exec();

        if (boards) {
            transformProps(boards, castToString, '_id');
            transformProps(boards, dateToString, ["createdAt", "updatedAt"]);
            if (logging) console.log(boards)
            return {
                boards
            };
        } else {
            return { error: "Boards not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function createBoard(data: Partial<BoardClass>) {
    try {
        await connectDB();

        if (logging) console.log(`Job To create: ${JSON.stringify(data)}`)

        const board = await BoardModel.create(data);

        if (logging) console.log(board)

        if (board) {
            if (logging) console.log('about to transform props')
            const boardId = castToString(board._id)
            if (logging) console.log(boardId)
            return {
                boardId
            };
        } else {
            return { error: "Board not created" };
        }
    } catch (error) {
        return { error };
    }
}

export async function getBoard(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Job not found" };
        }

        if (logging) console.log(id)
        const board = await BoardModel.findById(id).lean().exec();

        if (board) {
            transformProps(board, castToString, ['_id', "_createdAt", "updatedAt"]);
            if (logging) console.log(board)
            return {
                board,
            };
        } else {
            return { error: "Board not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateBoard(id: string, data: any) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        if (logging) console.log('Id to update', id)

        if (logging) console.log(`data to update job with: ${JSON.stringify(data)}`)

        const board = await BoardModel.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (board) {
            if (logging) console.log(`updatedJob: ${JSON.stringify(board)}`)
            return {
                board,
            };
        } else {
            return { error: "Board not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteBoard(id: string) {
    try {
        await connectDB();

        if (logging) console.log(id)

        const parsedId = stringToObjectId(id);

        if (logging) console.log(parsedId)

        if (!parsedId) {
            return { error: "Board not found" };
        }

        const board = await BoardModel.findByIdAndDelete(parsedId).exec();

        if (board) {
            return {};
        } else {
            return { error: "Board not found" };
        }
    } catch (error) {
        return { error };
    }
}