import { NextResponse, type NextRequest } from 'next/server';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../../../../lib/auth';
import connectDB from '../../../../../lib/connect-db';

async function findSimilarDocuments(embeddings: number[], skip: number, limit: number) {
    console.log("Connecting to MongoDB...");
    const { db } = await connectDB(); // Destructure to get native db and client

    try {
        const collection = db.collection('people');

        console.log(`Running aggregation with skip: ${skip} and limit: ${limit}...`);
        const documents = await collection.aggregate([
            {
                "$vectorSearch": {
                    "index": "people_vector_index",
                    "path": "text_embeddings",
                    "queryVector": embeddings,
                    "numCandidates": 100,
                    "limit": 30
                }
            },
            { "$skip": skip },
            { "$limit": limit }
        ]).toArray();

        console.log(`Found ${documents.length} documents.`);
        return documents;
    } catch (error) {
        console.error("Error during MongoDB operation:", error);
        throw error; // Rethrow the error after logging
    }
}

export async function POST(
    request: NextRequest
) {
    console.log("Handling request...");

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            redirect('/auth/signin')
        }

        const requestBody = await request.json();
        const { embeddings, limit = 1, skip = 0 } = requestBody;

        console.log(`Request body parsed, Limit: ${limit}, Skip: ${skip}`);

        if (!embeddings) {
            console.log("Embedding is required but was not provided.");
            return NextResponse.json({ error: 'Embeddings are required' }, { status: 400 });
        }

        const documents = await findSimilarDocuments(embeddings, skip, limit);
        console.log(`Sending back ${documents.length} documents.`);
        return NextResponse.json(documents, { status: 200 });

    } catch (error) {
        console.error("An error occurred in the middleware:", error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
