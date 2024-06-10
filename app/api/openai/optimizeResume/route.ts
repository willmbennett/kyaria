import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { auth } from '../../../../auth';

const openai = new OpenAI();

export async function POST(
    request: NextRequest
) {
    //console.log(request.body)

    const session = await auth();

    if (!session) {
        redirect('/auth/signin')
    }

    try {
        const requestBody = await request.text();
        const { messages } = JSON.parse(requestBody);
        //console.log("messages", messages)
        const completion = await openai.chat.completions.create({
            messages,
            model: "gpt-4o",
            response_format: { type: "json_object" }
        });

        // Process the response from OpenAI and format it as needed
        const optimizedData = completion.choices[0].message.content;
        //console.log("optimizedData", optimizedData)
        if (optimizedData) {
            const parsedData = JSON.parse(optimizedData);
            return NextResponse.json(parsedData, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Failed to optimize the data.' }, { status: 400 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
