// pages/api/submit-ice.ts
import { NextResponse } from 'next/server';

interface DestroySessionRequestBody {
    streamId: string;
    session_id: string;
}

export async function DELETE(request: Request) {
    console.log('Starting DELETE function for deleting streams');
    const { streamId, session_id }: DestroySessionRequestBody = await request.json();
    console.log('Request body for ICE candidate submission:', JSON.stringify({ streamId, session_id }));

    try {
        console.log(`Attempting to submit ICE candidate for stream ID: ${streamId}`);
        const response = await fetch(`https://api.d-id.com/talks/streams/${streamId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Basic ${process.env.D_ID_API_KEY}`, // Ensure this is correctly set in your environment
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id }),
        });

        if (!response.ok) {
            console.log(`Response not OK while deleting session for stream ID: ${streamId}`);
            const errorData = await response.json();
            console.error('Error data received:', errorData);
            return NextResponse.json(errorData.message || { message: 'Failed to terminate session' }, { status: 500 });
        }
        console.log(`Successfully terminated session for stream ID: ${streamId}`);
        return NextResponse.json({ message: 'Session terminated successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Caught error in session termination function:', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

