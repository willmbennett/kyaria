import { PostClass, PostModel } from "../models/Post";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, ObjectIdtoString, dateToString } from "./utils";
var transformProps = require('transform-props');

export async function createPost(data: Partial<PostClass>) {
    console.log('Creating new post with data:', data); // Log entry with data

    try {
        await connectDB();
        console.log('Database connection established');

        const newPost = await PostModel.create(data);

        if (newPost) {
            console.log('New post created successfully:', newPost);

            const postId = castToString(newPost._id);
            console.log('Transformed postId:', postId); // Log transformed postId

            return { postId };
        } else {
            console.error('Failed to create post:', data); // Log failure case with data
            return { error: "Post not found" };
        }
    } catch (error) {
        console.error('Error in createPost function:', error); // Log error with context
        return { error };
    }
}


export async function getPost(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "id not included" };
        }

        const objectId = stringToObjectId(id)

        // Check if a subscription already exists for this userId
        const post = await PostModel.findById(objectId);

        if (post) {
            transformProps(post, castToString, '_id');
            transformProps(post, dateToString, ["createdAt", "updatedAt"]);
            //console.log(subscription)
            return {
                post,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function getPosts() {
    try {
        await connectDB();

        let query = {};

        // Example: Filter based on environment
        if (process.env.NODE_ENV === 'development') {
            query = {}; // specific post for development
        } else {
            query = { _id: { $ne: '65945f629905a4a7d3c36d41' } }; // exclude this post in production
        }

        const posts = await PostModel.find(query);

        if (posts) {
            transformProps(posts, castToString, '_id');
            transformProps(posts, dateToString, ["createdAt", "updatedAt"]);
            return {
                posts,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error);
        return { error };
    }
}
