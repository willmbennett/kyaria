import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../../../lib/auth';
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(
    request: NextRequest
) {
    console.log(request.body)

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/signin')
    }

    try {
        const requestBody = await request.text();
        const { messages } = JSON.parse(requestBody);
        console.log("messages", messages)
        const completion = await openai.chat.completions.create({
            messages,
            model: "gpt-4-1106-preview",
            response_format: { type: "json_object" }
        });

        // Process the response from OpenAI and format it as needed
        const optimizedData = completion.choices[0].message.content;
        console.log("optimizedData", optimizedData)
        if (!optimizedData) {
            return NextResponse.json({ error: 'Failed to fetch data from the Diffbot API.' }, { status: 400 });
        }
        if (optimizedData) {
            const parsedData = JSON.parse(optimizedData);
            return NextResponse.json(parsedData, { status: 200 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
