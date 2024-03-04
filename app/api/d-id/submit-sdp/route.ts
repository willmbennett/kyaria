// pages/api/submit-sdp.ts
import { NextResponse } from 'next/server';

interface SubmitSdpRequestBody {
    streamId: string;
    answer: RTCSessionDescriptionInit;
    session_id: string;
}

interface SubmitSdpResponse {
    message?: string;
}

export async function POST(request: Request) {
    const body: SubmitSdpRequestBody = await request.json()
    try {
        const response = await fetch(`https://api.d-id.com/talks/streams/${body.streamId}/sdp`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${process.env.D_ID_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit SDP answer');
        }
        return NextResponse.json({ message: 'SDP answer submitted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
