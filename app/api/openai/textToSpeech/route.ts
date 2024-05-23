import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const text = body.text;

    //console.log("Received text data, starting processing...");

    try {
        //console.log("Sending text data to OpenAI for text-to-speech conversion");
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());

        //console.log("Text-to-speech conversion successful, returning buffer");
        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": "attachment; filename=speech.mp3",
            },
        });
    } catch (error) {
        console.error("Error processing text-to-speech:", error);
        return NextResponse.error();
    }
}