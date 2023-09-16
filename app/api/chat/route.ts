import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, temp } = await req.json();
  console.log(messages)

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-4',  // Use the GPT-4 model for better performance
    temperature: temp, // Lower temperature for more deterministic output
    top_p: 1,         // Controls diversity. Lower values like 0.9 or 1 will make the output more focused, only change this OR temperature
    frequency_penalty: 0, // Optional: You may tweak this for more domain-specific answers
    presence_penalty: 0,  // Optional: You may tweak this to make the model more "present" in the conversation
    max_tokens: 4000,      // Limit the response length
    stream: true,         // Enable streaming
    messages: messages    // Your conversation history
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}