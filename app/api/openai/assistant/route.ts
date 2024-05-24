import { NextResponse } from 'next/server';
import { MessageContent, TextContentBlock } from 'openai/resources/beta/threads/messages';
import { openai } from '../../../openai';

// Type definition for the request body
type BodyType = {
    message: string,
    threadId: string
}

const addInstructions = '. No yapping, your responses should be 1-2 sentences maximum. Your response should be as if it were meant to be spoken. No special characters.'

function isTextContentBlock(content: MessageContent): content is TextContentBlock {
    return content.type === 'text';
}

// POST handler for processing AI and video generation requests
export async function POST(req: Request) {

    // Parse the JSON body from the request
    const body: BodyType = await req.json();
    console.log('Made it here with body: ', body)
    const { message, threadId } = body;

    let response = '';

    try {
        // Create a message in the OpenAI thread
        await openai.beta.threads.messages.create(threadId, { role: "user", content: message });

        // Stream the responses from the OpenAI thread
        const stream = openai.beta.threads.runs.stream(threadId, { assistant_id: "asst_OCy0mebbdZQjlEvo2APC2SrN", additional_instructions: addInstructions });

        // Await the final message from the stream
        const finalMessage = await stream.finalMessages();

        // Extract the text value from the first content item of the final message
        if (finalMessage.length > 0) {
            // Filter to get all text content blocks safely
            const textContents = finalMessage[0].content.filter(isTextContentBlock);

            // Check if there's at least one text content block and get the value
            if (textContents.length > 0 && textContents[0].text) {
                response = textContents[0].text.value;
            }
        }

        return NextResponse.json({ response }, { status: 200 });

    } catch (error: any) {
        console.error('Caught error in POST function:', error);
        console.timeEnd("Total API Call Time");
        return NextResponse.json({ message: error.message || "An unexpected error occurred" }, { status: 500 });
    }
}


