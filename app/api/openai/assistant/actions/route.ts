import { openai } from "../../../../openai";

// Send a new message to a thread
export async function POST(request: Request) {
    const { toolCallOutputs, runId, threadId } = await request.json();
    const stream = openai.beta.threads.runs.submitToolOutputsStream(
        threadId,
        runId,
        // { tool_outputs: [{ output: result, tool_call_id: toolCallId }] },
        { tool_outputs: toolCallOutputs }
    );

    return new Response(stream.toReadableStream());
}