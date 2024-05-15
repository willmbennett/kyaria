import { NextResponse } from 'next/server';
import { openai } from '../../openai';
import { updateChatAction } from '../../eve/_action';
import { MessageContent, TextContentBlock } from 'openai/resources/beta/threads/messages';

// Type definition for the request body
type BodyType = {
  sessionId: string,
  streamId: string,
  message: string,
  userId: string,
  useChatBot: boolean,
  chatId: string,
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
  const { sessionId, streamId, message, useChatBot, chatId, threadId } = body;

  // Validate required fields for chatbot usage
  if (useChatBot && (!sessionId || !streamId)) {
    console.timeEnd("Total API Call Time");
    return NextResponse.json({ message: "Bad data: missing session or stream ID" }, { status: 400 });
  }

  let messageToSend = '';

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
        messageToSend = textContents[0].text.value;
      }
    }

  } catch (error: any) {
    console.error('Caught error in POST function:', error);
    console.timeEnd("Total API Call Time");
    return NextResponse.json({ message: error.message || "An unexpected error occurred" }, { status: 500 });
  }

  // Update the chat history with the new messages
  updateChatAction(chatId, [
    { id: '2', role: 'user', content: message, createdAt: new Date() },
    { id: '3', role: 'assistant', content: messageToSend, createdAt: new Date() }
  ], '/eve');

  // Check if the chatbot usage flag is set
  if (useChatBot) {
    try {
      const body = {
        script: {
          type: 'text',
          subtitles: false,
          provider: { type: 'microsoft', voice_id: 'en-US-EmmaMultilingualNeural' },
          input: messageToSend,
          ssml: false
        },
        config: { stitch: true },
        background: { color: '#FFFFFF' },
        session_id: sessionId
      };

      // Make an API call to D-ID for video generation
      const response = await fetchWithRetries(`https://api.d-id.com/clips/streams/${streamId}`, {
        method: 'POST',
        headers: { Authorization: `Basic ${process.env.D_ID_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Handle non-success responses
      if (!response.ok) {
        throw new Error(data.message || "Failed to create session");
      }

      return NextResponse.json({ session: data }, { status: 200 });

    } catch (error: any) {
      console.error('Caught error in POST function:', error.message);
      return NextResponse.json({ message: error.message || "An error occurred during video creation" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Updated chat history without chatbot successfully" }, { status: 200 });
  }
}




const maxRetryCount = 3;
const maxDelaySec = 4;

async function fetchWithRetries(url: string, options: RequestInit, retries = 1): Promise<Response> {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    console.error(`Fetch attempt ${retries} failed with error: ${err}`);
    if (retries <= maxRetryCount) {
      const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetries(url, options, retries + 1);
    } else {
      console.error(`Max retries exceeded for URL: ${url}`);
      throw new Error(`Max retries exceeded. error: ${err}`);
    }
  }
}

