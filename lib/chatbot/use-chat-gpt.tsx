'use client'
import { Message } from "ai";
import { ResumeClass } from "../../models/Resume";
import { useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime'

interface useChatGPTProps {
    selectedResume?: ResumeClass;
    submitScript: (message: string | null) => Promise<void>
    connected: boolean;
    isStreaming: boolean;
    useChatBot: boolean;
    startChat: boolean;
    messages: Message[];
}

const logging = false

export const useChatGPT = ({ submitScript, connected, isStreaming, useChatBot, startChat, messages }: useChatGPTProps) => {
    const [message, setMessage] = useState<string | null>(null)
    const submissionTimeoutRef = useRef<NodeJS.Timeout>(); // Handle figuring out when the user finishes speaking
    const sentInitialMessage = messages.length > 2

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            throw new Error("Your browser doesn't support speech recognition")
        }
    }, [browserSupportsSpeechRecognition]);

    const submitMessages = useCallback(async () => {
        await submitScript(message);
    }, [message, submitScript])

    useEffect(() => {
        if (logging) console.log(`useEffect triggered. Conditions: { connected: ${connected}, useChatBot: ${useChatBot}, sentInitialMessage: ${sentInitialMessage}, message: ${message} }`);

        if (connected || (!useChatBot && startChat)) {
            if (logging) console.log('Condition passed: either connected or not using ChatBot.');

            if (!sentInitialMessage || message) {
                if (logging) console.log('Submitting messages because either the initial message has not been sent or there is a new message.');
                submitMessages();
                setMessage(null);
            }
        }
    }, [message, useChatBot, startChat, connected, sentInitialMessage]);


    useEffect(() => {
        if (logging) console.log(`Effect running: listening = ${listening}, isStreaming = ${isStreaming}`);

        if (!listening && !isStreaming && (connected || (!useChatBot && startChat)) && sentInitialMessage) {
            if (logging) console.log('Starting speech recognition...');
            SpeechRecognition.startListening({ continuous: true });
        } else if (isStreaming) {
            if (logging) console.log('Aborting speech recognition...');
            SpeechRecognition.abortListening();
        }

        return () => {
            if (listening) {
                if (logging) console.log('Cleaning up: aborting speech recognition...');
                SpeechRecognition.abortListening();
            }
        };
    }, [listening, isStreaming, connected, sentInitialMessage, useChatBot, startChat]); // Dependency array


    useEffect(() => {
        // If we're listening, reset the submission timeout whenever transcript changes
        clearTimeout(submissionTimeoutRef.current);
        submissionTimeoutRef.current = setTimeout(() => {
            if (transcript) {
                //console.log('Made it to submit')
                setMessage(transcript)
                resetTranscript()
            }
        }, 2000); // Adjust delay as needed

        // Cleanup timeout on component unmount
        return () => clearTimeout(submissionTimeoutRef.current);
    }, [transcript]);

    return { transcript, listening }
}