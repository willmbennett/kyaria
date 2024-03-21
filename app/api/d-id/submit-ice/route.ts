// pages/api/submit-ice.ts
import { NextResponse } from 'next/server';

interface SubmitIceRequestBody {
    streamId: string;
    candidate: RTCIceCandidateInit;
    sdpMid?: string | null;
    sdpMLineIndex?: number | null;
    session_id: string;
}

const logging = false

export async function POST(request: Request) {
    if (logging) console.log('Starting POST function for submitting ICE candidate');
    const body: SubmitIceRequestBody = await request.json();
    if (logging) console.log('Request body for ICE candidate submission:', body);

    try {
        if (logging) console.log(`Attempting to submit ICE candidate for stream ID: ${body.streamId}`);
        const response = await fetch(`https://api.d-id.com/clips/streams/${body.streamId}/ice`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${process.env.D_ID_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            if (logging) console.log(`Response not OK while submitting ICE candidate for stream ID: ${body.streamId}`);
            const errorData = await response.json();
            console.error('Error data received:', errorData);
            return NextResponse.json(errorData.message || { message: 'Failed to submit ICE candidate' }, { status: 500 });
        }
        if (logging) console.log(`Successfully submitted ICE candidate for stream ID: ${body.streamId}`);
        return NextResponse.json({ message: 'ICE candidate submitted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Caught error in ICE candidate submission function:', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

