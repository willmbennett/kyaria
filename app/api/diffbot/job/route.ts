import { NextResponse, type NextRequest } from 'next/server'
import { fetchWithRetry } from '../../db/indeedscraper/route';

export async function GET(
    request: NextRequest
) {
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url')

    //console.log(url)

    try {
        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'Invalid URL provided.' }, { status: 400 });
        }

        const apiUrl = `https://api.diffbot.com/v3/job?url=${encodeURIComponent(url)}&token=${process.env.DIFFBOT_API_KEY}`; // Replace 'YOUR_API_KEY' with your actual Diffbot API key

        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        };

        const fetchResponse = await fetchWithRetry(apiUrl, options);
        //console.log('Data fetched successfully:', fetchResponse);

        return NextResponse.json(fetchResponse, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
