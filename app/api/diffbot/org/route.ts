import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

export async function GET(
    request: NextRequest
) {

    const session = await getServerSession(authOptions);
    const searchParams = request.nextUrl.searchParams
    const org = searchParams.get('org')

    //console.log(session)

    if (!session) {
        redirect('/auth/signin')
      }

    //console.log(org)

    try {
        if (!org || typeof org !== 'string') {
            return NextResponse.json({ error: 'Invalid URL provided.' }, { status: 400 });
        }

        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=type%3AOrganization+strict%3Aname%3A"${encodeURIComponent(org)}"&size=1`; // Replace 'YOUR_API_KEY' with your actual Diffbot API key

        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        };

        const fetchResponse = await fetch(apiUrl, options);

        if (!fetchResponse.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from the Diffbot API.' }, { status: fetchResponse.status });
        }

        const { data } = await fetchResponse.json();
        //console.log('======= Fetrched Data (=======')
        //console.log(data)
        return NextResponse.json(data[0].entity, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
