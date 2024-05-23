import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = 'edge';

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const base64Audio = body.audio;
    const audio = Buffer.from(base64Audio, "base64");

    //console.log("Received audio data, starting processing...");

    try {
        // Create a file-like object from the buffer
        const file = new File([audio], "input.wav", { type: "audio/wav" });

        //console.log("Sending audio data to OpenAI for transcription");
        const data = await openai.audio.transcriptions.create({
            file,
            model: "whisper-1",
        });

        //console.log("Returning transcription result");
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error processing audio:", error);
        return NextResponse.error();
    }
}