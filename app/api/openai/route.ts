import { NextResponse, NextRequest } from "next/server";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log("res");
  console.log(body);
  const messages = body.data
  console.log("messages");
  console.log(messages);
  if (!messages) {
    return new Response("No messages in the request", { status: 400 });
  }

  const payload = {
    model: "gpt-4",
    messages: messages,
    temperature: 0.3,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: false,
    n: 1,
  };

  console.log("Payload")
  console.log(payload)

  const openAIRes = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const OpenAIResData = await openAIRes.json();

  console.log("res")
  console.log(OpenAIResData)

  return NextResponse.json(OpenAIResData)
}

  // How to a api call
/*
  const callOpenAI = async (messages: any) => {
    updateState('');
    setLoading(true);

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: messages }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const answer = await response.json();
    updateState(answer.choices[0].message.content);
    setLoading(false);
  };
*/