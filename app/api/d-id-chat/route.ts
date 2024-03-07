import { Configuration, ChatCompletionRequestMessage, OpenAIApi } from 'openai-edge';
import { NextResponse } from 'next/server';
import { Message } from 'ai';
import { createInitialChatAction, findChatAction, updateChatAction } from '../../eve/_action';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
// Set the runtime to edge for best performance
//export const runtime = 'edge';

type BodyType = {
  sessionId: string,
  streamId: string,
  message: string | null,
  userId: string
}

export async function POST(req: Request) {
  //console.log('Made it to [d-id-chat] api route')
  const body: BodyType = await req.json();
  //console.log('body:', body)
  const { sessionId, streamId, message, userId }: BodyType = body

  if (!sessionId || !streamId || !userId) {
    return NextResponse.json({ message: `Bad data: ${body}` }, { status: 500 });
  }

  let chatHistory: Message[]
  let chatId

  const chat = await findChatAction(sessionId, '/eve')

  //console.log('foundChatHistory: ', foundChatHistory)

  if (chat) {
    chatHistory = chat.messages
    chatId = chat._id
  } else {
    const newChatHistory = await createInitialChatAction({ userId, sessionId }, '/eve')
    if (!newChatHistory) {
      return NextResponse.json({ message: `Could not create or find chat` }, { status: 500 });

    }
    chatHistory = newChatHistory.messages
    chatId = newChatHistory._id
  }

  //console.log('chatHistory: ', chatHistory)
  //console.log('chatId: ', chatId)

  if (message) {
    chatHistory.push({
      id: (chatHistory.length + 1).toString(),
      role: 'user',
      content: message
    })

    //console.log('Added user message')
    //console.log('chatHistory: ', chatHistory)
  }

  const messagesToSend = chatHistory.map(m => ({ role: m.role, content: m.content } as ChatCompletionRequestMessage))

  //console.log('messagesToSend: ', messagesToSend)

  let messagetoSend: string
  try {
    const openAiRes = await openai.createChatCompletion({
      model: 'gpt-4-0125-preview',  // Use the GPT-4 Turbo model for better performance
      temperature: 0.3, // Lower temperature for more deterministic output
      top_p: 1,         // Controls diversity. Lower values like 0.9 or 1 will make the output more focused, only change this OR temperature
      frequency_penalty: 0, // Optional: You may tweak this for more domain-specific answers
      presence_penalty: 0,  // Optional: You may tweak this to make the model more "present" in the conversation
      max_tokens: 300,      // Limit the response length
      stream: false,         // Enable streaming
      messages: messagesToSend   // Your conversation history
    });

    const resData = await openAiRes.json();
    messagetoSend = resData.choices[0].message.content
    //console.log('resData: ', resData.choices[0].message.content)

  } catch (error: any) {
    console.error('Caught error in POST function:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (messagetoSend) {
    chatHistory.push({
      id: (chatHistory.length + 1).toString(),
      role: 'assistant',
      content: messagetoSend
    })

    await updateChatAction(
      chatId.toString(),
      chatHistory,
      '/eve'
    )

    try {
      //console.log('Attempting to fetch with retries');
      const response = await fetchWithRetries(`https://api.d-id.com/talks/streams/${streamId}`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${process.env.D_ID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            subtitles: 'false',
            provider: {
              type: 'microsoft',
              voice_id: 'en-US-JennyNeural'
            },
            input: messagetoSend,
            ssml: 'true'
          },
          config: { fluent: 'false', pad_audio: '0.0' },
          audio_optimization: '2',
          session_id: sessionId
        }),
      });

      //console.log('Fetch successful, parsing response');
      const data = await response.json();
      if (!response.ok) {
        console.error('Response not OK:', data);
        throw new Error(data.message || 'Failed to create session');
      }

      //console.log('Successfully created session:', JSON.stringify(data));
      return NextResponse.json({ session: data }, { status: 200 });
    } catch (error: any) {
      console.error('Caught error in POST function:', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'resData is empty' }, { status: 500 });
  }
}



const maxRetryCount = 3;
const maxDelaySec = 4;

async function fetchWithRetries(url: string, options: RequestInit, retries = 1): Promise<Response> {
  //console.log(`fetchWithRetries called, attempt: ${retries}, url: ${url}`);
  try {
    const response = await fetch(url, options);
    //console.log(`Fetch attempt ${retries} successful`);
    return response;
  } catch (err) {
    console.error(`Fetch attempt ${retries} failed with error: ${err}`);
    if (retries <= maxRetryCount) {
      const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;
      //console.log(`Waiting ${delay}ms before retrying...`);

      await new Promise((resolve) => setTimeout(resolve, delay));

      //console.log(`Retrying fetch, attempt number: ${retries + 1}`);
      return fetchWithRetries(url, options, retries + 1);
    } else {
      console.error(`Max retries exceeded for URL: ${url}`);
      throw new Error(`Max retries exceeded. error: ${err}`);
    }
  }
}