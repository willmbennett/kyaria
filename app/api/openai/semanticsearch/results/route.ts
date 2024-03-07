import { NextResponse, type NextRequest } from 'next/server';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../../../../lib/auth';
import connectDB from '../../../../../lib/connect-db';

type results = {
    targetDiffbotId: string;
    name: string
}

interface Filter {
    [key: string]: { $in: string[] } | boolean;
}

async function findSimilarDocuments(
    embeddings: number[],
    institutions: results[],
    employers: results[],
    isCurrentEmployment: boolean,
    skip: number,
    limit: number) {
  //console.log("Connecting to MongoDB...");
    const { db } = await connectDB(); // Destructure to get native db and client

    try {
        const collection = db.collection('people');
        let agg: any[] = []; // If the structure of 'agg' is well-known, replace 'any' with a more specific type.
        let filterConditions: Filter[] = [];

        // Check if there are institutions and prepare their filter
        if (institutions.length > 0) {
            const inst = institutions.map(i => i.targetDiffbotId);
            filterConditions.push({ 'educations.institution.targetDiffbotId': { $in: inst } });
        }

        // Check if there are employers and prepare their filter
        if (employers.length > 0) {
            const emp = employers.map(i => i.targetDiffbotId);
            filterConditions.push({ 'employments.employer.targetDiffbotId': { $in: emp } });
        }
        // Check if the employement is current is checked
        if (isCurrentEmployment) {
            filterConditions.push({ 'employments.isCurrent': true });
        }

        // Combine filters using $and if there are multiple conditions
        let combinedFilter = {};
        if (filterConditions.length > 1) {
            combinedFilter = { $and: filterConditions };
        } else if (filterConditions.length === 1) {
            combinedFilter = filterConditions[0];
        }

      //console.log('filter:')
      //console.log(JSON.stringify(combinedFilter))

        // Common vectorSearch stage, applying filters dynamically
        const vectorSearchStage: any = { // Replace 'any' with a more specific type if known.
            "$vectorSearch": {
                "index": "people_vector_index",
                "path": "text_embeddings",
                "queryVector": embeddings,
                "numCandidates": 100,
                "limit": 30,
                // Conditionally add the filter if it's not empty.
                ...(Object.keys(combinedFilter).length > 0 && { filter: combinedFilter })
            }
        };

        // Construct the aggregation pipeline with the dynamic vectorSearch stage
        agg = [
            vectorSearchStage,
            { "$skip": skip },
            { "$limit": limit }
        ];


      //console.log(agg)

      //console.log(`Running aggregation with skip: ${skip} and limit: ${limit}...`);
        const documents = await collection.aggregate(agg).toArray();

      //console.log(`Found ${documents.length} documents.`);
        return documents;
    } catch (error) {
        console.error("Error during MongoDB operation:", error);
        throw error; // Rethrow the error after logging
    }
}

export async function POST(
    request: NextRequest
) {
  //console.log("Handling request...");

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            redirect('/auth/signin')
        }

        const requestBody = await request.json();
        const { embeddings, institutions, employers, isCurrentEmployment, limit = 1, skip = 0 } = requestBody;

      //console.log(`Request body parsed, Limit: ${limit}, Skip: ${skip}`);

        if (!embeddings) {
          //console.log("Embedding is required but was not provided.");
            return NextResponse.json({ error: 'Embeddings are required' }, { status: 400 });
        }

        const documents = await findSimilarDocuments(
            embeddings,
            institutions,
            employers,
            isCurrentEmployment,
            skip,
            limit);
      //console.log(`Sending back ${documents.length} documents.`);
        return NextResponse.json(documents, { status: 200 });

    } catch (error) {
        console.error("An error occurred in the middleware:", error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
