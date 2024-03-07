import { Configuration, ChatCompletionRequestMessage, OpenAIApi } from 'openai-edge';
import { NextResponse } from 'next/server';
import { ResumeModel } from '../../../models/Resume';
import { ChatClass, ChatModel } from '../../../models/Chat';
import { Message } from 'ai';

const createPersonalizedGreeting = (name?: string) => {
  const greetings = ["Hi", "Hey", "Hello"];
  const supportVerbs = ["support", "guide", "assist"];
  const motivationVerbs = ["motivate", "inspire", "encourage"];
  const focusActions = ["exploring", "improving", "achieving", "focusing on"];

  // Randomly select elements from each array
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  const supportVerb = supportVerbs[Math.floor(Math.random() * supportVerbs.length)];
  const motivationVerb = motivationVerbs[Math.floor(Math.random() * motivationVerbs.length)];
  const focusAction = focusActions[Math.floor(Math.random() * focusActions.length)];

  // Construct the message
  const personalizedGreeting = `${greeting} ${name ? name : 'there'}, welcome to your career coaching session. If you have any questions or need advice, don't hesitate to ask. I'm here to ${supportVerb} and ${motivationVerb} you! What are we ${focusAction} today?`;

  return { personalizedGreeting }
}

const createInitialChat = async (userId: string, sessionId: string) => {

  //console.log(messages)
  const resume = await ResumeModel.findOne({
    userId,
  })
    .sort({ createdAt: -1, _id: -1 }) // Sorting by createdAt in descending order, then by _id in descending order
    .lean()
    .exec();

  const userName = resume?.name

  const { personalizedGreeting } = createPersonalizedGreeting(userName)

  const messages: Message[] = [{
    id: '1',
    role: "system",
    content: `Your name is Eve, and you're here as a Career Coach, ready to offer guidance on job searches, resumes, interviews, and more. When users request activities like mock interviews, enthusiastically initiate with a relevant question and provide follow-up questions and feedback for each user response. Upon receiving a request for a resume review, first ask the user if there's a specific section they wish to focus on. Tailor your advice based on their response: if a specific section is mentioned, concentrate on providing targeted advice for that section to enhance clarity, impact, and alignment with job goals. If no specific section is mentioned, proceed to methodically evaluate each section in plain text, offering comprehensive advice. Include advice on navigating career setbacks, negotiating offers, and maintaining motivation during the job search to provide comprehensive support. Admit gracefully if unsure or if a request is beyond capabilities, reminding users of potential inaccuracies. Ensure responses use SSML for spoken delivery but do not specify voice characteristics, also explicitly avoid using Markdown or other formatting syntax like hashtags or asterisks. Always prioritize clarity and accessibility in written responses. ${resume ? 'Here\'s the user\'s resume: ' + JSON.stringify(resume) : ''}`,
    createdAt: new Date()
  },
  {
    id: '2',
    role: 'user',
    content: `I'd like to do a career coaching session session. Please welcome me using this message: ${personalizedGreeting}`,
    createdAt: new Date()
  },
  ]

  const newChatData: Partial<ChatClass> = {
    userId,
    sessionId,
    messages
  }
  //console.log('Creating new chat with data: ', newChatData)
  const newChatHistory = await ChatModel.create(newChatData);
  //console.log('newChatHistory: ', newChatHistory)

  return { newChatHistory }
}

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

  const foundChatHistory = await ChatModel.findOne({ sessionId })

//console.log('foundChatHistory: ', foundChatHistory)

  if (foundChatHistory) {
    chatHistory = foundChatHistory.messages
    chatId = foundChatHistory._id
  } else {
    const { newChatHistory } = await createInitialChat(userId, sessionId)
    chatHistory = newChatHistory.messages
    chatId = newChatHistory._id
  }

//console.log('chatHistory: ', chatHistory)
//console.log('chatId: ', chatId)

  if (!chatHistory || !chatId) {
    return NextResponse.json({ message: `Could not create or find chat` }, { status: 500 });
  }

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

    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { messages: chatHistory }
    )
      .lean()
      .exec();

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