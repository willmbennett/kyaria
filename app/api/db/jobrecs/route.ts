import { NextResponse, NextRequest } from 'next/server';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { getJobRecs } from '../../../../lib/job-db';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')

    //console.log(session)

    if (!session) {
        redirect('/auth/signin')
      }

    //console.log(url)

    try {
        // Assuming you are sending filter as part of the request query parameters
        const filter = {userId: userId || ''};

        const result = await getJobRecs(filter); // Adjust the typecasting if you have types for the filter

        //console.log(result)

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
