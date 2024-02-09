import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

export async function POST(request: Request) {
    const {limit, skip} = await request.json()

    const session = await getServerSession(authOptions);

    const sizeLimit = limit || 1

    const skipAmount = skip || 0

    if (!session) {
        redirect('/auth/signin')
    }

    //console.log(org)

    try {
        
        //console.log(orgId)

        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=type%3APerson+employments.{categories.name%3Aor(%22Management%22%2C%20%22Human%20Resources%20and%20Recruiting%22)%20isCurrent%3Atrue%20categories.name:%22Engineering%2C%20IT%20and%20Software%20Development%22}+location.isCurrent%3Atrue+location.country.diffbotUri%3A%22http%3A%2F%2Fdiffbot.com%2Fentity%2FE01d4EK33MmCosgI2KXa4-A%22+revSortBy%3Aimportance&size=${sizeLimit}&from=${skipAmount}`

        console.log(apiUrl)

        
        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        };

        const fetchResponse = await fetch(apiUrl, options);

        if (!fetchResponse.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from the Diffbot API.' }, { status: fetchResponse.status });
        }

        const { data } = await fetchResponse.json();
        
        console.log('======= Fetrched Data (=======')
        console.log(data)
        
       //const data = ''
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
