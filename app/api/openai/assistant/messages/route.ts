import { NextRequest } from "next/server";
import { openai } from "../../../../openai";

export const runtime = "nodejs";
const assistantId = process.env.NODE_ENV == 'development' ? 'asst_DD6NIMYBTWc3jZaFVN9VZz8Z' : 'asst_OCy0mebbdZQjlEvo2APC2SrN'

// Send a new message to a thread
export async function POST(req: NextRequest) {
    const { content, threadId } = await req.json();

    //console.log({ content, threadId, assistantId })

    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: content,
    });

    const stream = openai.beta.threads.runs.stream(threadId, {
        assistant_id: assistantId,
    });

    return new Response(stream.toReadableStream());
}