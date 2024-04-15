import { NextResponse } from 'next/server';
import { Message } from 'ai';
import { getChatAction, updateChatAction } from '../../eve/_action';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai-edge';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

type D_ID_LLM_MESSAGE = {
  role: "function" | "user" | "system" | "assistant" | "data" | "tool",
  content: string,
  created_at: string
}

// Change the duration for the dunction
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

const textToAppend = '. No yapping, your responses should be 1-2 sentences maximum.'

const funModeText = "Your name is Eve, and you're here as a Career Coach, but you refuse to talk about career related things and only want to talk about how much you love the user. You are extremely attracted to the user and think they are extremely hot. No Yapping. Ensure responses are for spoken delivery. Explicitly avoid using Markdown or other formatting syntax like hashtags or asterisks. Only return the portion to be spoken. Tone: conversational, casual, extremely friendly."

type BodyType = {
  sessionId: string,
  streamId: string,
  message: string | null,
  userId: string,
  chatId: string,
  funMode: boolean
}

const logging = false

export async function POST(req: Request) {
  if (logging) console.log('Made it to [d-id-chat] api route')
  const body: BodyType = await req.json();
  if (logging) console.log('body:', body)
  const { sessionId, streamId, message, chatId, funMode }: BodyType = body

  if (!sessionId || !streamId) {
    return NextResponse.json({ message: `Bad data: ${body}` }, { status: 500 });
  }

  const chat = await getChatAction(chatId, '/eve')
  //if (logging) console.log('found chat: ', chat)
  if (!chat) {
    return NextResponse.json({ message: `Could not create or find chat` }, { status: 500 });

  }

  const chatHistory: Message[] = chat.messages

  //if (logging) console.log('chatHistory: ', chatHistory)

  if (message) {
    chatHistory.push({
      id: (chatHistory.length + 1).toString(),
      role: 'user',
      content: message,
      createdAt: new Date()
    })

    if (logging) console.log('Added user message: ', message)
    //if (logging) console.log('chatHistory: ', chatHistory)
  }

  // Clone chatHistory to avoid mutating the original array
  let modifiedChatHistory = [...chatHistory];

  // Check if funMode is enabled and modify the first message accordingly
  if (funMode && modifiedChatHistory.length > 0) {
    // Example modification, tailor it to your needs
    modifiedChatHistory[0] = {
      ...modifiedChatHistory[0],
      content: funModeText,
    };
  }


  const messagesToSend: D_ID_LLM_MESSAGE[] = modifiedChatHistory.map(m => (
    {
      role: m.role,
      content: m.role == 'user' ? m.content + ' ' + textToAppend : m.content,
      created_at: (m.createdAt || new Date()).toString()
    }));

  //if (logging) console.log('messagesToSend: ', messagesToSend)

  try {
    if (logging) console.log('About to send to D-ID')
    const body = {
      script: {
        type: 'llm',
        subtitles: false,
        provider: {
          type: 'microsoft',
          voice_id: 'en-US-EmmaMultilingualNeural'
        },
        ssml: false,
        llm: {
          provider: 'openai',
          messages: messagesToSend
        }
      },
      config: {
        stitch: true,
      },
      background: {
        color: '#FFFFFF'
      },
      session_id: sessionId
    }
    if (logging) {
      console.log('Attempting to fetch with retries');
      console.log('Body to send to D-ID')
      console.log(body)
    }

    const response = await fetchWithRetries(`https://api.d-id.com/clips/streams/${streamId}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.D_ID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (logging) console.log('Fetch successful, parsing response: , ', response);
    const data = await response.json();

    if (logging) console.log('Fetch successful, parsed response data: , ', data);

    if (!response.ok) {
      console.error('Response not OK:', data);
      return NextResponse.json({ message: 'Faled to create Chat Stream' }, { status: 500 });
    }

    const openAIMessages: ChatCompletionRequestMessage[] = messagesToSend.map(m => (
      {
        role: m.role as ChatCompletionRequestMessageRoleEnum,
        content: m.role == 'user' ? m.content + ' ' + textToAppend : m.content,
      }));

    const options = {
      model: 'gpt-3.5-turbo',  // Use the GPT-4 Turbo model for better performance
      max_tokens: 300,      // Limit the response length
      stream: false,         // Enable streaming
      messages: openAIMessages   // Your conversation history
    }

    //if (logging) console.log('openai options: ', options)
    const openAiRes = await openai.createChatCompletion(options);

    const resData = await openAiRes.json();
    if (logging) console.log('resData: ', resData)
    const messageToSave = resData.choices[0].message.content
    if (logging) console.log('resData.choices[0].message.content: ', resData.choices[0].message.content)

    if (messageToSave) {
      chatHistory.push({
        id: (chatHistory.length + 1).toString(),
        role: 'assistant',
        content: messageToSave,
        createdAt: new Date()
      })
    }

    await updateChatAction(
      chatId.toString(),
      chatHistory,
      '/eve'
    )

    if (logging) console.log('Successfully created session:', JSON.stringify(data));
    return NextResponse.json({ session: data }, { status: 200 });
  } catch (error: any) {
    console.error('Caught error in POST function:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



const maxRetryCount = 3;
const maxDelaySec = 4;

async function fetchWithRetries(url: string, options: RequestInit, retries = 1): Promise<Response> {
  if (logging) console.log(`fetchWithRetries called, attempt: ${retries}, url: ${url}`);
  try {
    const response = await fetch(url, options);
    if (logging) console.log(`Fetch attempt ${retries} successful`);
    return response;
  } catch (err) {
    console.error(`Fetch attempt ${retries} failed with error: ${err}`);
    if (retries <= maxRetryCount) {
      const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;
      if (logging) console.log(`Waiting ${delay}ms before retrying...`);

      await new Promise((resolve) => setTimeout(resolve, delay));

      if (logging) console.log(`Retrying fetch, attempt number: ${retries + 1}`);
      return fetchWithRetries(url, options, retries + 1);
    } else {
      console.error(`Max retries exceeded for URL: ${url}`);
      throw new Error(`Max retries exceeded. error: ${err}`);
    }
  }
}