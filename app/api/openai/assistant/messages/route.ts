import { NextRequest } from "next/server";
import { openai } from "../../../../openai";

export const runtime = "nodejs";
const assistantId = 'asst_OCy0mebbdZQjlEvo2APC2SrN'

// Send a new message to a thread
export async function POST(req: NextRequest) {
    const { content, threadId } = await req.json();

    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: content,
    });

    const stream = openai.beta.threads.runs.stream(threadId, {
        assistant_id: assistantId,
    });

    return new Response(stream.toReadableStream());
}