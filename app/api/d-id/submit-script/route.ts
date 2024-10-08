// pages/api/create-session.ts
import { Message } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

interface BodyInterface {
    streamId: string,
    sessionId: string,
    message: string,
}

// Assuming IceServerType is defined somewhere in your project
interface IceServerType {
    urls: string[];
}

export async function POST(request: Request) {
    //console.log('Starting POST function');
    const { streamId, sessionId, message }: BodyInterface = await request.json()
    //console.log('Request body:', JSON.stringify({ streamId, sessionId, message }));
    try {
        //console.log('Attempting to fetch with retries');
        const body = {
            script: {
                type: 'text',
                subtitles: false,
                provider: { type: 'microsoft', voice_id: 'en-US-EmmaMultilingualNeural' },
                input: message,
                ssml: false
            },
            config: { stitch: true },
            background: { color: '#FFFFFF' },
            session_id: sessionId
        };

        // Make an API call to D-ID for video generation
        const response = await fetchWithRetries(`https://api.d-id.com/clips/streams/${streamId}`, {
            method: 'POST',
            headers: { Authorization: `Basic ${process.env.D_ID_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        //console.log('Fetch successful, parsing response');
        const data = await response.json();
        if (!response.ok) {
            console.error('Response not OK:', data);
            throw new Error(data.message || 'Failed to create session');
        }

        //console.log('Successfully created session:', JSON.stringify(data));
        return NextResponse.json({ session: data }, { status: 200 });
    } catch (error: any) {
        console.error('Caught error in POST function:', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

const maxRetryCount = 3;
const maxDelaySec = 4;

async function fetchWithRetries(url: string, options: RequestInit, retries = 1): Promise<Response> {
    //console.log(`fetchWithRetries called, attempt: ${retries}, url: ${url}`);
    try {
        const response = await fetch(url, options);
        //console.log(`Fetch attempt ${retries} successful`);
        return response;
    } catch (err) {
        console.error(`Fetch attempt ${retries} failed with error: ${err}`);
        if (retries <= maxRetryCount) {
            const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;
            // console.log(`Waiting ${delay}ms before retrying...`);

            await new Promise((resolve) => setTimeout(resolve, delay));

            //console.log(`Retrying fetch, attempt number: ${retries + 1}`);
            return fetchWithRetries(url, options, retries + 1);
        } else {
            console.error(`Max retries exceeded for URL: ${url}`);
            throw new Error(`Max retries exceeded. error: ${err}`);
        }
    }
}

