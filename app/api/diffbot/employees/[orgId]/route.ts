import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";

export async function GET(
    request: Request,
    { params }: { params: { orgId: string } }
) {
    console.log(params)

    const session = await getServerSession(authOptions);
    const orgId = params.orgId // get the company's id

    if (!session) {
        redirect('/auth/signin')
    }

    //console.log(org)

    try {
        const roleFilter = 'Human Resources and Recruiting'
        //console.log(orgId)
        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=type%3APerson+employments.%7BisCurrent%3A+true+strict%3Acategories.name%3A+"${encodeURIComponent(roleFilter)}"+employer.diffbotUri%3A"http%3A%2F%2Fdiffbot.com%2Fentity%2F${orgId}"%7D+revSortBy%3Aimportance&size=10`

        //console.log(apiUrl)

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
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
