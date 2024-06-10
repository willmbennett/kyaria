import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from "next/navigation";
import { auth } from '../../../../../auth';

// Node.js environments require a polyfill or an import for fetch. Uncomment the line below if you're using Node.js 18 or newer.
// import fetch from 'node-fetch';

const OPENAI_KEY = process.env.OPENAI_API_KEY || '';

async function getEmbedding(query: string) {
    const url = 'https://api.openai.com/v1/embeddings';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: query,
            model: "text-embedding-ada-002"
        })
    });

    if (response.ok) {
        let responseData = await response.json();
        return responseData.data[0].embedding;
    } else {
        throw new Error(`Failed to get embedding. Status code: ${response.status}`);
    }
}

export async function POST(
    request: NextRequest
) {
    const requestBody = await request.text();
    const { query } = JSON.parse(requestBody);

    const session = await auth()

    if (!session) {
        redirect('/auth/signin')
    }

    try {
        if (!query) {
            return NextResponse.json({ error: 'Query is required.' }, { status: 400 });
        }
        const embedding = await getEmbedding(query);
        //console.log('embedding: ', embedding)
        return NextResponse.json(embedding, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
