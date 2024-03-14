// pages/api/create-session.ts
import { NextResponse } from 'next/server';
import { fetchWithRetries } from '../../../../lib/chatbot/utils';
import { SessionApiResponseType } from '../../../eve/d-id-helper';

const logging = false

export async function POST(request: Request) {
    if (logging) console.log('Starting POST function');
    const body = await request.json()
    if (logging) console.log('Request body:', body);
    try {
        if (logging) console.log('Attempting to fetch with retries');
        const response = await fetchWithRetries('https://api.d-id.com/talks/streams', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${process.env.D_ID_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (logging) console.log('Fetch successful, parsing response');
        const data: SessionApiResponseType = await response.json();
        if (!response.ok) {
            console.error('Response not OK:', data);
            throw new Error(data.message || 'Failed to create session');
        }

        if (logging) console.log('Successfully created session:', JSON.stringify(data));
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Caught error in POST function:', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

