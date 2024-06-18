import { NextRequest } from "next/server";
import { openai } from "../../../../openai";

export const runtime = "nodejs";
const assistantId = 'asst_MVnfGzdl3EldYW18EjKhxiVp'

// Send a new message to a thread
export async function POST(req: NextRequest) {
    const { content, threadId, functionCall } = await req.json();

    //console.log({ content, threadId, assistantId })

    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: content,
    });

    // Prepare the run configuration
    const runConfig: any = {
        assistant_id: assistantId,
    };

    // If functionCall is provided, include it in the run configuration
    if (functionCall) {
        runConfig["tool_choice"] = { type: "function", function: { name: functionCall } };
    }

    const stream = openai.beta.threads.runs.stream(threadId, runConfig);

    return new Response(stream.toReadableStream());
}